import { SessionProvider, useSession} from "next-auth/react";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

// store and components
import { store } from "@/store";
import Layout from "@/components/layout/Layout";
import LoadingSpin from "@/components/layout/LoadingSpin";
// styles
import "@/styles/globals.css";
import "@/styles/loading.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
      {Component.auth ? (
            <Auth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Auth>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
      </Provider>
    </SessionProvider>
  );
}

const Auth = ({ children }) => {
  // hooks
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const router = useRouter();
  // effects
  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) router.push("/login");
  }, [isUser, status, router]);

  if (isUser) {
    return children;
  }

  return <LoadingSpin />;
};
