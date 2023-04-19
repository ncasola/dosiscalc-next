import MainNavbar from "@/components/layout/MainNavbar";
// components
import ChangePasswordForm from "@/components/login/ChangePasswordForm";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/toast.slice";
import AxiosBase from "@/helpers/axiosBase";
import { useRouter } from "next/router";
import { BlockTitle, Block } from "konsta/react";
import React from "react";

export default function ChangePassword() {
  // hooks
  const router = useRouter();
  const dispatch = useDispatch();
  const [token, setToken] = React.useState(null);
  // functions
  const processChange = async (data) => {
    data.token = token;
    const response = await AxiosBase.post("/user/change-password", data);
    if (response) {
      dispatch(
        addToast({
          title: "Aviso",
          message: response.message || response.error,
          type: "bg-lime-500",
        })
      );
    }
  };

  React.useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      if (!token) {
        router.push("/dashboard");
      } else {
        setToken(token);
      }
    }
  }, [router]);

  return (
    <>
      <MainNavbar subtitle="Cambiar contraseña" />
      <BlockTitle className="text-center mt-4">
        Cambiar contraseña
      </BlockTitle>
      <Block inset className="flex justify-center">
        <ChangePasswordForm processChange={processChange} />
      </Block>
    </>
  );
}

ChangePassword.auth = false;