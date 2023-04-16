import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { List, ListInput, Fab } from "konsta/react";
import {
  MdSupervisedUserCircle,
  MdPassword,
  MdOutlineSendToMobile,
} from "react-icons/md";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";

const RegisterForm = ({ processRegister }) => {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("El email es incorrecto")
      .required("El email es obligatorio"),
    password: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria"),
    hcaptcha: Yup.string().required("El captcha es obligatorio"),
  });
  const formOptions = { resolver: yupResolver(validationSchema), mode: "onTouched", reValidateMode: "onChange" };

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onLoad = () => {
    captchaRef.current.execute();
  };

  useEffect(() => {
    if (token) {
      reset({ hcaptcha: token });
    }
  }, [token, reset]);

  return (
    <>
      <form>
        <List strong inset>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
                <ListInput
                    outline
                    {...field}
                    label="Nombre"
                    type="text"
                    placeholder="Nombre"
                    media={<MdSupervisedUserCircle />}
                    error={errors.name?.message}
                />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <ListInput
                outline
                {...field}
                label="Email"
                type="text"
                placeholder="Email"
                media={<MdSupervisedUserCircle />}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <ListInput
                outline
                {...field}
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                media={<MdPassword />}
                error={errors.password?.message}
              />
            )}
          />
        </List>
        <input type="hidden" {...register("hcaptcha")} />
        <p className="text-center text-red-500">{errors.hcaptcha?.message}</p>
        <div className="flex justify-center">
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          onLoad={onLoad}
          onVerify={setToken}
          ref={captchaRef}
          className="mx-auto"
        />
        </div>
      </form>
      <Fab
        className="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
        onClick={() => handleSubmit(processRegister)()}
        icon={<MdOutlineSendToMobile />}
        text="Registrarse"
      />
    </>
  );
};

export default RegisterForm;
