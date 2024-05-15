import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Layout from '../layouts/Layout.js';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          {/* Add meta tags, title, and other head elements here */}
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}

export default MyApp;
