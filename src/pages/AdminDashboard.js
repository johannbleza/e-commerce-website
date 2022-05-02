import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppNavbar from '../components/AppNavbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { Button, Col, Container, Dropdown, DropdownButton, Form, FormControl, Modal, Row, Table } from 'react-bootstrap';
import Newsletter from '../components/Newsletter';
import UserContext from '../UserContext';
import AdminProducts from '../components/AdminProducts';
import Swal from 'sweetalert2';
import AdminAllProducts from '../components/AdminAllProducts';
import AdminAllOrders from '../components/AdminAllOrders';

const AdminDashboard = () => {

    
  return(
      <Fragment>
          <AppNavbar/>
          <Announcement/>
          <Container className='my-5 cart-cont'>
              <Row className='pt-3'>
                  <Col className='text-center border-bottom'>
                      <h1 className='cart-title'>ADMIN DASHBOARD</h1>
                  </Col>
              </Row>
              <AdminAllProducts/>
          </Container>
          <Newsletter/>
          <Footer/>
      </Fragment>
  )
};

export default AdminDashboard;
