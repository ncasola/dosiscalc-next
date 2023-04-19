import { useRouter } from "next/router";
import MainNavbar from "@/components/layout/MainNavbar";
// components
import ForgotForm from "@/components/login/ForgotForm";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/toast.slice";
import AxiosBase from "@/helpers/axiosBase";
import { BlockTitle, Block } from "konsta/react";
export default function ForgotPassword() {
  // hooks
  const router = useRouter();
  const dispatch = useDispatch();
  // functions
  const processForgot = async (data) => {
    const response = await AxiosBase.post("/user/forgot-password", data);
    if (response) {
      dispatch(
        addToast({
          title: "Aviso",
          message: response.message || response.error,
          type: "bg-lime-500",
        })
      );
      router.push("/login");
    }
  };

  return (
    <>
      <MainNavbar subtitle="Recuperar contraseña" />
      <BlockTitle className="text-center mt-4">Recuperar contraseña</BlockTitle>
      <Block inset className="flex justify-center">
        <ForgotForm processForgot={processForgot} />
      </Block>
    </>
  );
}

ForgotPassword.auth = false;
