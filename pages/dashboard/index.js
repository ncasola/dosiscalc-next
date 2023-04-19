import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useGetKidsQuery, useDeleteKidMutation } from "@/store/kid.api";
import { addToast } from "@/store/toast.slice";
import LoadingSpin from "@/components/layout/LoadingSpin";
import { FaUserAstronaut } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import {
  Badge,
  List,
  ListItem,
  BlockTitle,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  Button,
  Block,
} from "konsta/react";
import MainNavbar from "@/components/layout/MainNavbar";

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

  const pruebas = () => {
    dispatch(
      addToast({
        title: "Hijo eliminado",
        message: "Eliminado",
        type: "bg-red-500",
      })
    );
  };

  const deleteKidAction = async () => {
    await deleteKid(selectedKid["_id"]);
    setActionsOpened(false);
    dispatch(
      addToast({
        title: "Hijo eliminado",
        message: "Eliminado",
        type: "bg-red-500",
      })
    );
  };
  return (
    <>
      {isLoading && <LoadingSpin />}
      <MainNavbar subtitle={"Dashboard"} />
      <BlockTitle>Listado hijos</BlockTitle>
      <Block>
      {kids && kids.length > 0 && (
        <List strong outline inset className="overflow-y-auto h-4/6">
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
        <List strong>
          <ListItem title="No hay hijos" media={<FaUserAstronaut />} />
        </List>
      )}
            <div className="flex justify-center">
      <Button
              className="w-full mr-2"
              onClick={() => router.push("/dashboard/add")}
            >
              <MdAdd /> Agregar hijo
            </Button>
            </div>
            </Block>
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
            Ver dosis
          </ActionsButton>
          <ActionsButton
            onClick={() => router.push(`/dashboard/edit/${selectedKid["_id"]}`)}
          >
            Editar datos
          </ActionsButton>
          <ActionsButton onClick={() => deleteKidAction()} bold>
            Borrar datos
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </>
  );
}

Dashboard.auth = true;
