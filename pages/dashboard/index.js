import React from 'react'
import { useGetKidsQuery } from '@/store/kid.api'
import ListGroup from 'react-bootstrap/ListGroup';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import LoadingSpin from '@/components/layout/LoadingSpin';
import { FaUserAstronaut } from "react-icons/fa";

export default function Dashboard() {
    const { data: kids, error, isLoading } = useGetKidsQuery();
  return (
    <>
    {isLoading && <LoadingSpin />}
    <Container className="mt-5">
      <Row>
        <Col>
        {kids && kids.length > 0 && 
        <ListGroup>
        {kids.map((kid) =>
          <ListGroup.Item key={kid.id}>
            <FaUserAstronaut className="mr-2" />
            {kid.name}
            </ListGroup.Item>
        )}
          </ListGroup>
        }
        {kids && kids.length === 0 &&
          <Alert variant="info">
            No tienes hijos registrados
            <Button variant="link" href="/dashboard/add">Agregar</Button>
          </Alert>
        }
        </Col>
      </Row>
    </Container>
    </>
  )
}

Dashboard.auth = true;
