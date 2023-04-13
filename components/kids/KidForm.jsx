import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { List, ListInput, ListItem, Range, Fab } from "konsta/react";
import { MdAdd, MdCached } from "react-icons/md";
import * as Yup from "yup";

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
      <form>
        <List>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <ListInput
                {...field}
                label="Nombre"
                type="text"
                placeholder="Nombre"
                media={<MdAdd />}
                error={errors.name && "Nombre es requerido"}
              />
            )}
          />
        </List>
        <List strongMaterial insetMaterial>
          <Controller
            name="age"
            control={control}
            defaultValue=""
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
            defaultValue=""
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
        </List>
      </form>
        <Fab    
            className="fixed left-4-safe bottom-4-safe z-20 k-color-brand-green"
            onClick={() => handleSubmit(onSubmit)()}
            icon={kid ? <MdCached /> : <MdAdd /> }
        />
    </>
  );
};

export default KidForm;
