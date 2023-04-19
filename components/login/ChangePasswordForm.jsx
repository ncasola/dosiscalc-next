import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { List, ListInput, Button } from "konsta/react";
import {
  MdPassword,
  MdOutlineSendToMobile,
} from "react-icons/md";

const ChangePasswordForm = ({ processChange }) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("La contraseña es obligatoria"),
  });
  const formOptions = { resolver: yupResolver(validationSchema), mode: "onTouched", reValidateMode: "onChange" };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => {
    processChange(data);
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <List>
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
        <div className="flex justify-center">
          <Button
            className="w-auto mb-4"
            type="submit"
          >
            <MdOutlineSendToMobile /> Cambiar contraseña
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;