import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useGetKidsQuery, useDeleteKidMutation } from "@/store/kid.api";
import { addToast } from "@/store/toast.slice";
import LoadingSpin from "@/components/layout/LoadingSpin";
import { FaUserAstronaut } from "react-icons/fa";
import { MdAdd, MdRemove, MdEdit, MdPanoramaFishEye } from "react-icons/md";
import {
  Badge,
  List,
  ListItem,
  Navbar,
  BlockTitle,
  Fab,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
} from "konsta/react";

export default function Dashboard() {
  const { data: kids, error, isLoading } = useGetKidsQuery();
  const [deleteKid] = useDeleteKidMutation();
  const [actionsOpened, setActionsOpened] = React.useState(false);
  const [selectedKid, setSelectedKid] = React.useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const openKidAction = ({ kid }) => {
    setSelectedKid(kid);
    setActionsOpened(true);
  };
  const deleteKidAction = async () => {
    await deleteKid(selectedKid["_id"]);
    setActionsOpened(false);
    dispatch(
      addToast({
        title: "Hijo eliminado",
        message: "Se ha eliminado un hijo",
        type: "bg-red-500",
      })
    );
  };
  return (
    <>
      {isLoading && <LoadingSpin />}
      <Navbar title="DosisCalc" />
      <BlockTitle>Listado hijos</BlockTitle>
      {kids && kids.length > 0 && (
        <List strongMaterial outlineMaterial>
          {kids.map((kid) => (
            <ListItem
              key={kid["_id"]}
              title={kid.name}
              media={<FaUserAstronaut />}
              after={
                <>
                  <Badge>{kid.age} años</Badge>
                  <Badge>{kid.weight} kg</Badge>
                </>
              }
              link
              chevronMaterial={true}
              onClick={() => openKidAction({ kid })}
            />
          ))}
        </List>
      )}
      {kids && kids.length === 0 && (
        <List strongMaterial outlineMaterial>
          <ListItem title="No hay hijos" media={<FaUserAstronaut />} />
        </List>
      )}
      <Link href="/dashboard/add" passHref>
        <Fab
          className="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
          text="Agregar hijo"
          icon={<MdAdd />}
          component="a"
        />
      </Link>
      <Actions
        opened={actionsOpened}
        onBackdropClick={() => setActionsOpened(false)}
      >
        <ActionsGroup>
          <ActionsLabel>{selectedKid && selectedKid.name}</ActionsLabel>
          <ActionsButton
            onClick={() => router.push(`/dashboard/view/${selectedKid["_id"]}`)}
            bold
          >
            <MdPanoramaFishEye /> {" Ver"}
          </ActionsButton>
          <ActionsButton
            onClick={() => router.push(`/dashboard/edit/${selectedKid["_id"]}`)}
            bold
          >
            <MdEdit /> {" Editar"}
          </ActionsButton>
          <ActionsButton onClick={() => deleteKidAction()} bold>
            <MdRemove /> {" Borrar"}
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </>
  );
}

Dashboard.auth = true;
