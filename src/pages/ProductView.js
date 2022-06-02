import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Announcement from '../components/Announcement'
import AppNavbar from '../components/AppNavbar'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import UserContext from '../UserContext'
import Swal from 'sweetalert2'
import { ArrowBackIos } from '@mui/icons-material'


const ProductView = () => {

    const { cart, setCart, token  } = useContext(UserContext);

    const { id } = useParams();

    const [products, setProducts] = useState({})


    const fetchData = () => {
        fetch(`https://ecommerce-api-johann.herokuapp.com/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    const [quantity, setQuantity] = useState(1)

    const addQty = () => {

        setQuantity(quantity + 1)
    }
    const subtractQty = () => {
        
        if(quantity >= 2){

        setQuantity(quantity - 1)

        }
    }

    const [size, setSize] = useState("")

    const addToCart = () => {

        if(size !== ""){
            fetch("https://ecommerce-api-johann.herokuapp.com/api/users/addCart", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    productId: id,
                    productName: products.productName,
                    price: products.price,
                    quantity: quantity,
                    size: size,
                    img: products.img
                })
            }).then(response => response.json())
                .then(data => {

                    if (data) {


                        Swal.fire({
                            title: "Added to Cart!",
                            icon: "success",
                        }).then((result) => {
                            window.location.reload()
                        })

                    } else {
                        Swal.fire({
                            title: "Log in to Continue",
                            icon: "error",
                        })
                    }
                })
        } else {
            Swal.fire('Please select your size')
        }
        
    }




    const goBack = () => {

        window.history.back()
    }

    return (
        <Fragment>
        <AppNavbar/>
        <Announcement/>
            <Container className='my-5 product-vew'>
                <Row>
                    <Col>
                        <a onClick={goBack} className='back'> Go back to previous page </a>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-12 col-lg-6 mt-4'>
                        <img src={products.img} className='img-fluid prodview-img' />
                    </Col>
                    <Col className='col-12 col-lg-6'>
                        <h1 className='prodview-title border-bottom mt-3'>{products.productName}</h1>
                        <h1 className='prodview-price mt-3'>PHP {products.price}</h1>
                        <p className='prodview-desc mt-5 border-bottom pb-3'>{products.description}</p>   
                        <Row className='d-flex flex-column'>
                            <Col className='mt-2'>
                                <h3>Size</h3>
                                <div className='d-flex'>
                                    <select onChange={(e) => setSize(e.target.value)} className='size-dropdown'>
                                        <option selected disabled value="S">Select Size</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </div>  
                            </Col>
                            <Col className='my-3'>
                                <h3>Quantity</h3>
                                <div className='d-flex'>
                                    <button className='qty-butt' onClick={subtractQty}>-</button>
                                    <h1 className='mt-3 mx-3 qty-text text-center'>{quantity}</h1>
                                    <button className='qty-butt' onClick={addQty}>+</button>
                                </div>  
                            </Col>
                        </Row>

                        <button className='prodview-button w-50 py-2' onClick={addToCart}>ADD TO CART</button>
                    </Col>
                </Row>
            </Container>
        <Newsletter/>
        <Footer/>
        </Fragment>
    )
}

export default ProductView
