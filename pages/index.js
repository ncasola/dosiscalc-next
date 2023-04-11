import { Button, Col, Container, Row } from "react-bootstrap";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter()
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Home</h1>
          <Button onClick={() => signIn("auth0")}>Sign in</Button>
        </Col>
      </Row>
    </Container>
  );
}
Home.auth = false;