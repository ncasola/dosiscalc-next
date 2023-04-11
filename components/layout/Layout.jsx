import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import ToastList from "./ToastList";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="app">
        <main>{children}</main>
      </Container>
      <ToastList />
    </>
  );
};

export default Layout;
