import React from "react";
import { App, Page } from 'konsta/react';
import ToastList from "./ToastList";
import CookieAccept from "./CookieAccept";
const Layout = ({ children }) => {
  return (
      <App theme="material" safeAreas>
        <Page>
          { children }
          <ToastList />
          <CookieAccept />
        </Page>
      </App>
  );
};

export default Layout;
