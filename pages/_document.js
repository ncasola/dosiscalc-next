import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="application-name" content="DosisCalc" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DosisCalc" />
        <meta name="description" content="DosisCalc app" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#83c22c" />

        <link rel="icon" type="image/png" sizes="72x72" href="/icons/icon-72x72.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
