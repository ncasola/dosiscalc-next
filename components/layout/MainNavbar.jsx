import React from 'react'
import { Navbar, Button } from 'konsta/react'
import Logo from '@/assets/logo.png'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

const MainNavbar = ({subtitle}) => {
  const { data: session } = useSession()
  return (
    <Navbar
        title="DosisCalc"
        subtitle={subtitle}
        className="top-0 sticky"
        left={
            <Image
                src={Logo}
                alt="DosisCalc"
                width={40}
                height={40}
                className="rounded-full mr-2"
            />
        }
        right={
            session ? (
                <Button onClick={() => signOut()}>Cerrar Sesión</Button>
            ) : (
                <Button onClick={() => signIn("auth0")}>Iniciar Sesión</Button>
            )
        }
    />
  )
}

export default MainNavbar