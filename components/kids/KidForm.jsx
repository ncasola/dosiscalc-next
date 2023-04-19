import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { List, ListInput, ListItem, Range, Button } from "konsta/react";
import { MdAdd, MdCached } from "react-icons/md";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

const KidForm = ({ kid, kidRegister }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    age: Yup.number().min(0).max(12).required("La edad es requerida"),
    weight: Yup.number().min(0).max(35).required("El peso es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => {
    kidRegister(data);
  };
  useEffect(() => {
    if (kid) {
      reset(kid);
    }
  }, [kid, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <List strongMaterial insetMaterial>
        <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <ListInput
                {...field}
                outline
                label="Nombre"
                type="text"
                media={<MdAdd />}
                error={errors.name && "Nombre es requerido"}
              />
            )}
          />
          <Controller
            name="age"
            control={control}
            defaultValue="6"
            rules={{ required: true }}
            render={({ field }) => (
              <ListItem
                innerClassName="flex space-x-4"
                header={`Edad: ${field.value} años`}
                innerChildren={
                  <>
                    <span>0</span>
                    <Range
                      {...field}
                      min={0}
                      max={12}
                      step={1}
                      value={field.value}
                      onRangeChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <span>12</span>
                  </>
                }
              />
            )}
          />
          <Controller
            name="weight"
            control={control}
            defaultValue="15"
            rules={{ required: true }}
            render={({ field }) => (
              <ListItem
                innerClassName="flex space-x-4"
                header={`Peso: ${field.value} kg`}
                innerChildren={
                  <>
                    <span>0</span>
                    <Range
                      {...field}
                      min={0}
                      max={35}
                      step={1}
                      value={field.value}
                      onRangeChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <span>35</span>
                  </>
                }
              />
            )}
          />
          <ListItem
            innerClassName="flex space-x-4"
            innerChildren={
                    <Button
            className="w-full"
            type="submit"
          >
            {kid ? (
              <>
                <MdCached />
                <span>Actualizar</span>
              </>
            ) : (
              <>
                <MdAdd />
                <span>Agregar</span>
              </>
            )}
          </Button>

            }
          />
        </List>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button tonal className="w-full">
                Regresar
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default KidForm;
