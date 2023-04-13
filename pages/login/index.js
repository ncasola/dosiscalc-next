import { signIn, getCsrfToken } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MainNavbar from "@/components/layout/MainNavbar";
import Link from "next/link";
// components
import LoginForm from "@/components/login/LoginForm";
import { BlockTitle } from "konsta/react";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/toast.slice";

export default function Login({ csrfToken }) {
  // hooks
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  // functions
  const processLogin = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result.status === 200) {
      router.push("/dashboard");
    }
    if (result.error) {
      dispatch(
        addToast({
          title: "Error",
          message: result.error,
          type: "error",
        })
      );
    }
  };

  // effects
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <MainNavbar subtitle="Iniciar sesión" />
      <LoginForm
        processLogin={processLogin}
        csrfToken={csrfToken}
      />
      <BlockTitle className="text-center mt-4">
        <Link href="/register">
            ¿No tienes cuenta?
        </Link>
      </BlockTitle>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: (await getCsrfToken(context)) || null,
    },
  };
}

Login.auth = false;
