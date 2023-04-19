import React from "react";
import { Block, BlockTitle } from "konsta/react";
import MainNavbar from "@/components/layout/MainNavbar";
import { useSession } from "next-auth/react";
import CardUser from "@/components/profile/CardUser";
import Link from "next/link";

export default function Perfil() {
    const { data: session, status } = useSession();
    return (
        <>
            <MainNavbar subtitle={"Perfil"} />
            <BlockTitle>Perfil</BlockTitle>
            <Block inset className="flex justify-center">
                <CardUser name={session.user.name} email={session.user.email} />
            </Block>
            <BlockTitle>Enlaces</BlockTitle>
            <Block inset>
                <Link href="/forgot-password">
                    <span className="block text-center text-blue-500">
                        Cambiar contraseña
                    </span>
                </Link>
            </Block>
        </>
    );
}

Perfil.auth = true;