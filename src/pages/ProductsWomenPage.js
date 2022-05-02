import React, { Fragment } from 'react'
import AppNavbar from '../components/AppNavbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Products from '../components/Products'
import ProductsWomen from '../components/ProductsWomen'
import ProductsKids from '../components/ProductsKids'

const ProductsWomenPage = () => {
    return (
        <Fragment>
            <AppNavbar/>
            <Announcement/>
            <ProductsWomen />
            <Newsletter/>
            <Footer/>
        </Fragment>
    )
}

export default ProductsWomenPage
