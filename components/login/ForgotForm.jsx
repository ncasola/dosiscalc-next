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

const ForgotForm = ({ processForgot }) => {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("El email es incorrecto")
      .required("El email es obligatorio"),
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
                error={errors.email?.message}
              />
            )}
          />
        </List>
        <input type="hidden" {...register("hcaptcha")} />
        <p className="text-center text-red-500">{errors.hcaptcha?.message}</p>
        <div className="flex justify-center">
          <Button
            className="w-auto mb-4"
            onClick={handleSubmit(processForgot)}
          >
            <MdOutlineSendToMobile /> Registrarse
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

export default ForgotForm;
