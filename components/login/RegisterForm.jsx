import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { List, ListInput, Fab } from "konsta/react";
import {
  MdSupervisedUserCircle,
  MdPassword,
  MdOutlineSendToMobile,
} from "react-icons/md";

const RegisterForm = ({ processRegister }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("El email es incorrecto")
      .required("El email es obligatorio"),
    password: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria"),
  });
  const formOptions = { resolver: yupResolver(validationSchema), mode: "onTouched", reValidateMode: "onChange" };

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
      </form>
      <Fab
        className="fixed right-4-safe bottom-4-safe z-20 k-color-brand-green"
        onClick={() => handleSubmit(processRegister)()}
        icon={<MdOutlineSendToMobile />}
      />
    </>
  );
};

export default RegisterForm;
