import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import { Block, BlockTitle } from "konsta/react";

export default function Offline() {
    return (
        <>
        <MainNavbar subtitle="Inicio" />
        <BlockTitle>DosisCalc</BlockTitle>
        <Block strong inset outline>
          <p>
            La aplicacion se encuentra en modo offline. No se puede acceder a la informacion.
          </p>
        </Block>
      </>
    );
}

Offline.auth = false;