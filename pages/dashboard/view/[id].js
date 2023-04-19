import React from "react";
import { useGetKidQuery } from "@/store/kid.api";
import { Button, BlockTitle, List, ListItem } from "konsta/react";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingSpin from "@/components/layout/LoadingSpin";
import Dosis from "@/components/kids/Dosis";
import Image from "next/image";
import Apiretal from "../../../public/Apiretal.png";
import Dalsy20 from "../../../public/Dalsy20.png";
import Dalsy40 from "../../../public/Dalsy40.png";
import MainNavbar from "@/components/layout/MainNavbar";

export default function ViewDashboard() {
  const router = useRouter();
  const [id, setId] = React.useState("");
  const { data: kid, isLoading } = useGetKidQuery(id);
  const [haveToUpdate, setHaveToUpdate] = React.useState(false);

  React.useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (!id) {
        router.push("/dashboard");
      } else {
        setId(id);
      }
    }
  }, [router]);

  React.useEffect(() => {
    if (kid) {
      const lastUpdate = new Date(kid.updatedAt);
      const now = new Date();
      const diff = now.getTime() - lastUpdate.getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      if (diffDays > 30) {
        setHaveToUpdate(true);
      }
    }
  }, [kid]);

  return (
    <>
      {isLoading && <LoadingSpin />}
      {kid && (
        <>
          <MainNavbar subtitle={`Dosis de ${kid.name}`} />
          <BlockTitle>Listado dosis</BlockTitle>
          <List strong outline inset>
            <ListItem
              title="Paracetamol"
              text="100mg/ml"
              subtitle="Apiretal"
              after={<Dosis ml={kid.weight * 0.15} />}
              media={
                <Image
                  className="material:rounded-full material:w-10"
                  src={Apiretal}
                  width="120"
                  height="120"
                  alt="Apiretal"
                />
              }
            />
            <ListItem
              title="Ibuprofeno 20"
              text="20mg/ml"
              subtitle="Dalsy 20"
              after={<Dosis ml={kid.weight / 3} />}
              media={
                <Image
                  className="material:rounded-full material:w-10"
                  src={Dalsy20}
                  width="120"
                  height="120"
                  alt="Dalsy 20"
                />
              }
            />
            <ListItem
              title="Ibuprofeno 40"
              text="40mg/ml"
              subtitle="Dalsy 40"
              after={<Dosis ml={kid.weight / 6} />}
              media={
                <Image
                  className="material:rounded-full material:w-10"
                  src={Dalsy40}
                  width="120"
                  height="120"
                  alt="Dalsy 40"
                />
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
        </>
      )}
      {haveToUpdate && (
        <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 m-4"
          role="alert"
        >
          <p className="font-bold">Aviso</p>
          <p>Hace un mes que no se actualizan los datos del peso</p>
        </div>
      )}
    </>
  );
}

ViewDashboard.auth = true;
