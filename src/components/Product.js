import { height } from '@mui/system'
import React, { useContext, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'


const Product = ({item}) => {

    const { token } = useContext(UserContext);
    
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")

    const [show, setShow] = useState(false);

    const addQty = () => {

        setQuantity(quantity + 1)
    }
    const subtractQty = () => {

        if (quantity >= 2) {

            setQuantity(quantity - 1)

        }
    }

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    const addToCart = () => {


        if (size !== "") {
            fetch("https://bleza-ecommerce-api.herokuapp.com/api/users/addCart", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    productId: item._id,
                    productName: item.productName,
                    price: item.price,
                    quantity: quantity,
                    size: size,
                    img: item.img
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
                            // text: "Please provide a different email"
                        })
                    }
                })
        } else {
            Swal.fire('Please select your size')
        }

    }



    return (
        <Col className='col-12 col-lg-4 mb-4'>
            <Card className='card'>
                <Card.Body className='p-0'>
                    <div className='prod-cont'>
                        <Card.Img variant="top" className='prod-img' src={item.img} />
                        <div className='overlay pb-5'>
                            <div className='prod-butt-cont'>
                                <Link to={`/product/${item._id}`}>
                                    <button className='prod-butt mb-4'>
                                        VIEW PRODUCT
                                    </button>   
                                </Link>
                                <button onClick={handleShow} className='prod-butt mb-4'>ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
                <Card.Body>
                    <div className='d-flex justify-content-between flex-nowrap'>
                        <Card.Title className='prod-card-title'>{item.productName}</Card.Title>
                        <Card.Title className='prod-card-price'>PHP {item.price}</Card.Title>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add to Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='col-12 col-lg-7 mb-2 border-bottom'>
                            <h2 className='mt-3'><Link to={`/product/${item._id}`}>
                                <a className='cart-prod-title-text'>{item.productName}</a>
                            </Link></h2>
                        </Col>
                        <Col className='col-12 col-lg-5'>
                            <img src={item.img} className='img-fluid img-edit-cart' />
                        </Col>
                        <Row className='mt-5'>
                            <Col className='d-flex align-items-center'>
                                <h3>Size</h3>
                            </Col>
                            <Col className='text-end'>
                                <select onChange={(e) => setSize(e.target.value)} className='size-dropdown'>
                                    {/* <option selected>{item.size}</option> */}
                                    <option selected disabled>Select Size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='d-flex align-items-center'>
                                <h3>Quantity</h3>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <button className='qty-butt' onClick={subtractQty}>-</button>
                                <h1 className='mx-3 mt-3 qty-text text-center'>{quantity}</h1>
                                <button className='qty-butt' onClick={addQty}>+</button>
                            </Col>
                        </Row>
                    </Row>





                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='info' className='text-white' onClick={addToCart}>
                        Add to cart
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    )
}

export default Product
