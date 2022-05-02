import { ArrowForward, ArrowForwardIos } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ProductData from './data'
import Product from './Product'

const ProductsHome = () => {


    const [productsM, setProductsM] = useState([])
    const [productsW, setProductsW] = useState([])
    const [productsK, setProductsK] = useState([])

    const men = () => {

        fetch("https://bleza-ecommerce-api.herokuapp.com/api/products/men")
        .then(response => response.json())
        .then(data => {
            setProductsM(data)
        })
    }

    const women = () => {

        fetch("https://bleza-ecommerce-api.herokuapp.com/api/products/women")
        .then(response => response.json())
        .then(data => {
            setProductsW(data)
        })
    }

    const kids = () => {

        fetch("https://bleza-ecommerce-api.herokuapp.com/api/products/kids")
        .then(response => response.json())
        .then(data => {
            setProductsK(data)
        })
    }
    

    
    useEffect(() => {
        men()
        women()
        kids()
    },)


    

    return (
        <Container>
            <Row className='mb-2'>
                <Col className='text-center '>
                <a className='new-arriv'>FEATURED PRODUCTS</a> 
                </Col>
            </Row>
            <Row className='mb-0 '>
                {productsM.slice(2,5).map((item) => (
                    <Product item={item} key={item._id} />
                ))}
            </Row>
            <Row className='mb-2'>
                <Col className='text-center '>
                <a className='new-arriv'>NEW ARRIVALS</a>
                </Col>
            </Row>
            <Row className='mb-4'>
                {productsM.slice(7, 10).map((item) => (
                    <Product item={item} key={item._id} />
                ))}
            </Row>
        </Container>
    )
}

export default ProductsHome
