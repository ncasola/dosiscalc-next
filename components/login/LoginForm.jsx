import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { List, ListInput, Button } from "konsta/react";
import {
  MdSupervisedUserCircle,
  MdPassword,
  MdOutlineSendToMobile,
} from "react-icons/md";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";

const LoginForm = ({ csrfToken, processLogin }) => {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const validationSchema = Yup.object().shape({
    // yup email validation
    email: Yup.string()
      .email("El email es incorrecto")
      .required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
    hcaptcha: Yup.string().required("El captcha es obligatorio"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
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
      <form className="w-full">
        <List>
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
                error={errors.name?.message}
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
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" {...register("hcaptcha")} />
        <p className="text-center text-red-500">{errors.hcaptcha?.message}</p>
        <div className="flex justify-center">
          <Button
            className="w-auto mb-4"
            onClick={handleSubmit(processLogin)}
          >
            <MdOutlineSendToMobile /> Iniciar sesión
          </Button>
        </div>
        <div className="flex justify-center mt-4">
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          onLoad={onLoad}
          onVerify={setToken}
          ref={captchaRef}
          className="mx-auto"
        />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
