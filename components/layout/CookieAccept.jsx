import React from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';
const CookieAccept = () => {
  return (
    <CookieConsent
      enableDeclineButton
      flipButtons
      overlay
      location="bottom"
      buttonText="Acepto"
      declineButtonText="No acepto"
      cookieName="dosiscalcCookieConsent"
      expires={450}
    >
    Este sitio web utiliza cookies para mejorar su experiencia de usuario.{` `} 
    <Link href="/privacidad">
        <span className="text-blue-500 cursor-pointer">Leer más</span>
    </Link>
    </CookieConsent>
  );
};
export default CookieAccept;