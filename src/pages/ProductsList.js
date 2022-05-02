import React, { Fragment } from 'react'
import AppNavbar from '../components/AppNavbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Products from '../components/Products'
import ProductsWomen from '../components/ProductsWomen'
import ProductsKids from '../components/ProductsKids'

const ProductsPage = () => {
    return (
        <Fragment>
            <AppNavbar/>
            <Announcement/>
            <Products />
            <Newsletter/>
            <Footer/>
        </Fragment>
    )
}

export default ProductsPage
