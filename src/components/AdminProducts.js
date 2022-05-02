import React, { useContext, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, FormControl, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

const AdminProducts = ({item}) => {

    const { allProducts, token } = useContext(UserContext);

    const [addProdName, setAddProdName] = useState(item.productName)
    const [addProdPrice, setAddProdPrice] = useState(item.price)
    const [addProdCat, setAddProdCat] = useState(item.categories[0])
    const [addProdDesc, setAddProdDesc] = useState(item.description)
    const [addProdUrl, setAddProdUrl] = useState(item.img)

    const index = allProducts.findIndex((element) => element._id == item._id);

    const deleteProduct = () => {
        Swal.fire({
            title: 'Delete Product?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://bleza-ecommerce-api.herokuapp.com/api/products/${item._id}/delete`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json())
                    .then(data => {
                        if (data) {
                            Swal.fire({
                                title: 'Product Deleted',
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

    

    const archiveProduct = () => {
        Swal.fire({
            title: 'Archive Product?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://bleza-ecommerce-api.herokuapp.com/api/products/${item._id}/archive`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json())
                    .then(data => {
                        if (data) {
                            Swal.fire({
                                title: 'Product Archived',
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
    const unarchiveProduct = () => {
        Swal.fire({
            title: 'Unarchive Product?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://bleza-ecommerce-api.herokuapp.com/api/products/${item._id}/unarchive`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json())
                    .then(data => {
                        if (data) {
                            Swal.fire({
                                title: 'Product Unarchived',
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

    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => {
        setShowAdd(false)
    }
    const handleShowAdd = () => setShowAdd(true);

    const editProduct = () => {

            Swal.fire({
                title: 'Save changes?',
                icon: "Info",
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (result.isConfirmed) {

                    fetch(`https://bleza-ecommerce-api.herokuapp.com/api/products/${item._id}`, {
                        method: "PUT",
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
                                    title: 'Product Updated',
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


    let archiveButton = (item.isActive == true) ?
        <Dropdown.Item className='dropdown-item' onClick={archiveProduct}>Archive</Dropdown.Item>
        :
        <Dropdown.Item className='dropdown-item' onClick={unarchiveProduct}>Unarchive</Dropdown.Item>

    return (


      <tr>
            <td className='text-center'>{index + 1}</td>
          <td><img src={item.img} className='img-fluid admin-img' /></td>
          <td>
              <Link to={`/product/${item._id}`}>
                  <a className='cart-prod-title-text'>{item.productName}</a>
              </Link>
          </td>
          <td>{item.description}</td>
          <td className='text-center'>{item.categories[0]}</td>
          <td className='text-center'>{item.price}</td>
          <td className='text-center'>{String(item.isActive)}</td>
          <td className='text-center'>
              <DropdownButton id="dropdown-basic-button" variant='secondary'>
                    <Dropdown.Item className='dropdown-item' onClick={handleShowAdd} >Edit</Dropdown.Item>
                  <Dropdown.Item className='dropdown-item' onClick={deleteProduct}>Delete</Dropdown.Item>
                  {archiveButton}
              </DropdownButton>
          </td>
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
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
                                <option selected>{item.categories[0]}</option>
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
                    <Button variant="info" className='text-white' onClick={editProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
      </tr>
  )
};

export default AdminProducts;
