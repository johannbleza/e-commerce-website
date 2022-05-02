import { Copyright, Facebook, Instagram, LocalPhone, LocationCity, LocationOn, Mail, Pinterest, Twitter } from '@mui/icons-material'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container fluid className='footer pt-5'>
            <Row className=' px-5 pb-5'>
                    <Col>
                    <ul>
                    <h1 className='f-h1'>About SHOP</h1>
                        <li>Redefining clothing, with a focus on quality and textiles which has been unwavered since the company’s origins.</li>
                    </ul>
                    </Col>
                    <Col>
                    <ul>
                    <h1 className='f-h1'>Socials</h1>
                        <li className='fb'>
                            <Facebook /> <a href='https://www.facebook.com/' target="_blank"> Facebook</a>
                        </li>
                        <li className='ig'>
                            <Instagram /> <a href='https://www.instagram.com/' target="_blank"> Instagram</a>
                        </li>
                        <li className='tw'>
                            <Twitter /> <a href='https://twitter.com/' target="_blank"> Twitter</a>
                        </li>
                        <li className='pi'>
                            <Pinterest /> <a href='https://www.pinterest.ph/' target="_blank"> Pinterest</a>
                        </li>
                    
                    </ul>
                    </Col>
                    <Col>
                    <ul>
                    <h1 className='f-h1'>Useful Links</h1>
                        <li>
                            <a href='https://www.termsfeed.com/live/c72e40f6-5f3f-4378-b0e4-db8e07614f0e' target="_blank">
                            Terms and Conditions
                            </a>
                        </li>
                        <li>
                            <a href='https://www.jtexpress.ph/index/query/query.html' target="_blank">
                            Shipping Rates
                            </a>
                        </li>
                        
                    </ul>
                    </Col>
                    <Col>
                    <ul>
                    <h1 className='f-h1'>Contact</h1>
                        <li><LocationOn/> Manila, Philippines </li>
                        <li><Mail/> shop@mail.com </li>
                        <li><LocalPhone/> +63912345679 </li>
                    </ul>
                    </Col>
                </Row>
                <Row >
                    <Col className='text-center p-2 cr'>
                    <span className='cr-text'>©2022 Copyright:</span> SHOP.com
                    </Col>
                </Row>
        </Container>
    )
}

export default Footer
