import { useState } from 'react';
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

const Newsletter = () => {

    const [email, setEmail] = useState("");


    const subscribe = () => {
        
        if(email !== ""){

            fetch("https://bleza-ecommerce-api.herokuapp.com/api/users/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            }).then(response => response.json())
                .then(data => {

                    if (data) {


                        Swal.fire({
                            title: "Subscribed!",
                            icon: "success",
                            text: "Thank you for subscribing!"
                        })

                        setEmail("")
                    } else {
                        Swal.fire({
                            title: "Duplicate email found",
                            icon: "error",
                            text: "Please provide a different email"
                        })
                    }
                })

        }else{
            Swal.fire('Plase enter your email')
        }
    }

    return (
        <Container fluid className='newsletter'>
            <Row>
                <Col className='col-12 text-center justify-content-center mt-5 pt-5'>
                        <h1 className='nl-text'>Newsletter</h1>
                    <h3>Get timely updates to our new releases.</h3>
                </Col>
            </Row>
            <Row className='justify-content-center mt-2'>
                <Col className='col-lg-4'>
                    <InputGroup className='justify-content-center'>
                        <FormControl 
                            placeholder="Email"
                            type='email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} 
                        />
                        <Button variant='dark' onClick={subscribe}>
                            Subscribe
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default Newsletter
