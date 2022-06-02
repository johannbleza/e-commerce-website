import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Modal, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import AdminProducts from './AdminProducts';

const AdminAllProducts = () => {

    const { token, allProducts } = useContext(UserContext);

    const [products, setProducts] = useState([])

    const [addProdName, setAddProdName] = useState("")
    const [addProdPrice, setAddProdPrice] = useState(0)
    const [addProdCat, setAddProdCat] = useState("")
    const [addProdDesc, setAddProdDesc] = useState("")
    const [addProdUrl, setAddProdUrl] = useState("")



    const fetchData = () => {
        fetch("https://ecommerce-api-johann.herokuapp.com/api/products/all", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => {
        setShowAdd(false)

        setAddProdName("")
        setAddProdPrice(0)
        setAddProdCat("")
        setAddProdDesc("")
        setAddProdUrl("")
    }
    const handleShowAdd = () => setShowAdd(true);

    const addProduct = () => {

        if (addProdName !== "" &&
            addProdPrice !== 0 &&
            addProdCat !== "" &&
            addProdDesc !== "" &&
            addProdUrl !== ""
        ) {
            Swal.fire({
                title: 'Add Product?',
                icon: "Info",
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (result.isConfirmed) {

                    fetch("https://ecommerce-api-johann.herokuapp.com/api/products/create", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            productName: addProdName,
                            img: addProdUrl,
                            description: addProdDesc,
                            categories: addProdCat,
                            price: addProdPrice,

                        })
                    }).then(response => response.json())
                        .then(data => {
                            if (data) {
                                Swal.fire({
                                    title: 'New Product Added',
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
        } else {
            Swal.fire('Please input empty fields')
        }

    }

  return (
      <Fragment>
          <Row className='pt-5'>
              <Col>
                  <h1 className='fw-bold'>ALL PRODUCTS({products.length})</h1>
              </Col>
              <Col className='d-flex justify-content-end'>
                  <button className='addProductBtn' onClick={handleShowAdd}>ADD NEW PRODUCT</button>
                  <Link to="/admin/orders" className='d-flex'>
                  <button className='addProductBtn'>VIEW ALL ORDERS</button>
                  </Link>
              </Col>
          </Row>
          <Row className='mt-2' >
              <Col className='col-12 mt-4'>
                  <Table className='table-cart-fz-admin'>
                      <thead>
                          <tr>
                              <th className='text-center'>#</th>
                              <th className='text-center'>Product</th>
                              <th className='text-center'>Name</th>
                              <th className='text-center'>Description</th>
                              <th className='text-center'>Category</th>
                              <th className='text-center' >Price</th>
                              <th className='text-center'>Active</th>
                              <th className='text-center'>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {products.map((item) => (
                              <AdminProducts item={item} key={item._id} />
                          ))}
                      </tbody>
                  </Table>
              </Col>
          </Row>
          <Modal show={showAdd} onHide={handleCloseAdd}>
              <Modal.Header closeButton>
                  <Modal.Title>Add New Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Form.Group className="mb-3">
                          <Form.Label>Product Name</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Enter product name"
                              value={addProdName}
                              onChange={(e) => {
                                  setAddProdName(e.target.value)
                              }}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                              type="number"
                              placeholder="Enter price"
                              value={addProdPrice}
                              onChange={(e) => {
                                  setAddProdPrice(e.target.value)
                              }}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label>Image(url)</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Enter image url"
                              value={addProdUrl}
                              onChange={(e) => {
                                  setAddProdUrl(e.target.value)
                              }}
                          />
                      </Form.Group>
                      <Form.Group className='mb-3'>
                          <Form.Label>Category</Form.Label>
                          <Form.Select onChange={(e) => setAddProdCat(e.target.value)}>
                              <option selected disabled>Select Category</option>
                              <option value="men">Men</option>
                              <option value="women">Women</option>
                              <option value="kids">Kids</option>
                          </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label>Product Description</Form.Label>
                          <FormControl
                              as="textarea"
                              aria-label="With textarea"
                              value={addProdDesc}
                              onChange={(e) => {
                                  setAddProdDesc(e.target.value)
                              }}
                          />
                      </Form.Group>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseAdd}>
                      Close
                  </Button>
                  <Button variant="info" className='text-white' onClick={addProduct}>
                      Add Product
                  </Button>
              </Modal.Footer>
          </Modal>
      </Fragment>
  )
};

export default AdminAllProducts;
