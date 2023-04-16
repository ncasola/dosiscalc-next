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
          Donec et nulla auctor massa pharetra adipiscing ut sit amet sem.
          Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam
          mollis, vulputate turpis vel, sagittis felis.
        </p>
      </Block>
    </>
  );
}
Home.auth = false;