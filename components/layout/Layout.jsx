import React from "react";
import { App, Page, Tabbar, TabbarLink } from "konsta/react";
import ToastList from "./ToastList";
import CookieAccept from "./CookieAccept";
import Head from "next/head";
import { useRouter } from "next/router";
import { MdHome, MdSettingsApplications, MdDescription } from "react-icons/md";
const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>DosisCalc</title>
      </Head>
      <App theme="material" safeAreas>
        <Page>
          {children}
          <div className="left-0 bottom-0 fixed w-full z-30">
          <ToastList />
          <Tabbar labels={true} icons={true} className="left-0 bottom-0">
            <TabbarLink
                icon={
                  <MdHome />
                }
                label="Dashboard"
                active={router.pathname === "/dashboard"}
                onClick={() => router.push("/dashboard")}
              />
              <TabbarLink
                icon={
                  <MdSettingsApplications />
                }
                label="Perfil"
                active={router.pathname === "/profile"}
                onClick={() => router.push("/profile")}
              />
              <TabbarLink
                icon={
                  <MdDescription />
                }
                label="Privacidad"
                active={router.pathname === "/privacidad"}
                onClick={() => router.push("/privacidad")}
              />
          </Tabbar>
          </div>
        </Page>
        <CookieAccept />
      </App>
    </>
  );
};

export default Layout;
