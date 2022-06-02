import { useContext, useEffect, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import UserContext from '../UserContext'
import ProductData from './data'
import Product from './Product'
import ProductCart from './ProductCart'

const Products = () => {

    const { token, cart } = useContext(UserContext);

    const [products, setProducts] = useState([])
    
    const fetchData = () => {
        fetch("https://ecommerce-api-johann.herokuapp.com/api/products/")
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <Container>
            <Row className='mt-5 mb-2'>
                <h1 className='new-arriv'>ALL PRODUCTS ({products.length})</h1>
            </Row>
            <Row>    
                {products.map((item)=> (
                <Product item={item} key={item._id}/>
                ))}
            </Row>
        </Container>
    )
}

export default Products
