import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { List, ListInput, Fab } from "konsta/react";
import {
  MdSupervisedUserCircle,
  MdPassword,
  MdOutlineSendToMobile,
} from "react-icons/md";

const LoginForm = ({ csrfToken, processLogin }) => {
  const validationSchema = Yup.object().shape({
    // yup email validation
    email: Yup.string()
      .email("El email es incorrecto")
      .required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  return (
    <>
      <form>
        <List strong inset>
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
      </form>
      <Fab
        className="fixed right-4-safe bottom-4-safe z-20 k-color-brand-green"
        onClick={() => handleSubmit(processLogin)()}
        icon={<MdOutlineSendToMobile />}
      />
    </>
  );
};

export default LoginForm;
