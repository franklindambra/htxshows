import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Layout from '../layouts/Layout.js';
import { GoogleTagManager } from '@next/third-parties/google'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}

export default MyApp;
