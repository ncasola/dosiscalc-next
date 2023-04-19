import { signIn, getCsrfToken } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MainNavbar from "@/components/layout/MainNavbar";
import Link from "next/link";
// components
import LoginForm from "@/components/login/LoginForm";
import { BlockTitle, Block, Button } from "konsta/react";
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
      hcaptcha: data.hcaptcha,
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
      <BlockTitle className="text-center mt-4">Login</BlockTitle>
      <Block inset className="flex justify-center">
        <LoginForm processLogin={processLogin} csrfToken={csrfToken} />
      </Block>
      <BlockTitle className="text-center mt-4">Enlaces</BlockTitle>
      <Block inset className="space-y-2">
        <div className="grid grid-cols-2 gap-x-4">
          <Button tonal>
            <Link href="/forgot-password">Cambiar contraseña</Link>
          </Button>
          <Button tonal>
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </Block>
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
