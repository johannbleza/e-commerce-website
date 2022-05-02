import React, { Fragment, useContext, useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import OrdersUser from './OrdersUser';
import OrdersUserAdmin from './OrdersUserAdmin';

const AdminAllOrders = () => {

    const { token, allOrders, adminAllOrders } = useContext(UserContext);

    useEffect(() => {
        adminAllOrders()
    }, [])


  return(
      <Fragment>
          <Row className='pt-5'>
              <Col>
                  <h1 className='fw-bold'>ALL ORDERS ({allOrders.length})</h1>
              </Col>
              <Col className='d-flex justify-content-end'>
                  <Link to="/admin/products" className='d-flex'>
                    <button className='addProductBtn'>VIEW ALL PRODUCTS</button>
                  </Link>
              </Col>
          </Row>
          <Row className='mt-2' >
              <Col className='col-12 mt-4'>
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
                          {allOrders.map((item) => (
                              <OrdersUserAdmin item={item} key={item._id} />
                          ))}
                      </tbody>
                  </Table>
              </Col>
          </Row>
      </Fragment>
  );
};

export default AdminAllOrders;
