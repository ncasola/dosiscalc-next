import React from "react";
import { App, Page } from "konsta/react";
import ToastList from "./ToastList";
import CookieAccept from "./CookieAccept";
import Head from "next/head";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>DosisCalc</title>
      </Head>
      <App theme="material" safeAreas>
        <Page>
          {children}
          <ToastList />
          <CookieAccept />
        </Page>
      </App>
    </>
  );
};

export default Layout;
