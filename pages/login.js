import { makeStyles } from '@material-ui/styles';
import { LoginForm } from './../components';
import { getUserSessionFromContext } from './../utils/auth';
import Router from 'next/router';

const useStyles = makeStyles(theme => ({
  container: {
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    maxWidth: theme.spacing(128),
    padding: theme.spacing(4, 6),
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    margin: 'auto',
  },
  welcomeTitle: {},
  paragraphs: {
    marginBottom: theme.spacing(8),
  },
}));

function Login() {
  const classes = useStyles();

  const handleLoginEvent = ({ key = '', newValue = null }) => {
    const isLoginEvent = key === 'login';
    const notDeletionEvent = newValue !== null;
    if (isLoginEvent && notDeletionEvent) {
      console.log('Signed in. Redirecting you home. 🛫 ➡️ 🏠');
      Router.push('/');
    }
  };

  React.useEffect(() => {
    window.addEventListener('storage', handleLoginEvent);

    return () => window.removeEventListener('storage', handleLoginEvent);
  }, [null]);

  return (
    <main className={classes.container}>
      <LoginForm />
    </main>
  );
}

Login.getInitialProps = async ctx => {
  const { xAuthToken } = getUserSessionFromContext(ctx);
  // Already signed in, redirect to home
  if (xAuthToken) {
    if (ctx.req) {
      // Redirect on server side
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    } else {
      // Redirect on client side
      console.log('Already logged in, redirecting you home. 🛫 ➡️ 🏠');
      Router.push('/');
    }
  }
};

export default Login;
