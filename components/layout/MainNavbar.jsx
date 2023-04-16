import React from "react";
import { Navbar, Button } from "konsta/react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const MainNavbar = ({ subtitle }) => {
  const { data: session } = useSession();
  return (
    <Navbar
      title={<Link href="/dashboard">DosisCalc</Link>}
      subtitle={subtitle}
      className="top-0 sticky"
      left={
        <Link href="/dashboard">
          <Image
            src="/logo.png"
            alt="DosisCalc"
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
        </Link>
      }
      right={
        <>
          {session ? (
            <Button onClick={() => signOut()}>Cerrar Sesión</Button>
          ) : (
            <Button onClick={() => signIn("auth0")}>Iniciar Sesión</Button>
          )}
          <Link href="/privacidad" className="mx-2">
            <Button outline>Privacidad</Button>
          </Link>
        </>
      }
    />
  );
};

export default MainNavbar;
