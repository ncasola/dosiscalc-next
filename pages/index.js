import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { Block, BlockTitle } from "konsta/react";
import MainNavbar from "@/components/layout/MainNavbar";

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);
  return (
    <>
      <MainNavbar subtitle="Inicio" />
      <BlockTitle>DosisCalc</BlockTitle>
      <Block strong inset outline>
        <p>
          DosisCalc es una web app que te permite calcular la dosis de medicamentos como Apiretal, Paracetamol, Ibuprofeno, etc.
        </p>
      </Block>
    </>
  );
}
Home.auth = false;