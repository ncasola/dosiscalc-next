import React from "react";
import { App, Page } from 'konsta/react';
import ToastList from "./ToastList";
const Layout = ({ children }) => {
  return (
      <App theme="material" safeAreas>
        <Page>
          { children }
          <ToastList />
        </Page>
      </App>
  );
};

export default Layout;
