import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import CUSTOM_THEME from './../materialTheme';
import { Layout } from './../components';
import { LayoutContext, UserSessionContext } from './../contextes';
import { getUserSessionFromContext } from './../utils/auth';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        navIsOpen: false,
      },
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    let userSession = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx) userSession = getUserSessionFromContext(ctx);

    /* your own logic */

    return { pageProps, userSession };
  }

  /**
   *            LAYOUT MGMT
   */

  setLayout = setLayoutCallback => {
    this.setState(setLayoutCallback);
  };

  get layoutContext() {
    const { setLayout } = this;
    const { layout } = this.state;
    return {
      layout,
      setLayout,
    };
  }

  render() {
    const { Component, pageProps, userSession } = this.props;
    return (
      <ThemeProvider theme={CUSTOM_THEME}>
        <Head>
          <title>[POC] Mission Control</title>
        </Head>
        <CssBaseline />
        <LayoutContext.Provider value={this.layoutContext}>
          <UserSessionContext.Provider value={userSession}>
            <Layout>
              <Component {...pageProps} userSession={userSession} />
            </Layout>
          </UserSessionContext.Provider>
        </LayoutContext.Provider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
