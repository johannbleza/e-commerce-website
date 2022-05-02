import { useEffect, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ProductData from './data'
import Product from './Product'

const ProductsMen = () => {


    const [products, setProducts] = useState([])
    
    const fetchData = () => {
        fetch("https://bleza-ecommerce-api.herokuapp.com/api/products/men")
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
                <h1 className='new-arriv'>MEN COLLECTION ({products.length})</h1>
            </Row>
            <Row>    
                {products.map((item)=> (
                <Product item={item} key={item._id}/>
                ))}
            </Row>
        </Container>
    )
}

export default ProductsMen
