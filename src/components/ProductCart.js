import React, { useContext, useState } from 'react'
import { Button, Col, Dropdown, DropdownButton, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

const ProductCart = ({item}) => {

    const { token, cart } = useContext(UserContext);
    

    const removeFromCart = () => {


        Swal.fire({
            
            title: 'Remove from cart?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("https://bleza-ecommerce-api.herokuapp.com/api/users/removeFromCart", {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: item.productId,
                        id: item._id,
                        size: item.size
                    })
                }).then(response => response.json())
                    .then(data => {
                        if (data) {
                            Swal.fire({
                                title: 'Item removed',
                                icon: "success",
                            }).then((result) => {
                                window.location.reload()
                            })
                        } else {
                            Swal.fire({
                                title: "Error",
                                icon: "error",
                            })
                        }
                    })

                
            }
        })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        
        setSize(item.size)
        setQuantity(item.quantity)
        setShow(false)
    }
    const handleShow = () => setShow(true);

    const [size, setSize] = useState(item.size)

    const [quantity, setQuantity] = useState(item.quantity)

    const addQty = () => {

        setQuantity(quantity + 1)
    }
    const subtractQty = () => {

        if (quantity >= 2) {

            setQuantity(quantity - 1)

        }
    }

    const saveChanges = () => {

        Swal.fire({
            title: 'Update Order?',
            icon: "Info",
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("https://bleza-ecommerce-api.herokuapp.com/api/users/editFromCart", {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: item.productId,
                        id: item._id,
                        size: size,
                        quantity: quantity

                    })
                }).then(response => response.json())
                    .then(data => {
                        if (data) {
                            Swal.fire({
                                title: 'Order Updated',
                                icon: "success",
                            }).then((result) => {
                                window.location.reload()
                            })
                        } else {
                            Swal.fire({
                                title: "Error",
                                icon: "error",
                            })
                        }
                    })


            }
        })

    }

    const index = cart.findIndex((element) => element._id == item._id);

    

    return (
        <tr>
            <td> {index + 1} </td>
            <td>
                <img src={item.img} className='img-fluid cart-img' />
            </td>
            <td>
                <Link to={`/product/${item.productId}`}>
                    <a className='cart-prod-title-text'>{item.productName}</a>
                </Link>
                
            </td>
            <td className='text-center'>{item.size}</td>
            <td className='text-center'>{item.quantity}</td>
            <td className='text-center'>{item.price * item.quantity}</td>
            <td className='text-center'>
                <DropdownButton id="dropdown-basic-button" variant='secondary'>
                    <Dropdown.Item onClick={handleShow} className='dropdown-item'>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={removeFromCart} className='dropdown-item'>Remove</Dropdown.Item>
                </DropdownButton>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col className='col-12 col-lg-7 mb-2 border-bottom'>
                                <h2 className='mt-3'><Link to={`/product/${item.productId}`}>
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
                                        <option selected value={item.size}>{item.size}</option>
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
                        <Button variant='info' className='text-white' onClick={saveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </td>
        </tr>
        
    )
}

export default ProductCart
