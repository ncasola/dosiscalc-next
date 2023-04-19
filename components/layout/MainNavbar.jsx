import React from "react";
import { Navbar, Button } from "konsta/react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../../public/logo.png";
const MainNavbar = ({ subtitle }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Navbar
      title={<Link href="/dashboard">DosisCalc</Link>}
      subtitle={subtitle}
      className="top-0 sticky"
      left={
        <Link href="/dashboard">
          <Image
            src={Logo}
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
            <Button onClick={() => router.push("/login")}>Iniciar Sesión</Button>
          )}
        </>
      }
    />
  );
};

export default MainNavbar;
