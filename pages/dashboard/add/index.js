import React from "react";
import { useCreateKidMutation } from "@/store/kid.api";
import {
  Fab
} from "konsta/react";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/toast.slice";
import { useRouter } from "next/router";
import KidForm from "@/components/kids/KidForm";
import { MdUndo } from "react-icons/md";
import MainNavbar from "@/components/layout/MainNavbar";

export default function AddDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addKid] = useCreateKidMutation();
  const onSubmit = async (data) => {
    console.log(data);
    const newKid = await addKid(data);
    if (newKid) {
      dispatch(
        addToast({
          title: "Hijo agregado",
          message: "Se ha agregado un nuevo hijo",
          type: "bg-lime-500",
        })
      );
      router.push("/dashboard");
    }
  };
  return (
    <>
      <MainNavbar subtitle="Agregar hijo" />
      <KidForm kidRegister={onSubmit} kid={null} />
      <Fab 
            className="fixed right-4-safe bottom-4-safe z-20"
            onClick={() => router.push("/dashboard")}
            icon={<MdUndo />}
        />
    </>
  );
}

AddDashboard.auth = true;