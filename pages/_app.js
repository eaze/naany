import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import CUSTOM_THEME from './../materialTheme';
import { Layout, LayoutContext } from './../components';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      navMenuIsOpen: false,
    };
  }

  toggleNavMenu = () => {
    this.setState(prevState => ({
      navMenuIsOpen: !prevState.navMenuIsOpen,
    }));
  };

  render() {
    const { Component, pageProps } = this.props;
    const { navMenuIsOpen } = this.state;
    const layoutContext = {
      navMenuIsOpen,
      toggleNavMenu: this.toggleNavMenu,
    };
    return (
      <ThemeProvider theme={CUSTOM_THEME}>
        <CssBaseline />
        <LayoutContext.Provider value={layoutContext}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LayoutContext.Provider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
