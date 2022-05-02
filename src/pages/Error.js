import React, { Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Announcement from '../components/Announcement';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const Error = () => {
  return (
      <Fragment>
          <AppNavbar/>
          <Announcement/>
          <Container className='error-page d-flex justify-content-center align-items-center'>
              <Row>
                  <Col className='mb-5'>
                    <h1 className='error-h1'>OOPS!</h1>
                    <h1 className='fw-bold'>ERROR 404: PAGE NOT FOUND</h1>
                    <Link to="/">
                        <button className='error-btn'>Go to homepage</button>

                    </Link>
                  </Col>
              </Row>
          </Container>
          <Newsletter/>
          <Footer/>

      </Fragment>
  )
};

export default Error;
