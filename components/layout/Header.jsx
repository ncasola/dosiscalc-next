import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
const Header = () => {
    return (
        <>
          <Navbar bg="light" variant="light">
            <Container>
              <Navbar.Brand href="#home">
                <Image 
                    src={Logo}
                    alt="DosisCalc"
                    width={30}
                    height={30}
                    className="d-inline-block align-top"
                />{' DosisCalc'}
              </Navbar.Brand>
            </Container>
          </Navbar>
        </>
      );
    }

export default Header