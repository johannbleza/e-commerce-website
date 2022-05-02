import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Announcement from '../components/Announcement';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import OrdersUser from '../components/OrdersUser';
import UserContext from '../UserContext';

const OrderHistory = () => {

    const { token, user, orders, orderHistory } = useContext(UserContext);

    

    useEffect(() => {
        orderHistory()
    }, [])


  return (
      <Fragment>
          <AppNavbar/>
          <Announcement/>
          <Container className='my-5 cart-cont order-his'>
                <Row className='pt-3'>
                    <Col className='text-center border-bottom'>
                        <h1 className='cart-title'>ORDER HISTORY</h1>
                    </Col>
                </Row>
                <Row className='pt-4'>
                    <Col>
                        <h1 className='fw-bold'>ORDERS ({orders.length})</h1>
                    </Col>
                </Row>
              <Row className='mt-2'>
                  <Col className='mt-4'>
                      <Table className='table-cart-fz-admin'>
                          <thead>
                              <tr>
                                  <th className='text-center'>#</th>
                                  <th>Order ID</th>
                                  <th>Order Details</th>
                                  <th className='text-center'>PurchasedOn</th>
                                  <th className='text-center'>Status</th>
                                  <th className='text-center'>Total</th>
                              </tr>
                          </thead>
                          <tbody>
                              {orders.map((item) => (
                                  <OrdersUser item={item} key={item._id} />
                              ))}
                          </tbody>
                      </Table>
                    </Col>
                </Row>
            </Container>
          <Newsletter/>
          <Footer/>
      </Fragment>
  )
};

export default OrderHistory;
