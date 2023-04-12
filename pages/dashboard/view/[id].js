import React from "react";
import { useGetKidQuery } from "@/store/kid.api";
import {
  Navbar,
} from "konsta/react";
import { useRouter } from "next/router";
import LoadingSpin from "@/components/layout/LoadingSpin";

export default function ViewDashboard() {
  const router = useRouter();
  const [id, setId] = React.useState("");
  const { data: kid, isLoading } = useGetKidQuery(id);

  React.useEffect(() => {
    if(router.isReady){
      const { id } = router.query;
      if(!id){
        router.push("/dashboard");
      } else {
        setId(id);
      }
    }
  }, [router]);
  return (
    <>
      {isLoading && <LoadingSpin />}
        {kid && (
            <>
                <Navbar title={kid.name} />
                {JSON.stringify(kid)}
            </>
        )}
    </>
  );
}

ViewDashboard.auth = true;