import React, { Fragment, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import ProductsList from './pages/ProductsList';
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProductsMenPage from './pages/ProductsMenPage';
import ProductsWomenPage from './pages/ProductsWomenPage';
import ProductsKidsPage from './pages/ProductsKidsPage';
import { UserProvider } from './UserContext';
import ProductView from './pages/ProductView';
import Swal from 'sweetalert2';
import Cart from './pages/Cart';
import ProductCart from './components/ProductCart';
import Product from './components/Product';
import AdminDashboard from './pages/AdminDashboard';
import OrderHistory from './pages/OrderHistory';
import AdminDashboardOrders from './pages/AdminDashboardOrders';
import Error from './pages/Error';

const App = () => {

  let token = localStorage.getItem("token")

  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  })

  const [cart, setCart] = useState([])

  const [userDetails, setUserDetails] = useState({})

  const [allProducts, setProducts] = useState([])

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


  const unsetUser = () => {
    localStorage.clear();

    setUser({
      id: null,
      isAdmin: null
    })

    Swal.fire({
      title: "Logged Out",
      icon: "info",
    }).then((result) => {

      window.location.reload()
    })
  }

  useEffect(() => {

    fetch("https://ecommerce-api-johann.herokuapp.com/api/users/details", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          })
          setCart(data.orders)
          setUserDetails(data)
        }
      })
  }, [])

  const [orders, setOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])

  const orderHistory = () => {
    fetch("https://ecommerce-api-johann.herokuapp.com/api/order/order-history", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setOrders(data)
      })
  }
  const adminAllOrders = () => {
    fetch("https://ecommerce-api-johann.herokuapp.com/api/order/", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setAllOrders(data)
      })
  }


  let adminView = (user.isAdmin) ?
    <Fragment>
      <Route path="/admin/products" element={<AdminDashboard />}></Route>
      <Route path="/admin/orders" element={<AdminDashboardOrders />}></Route>
    </Fragment>
    : <Fragment>
    </Fragment>



  return (
    <UserProvider value={{ user, setUser, unsetUser, cart, setCart, token, userDetails, allProducts, orders, orderHistory, allOrders, adminAllOrders }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductsList />}></Route>
          <Route path="/products/men" element={<ProductsMenPage />}></Route>
          <Route path="/products/women" element={<ProductsWomenPage />}></Route>
          <Route path="/products/kids" element={<ProductsKidsPage />}></Route>
          <Route path="/product/:id" element={<ProductView />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/cartProduct" element={<ProductCart />}></Route>
          {adminView}
          <Route path="/orders" element={<OrderHistory />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
