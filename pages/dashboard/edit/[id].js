import React from "react";
import { useUpdateKidMutation, useGetKidQuery } from "@/store/kid.api";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/toast.slice";
import { useRouter } from "next/router";
import KidForm from "@/components/kids/KidForm";
import LoadingSpin from "@/components/layout/LoadingSpin";
import MainNavbar from "@/components/layout/MainNavbar";

export default function EditDashboard() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { data: kid, isLoading } = useGetKidQuery(id);
  const [editKid] = useUpdateKidMutation();
  const onSubmit = async (data) => {
    const newKid = await editKid({ id: kid["_id"], data });
    if (newKid) {
      dispatch(
        addToast({
          title: "Hijo actualizado",
          message: "Se han actualizado los datos del hijo",
          type: "bg-lime-500",
        })
      );
    }
  };
  return (
    <>
      <MainNavbar subtitle="Actualizar hijo" />
        {isLoading && <LoadingSpin />}
        {kid && <KidForm kidRegister={onSubmit} kid={kid} />}
    </>
  );
}

EditDashboard.auth = true;