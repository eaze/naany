import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

// Default object used when a user session was not found
const NO_USER_SESSION = {
  dispensaryId: null,
  displayName: null,
  xAuthToken: null,
};

const login = userSession => {
  const inOneDay = 1;
  const cookieSettings = {
    secure: isProduction(),
    // "secure: true" won't work during local development unless you
    // enable https somehow (e.g. react scripts has support for this)
    expires: inOneDay,
    sameSite: 'strict',
  };
  // TODO – MAKE THE USER SESSION SECURE
  // Because we're capturing the entire sign in response as our cookie,
  // which has authorization identifiers that we'd likely want to use, e.g.
  // isDispensaryManager, dispensaryId, etc, we would definitely want to either:
  // - utilize encryption
  //   - https://github.com/js-cookie/js-cookie/issues/496
  //   - https://github.com/bitwiseshiftleft/sjcl/
  // - come up with a different means of exposing this information
  cookie.set('userSession', userSession, cookieSettings);
};

const getUserSessionFromCookie = () => {
  return cookie.getJSON('userSession') || NO_USER_SESSION;
};

const getUserSessionFromContext = ctx => {
  const { userSession = NO_USER_SESSION } = nextCookie(ctx);
  return userSession;
};

const redirectIfUnauthenticated = ctx => {
  const userSession = getUserSessionFromContext(ctx);
  const { xAuthToken } = userSession;

  /*
   * If there's no xAuthToken, it means the user is not logged in.
   * Also, if `ctx.req` is available, it means we are on the server.
   */

  if (!xAuthToken) {
    if (ctx.req) {
      console.log('$~~~~~~SERVER REDIRECT~~~~~~$: Redirecting to login page.');
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    } else {
      console.log('$~~~~~~CLIENT REDIRECT~~~~~~$: Redirecting to login page.');
      Router.push('/login');
    }
  }
};

const logout = () => {
  cookie.remove('userSession');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login');
};

const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('Signed out. Redirecting to login page. 🛫 ➡️ 🔐');
        Router.push('/login');
      }
    };

    React.useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, [null]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const userSession = redirectIfUnauthenticated(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, userSession };
  };

  return Wrapper;
};

function isProduction() {
  // TODO - This is not production ready
  // For production, consider the usage of environment variables
  // https://www.leighhalliday.com/secrets-env-vars-nextjs-now
  return false;
}

export {
  getUserSessionFromContext,
  getUserSessionFromCookie,
  login,
  logout,
  redirectIfUnauthenticated,
  withAuthSync,
};
