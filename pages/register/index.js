import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MainNavbar from "@/components/layout/MainNavbar";
import { useCreateUserMutation } from "@/store/user.api";
// components
import RegisterForm from "@/components/login/RegisterForm";
import LoadingSpin from "@/components/layout/LoadingSpin";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/toast.slice";

export default function Register() {
  // hooks
  const router = useRouter();
  const { data: session } = useSession();
  const [addUser, { isLoading }] = useCreateUserMutation();
  const dispatch = useDispatch();
  // functions
  const processRegister = async (data) => {
    const result = await addUser(data);
    console.log(result);
    if (result.data.email) {
      dispatch(
        addToast({
          title: "Registrado",
          message: "Se ha registrado correctamente",
          type: "success",
        })
      );
      router.push("/login");
    }
    if (result.data.error) {
      dispatch(
        addToast({
          title: "Error",
          message: result.data.error,
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
      <MainNavbar subtitle="Registrarse" />
      {isLoading && <LoadingSpin />}
      <RegisterForm
        processRegister={processRegister}
      />
    </>
  );
}

Register.auth = false;