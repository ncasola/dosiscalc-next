import React from 'react'
import { useForm } from "react-hook-form";
import { useCreateKidMutation } from '@/store/kid.api'
import { Col, Container, Row, Form, Button } from 'react-bootstrap';

export default function AddDashboard() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addKid] = useCreateKidMutation();
    const onSubmit = async (data) => {
        const newKid = await addKid(data);
        if(newKid) {
            alert('Hijo registrado');
        }
        console.log(newKid);
    }
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" {...register("name", { required: true })} />
                            {errors.name && <span className="text-danger">Este campo es requerido</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Edad</Form.Label>
                            <Form.Control type="number" placeholder="Edad" {...register("age", { required: true })} />
                            {errors.age && <span className="text-danger">Este campo es requerido</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Peso</Form.Label>
                            <Form.Control type="number" placeholder="Peso" {...register("weight", { required: true })} />
                            {errors.weight && <span className="text-danger">Este campo es requerido</span>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

AddDashboard.auth = true;