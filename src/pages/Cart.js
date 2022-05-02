import React, { Fragment, useContext } from 'react'
import { Col, Container, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Announcement from '../components/Announcement'
import AppNavbar from '../components/AppNavbar'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import ProductCart from '../components/ProductCart'
import UserContext from '../UserContext'

const Cart = () => {

    const { userDetails, cart, token } = useContext(UserContext);



    const goBack = () => {

        window.history.back()
    }

    const total = cart.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
    
    const sfee = 200
    const voucher = -500;
    const totalTotal = total + sfee + voucher

    

    const clearCart = () =>{

        fetch(`https://bleza-ecommerce-api.herokuapp.com/api/users/removeCart`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: userDetails._id,

            })
        }).then(response => response.json())
            .then(data => {
                return true
            })

    }

    let navigate = useNavigate();

    const checkout = () => {

        Swal.fire({
            title: 'Confirm Checkout?',
            icon: "Info",
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {

                clearCart()
                

                fetch(`https://bleza-ecommerce-api.herokuapp.com/api/order/checkout`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: userDetails._id,
                        cart: cart,
                        total: totalTotal

                    })
                    
                }).then(response => response.json())
                    .then(data => {
                        if (data) {
                            Swal.fire({
                                title: 'Order Submitted',
                                text: "Thank you for you purchase!",
                                icon: "success",
                            }).then((result) => {
                                
                                navigate('/orders');
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

    return (
       <Fragment>
           <AppNavbar/>
           <Announcement/>
            <Container className='my-5 cart-cont'>
                <Row>
                    <Col>
                        <a onClick={goBack} className='back'> Go back to previous page </a>
                    </Col>
                </Row>
                <Row className='pt-3'>
                    <Col className='text-center border-bottom'>
                        <h1 className='cart-title'>YOUR CART</h1>
                    </Col>
                </Row>
                <Row className='pt-4'>
                    <Col>
                        <h1 className='fw-bold'>ITEMS ({cart.length})</h1>
                    </Col>
                </Row>
                <Row className='mt-2' >
                    <Col className='col-12 col-lg-8 mt-4'>
                        <Table className='table-cart-fz'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th className='text-center'>Size</th>
                                    <th className='text-center'>Quantity</th>
                                    <th className='text-center'>Subtotal</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {cart.map((item) => (
                                    <ProductCart item={item} key={item._id} />
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col className='col-12 col-lg-4'>
                        <div className='p-2 border rounded'>

                        <h1 className='mt-2 p-2'>Order Summary</h1>

                        <div className='p-2'>

                        <div className='d-flex justify-content-between mt-4'>
                            <p className='p-cart-text'>Subtotal</p>
                            <p className='p-cart-text'>PHP {total}</p>
                        </div>
                        <div className='d-flex justify-content-between mt-2'>
                            <p className='p-cart-text'>Shipping Fee</p>
                            <p className='p-cart-text'>PHP {sfee}</p>
                        </div>
                        <div className='d-flex justify-content-between mt-2'>
                            <p className='p-cart-text'>Voucher Discount</p>
                            <p className='p-cart-text'>PHP {voucher}</p>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <p className='p-cart-text-total'>TOTAL</p>
                            <p className='p-cart-text-total'>PHP {total + sfee + voucher}</p>
                        </div>

                        <button className='checkout-btn my-3' onClick={checkout}>CHECKOUT</button>
                        </div>
                        </div>

                    </Col>
                </Row>
            </Container>
           <Newsletter/>
           <Footer/>
       </Fragment>
    )
}

export default Cart
