import React, { Fragment } from 'react'
import AppNavbar from '../components/AppNavbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import ProductsMen from '../components/ProductsMen'

const ProductsMenPage = () => {
    return (
        <Fragment>
            <AppNavbar/>
            <Announcement/>
            <ProductsMen />
            <Newsletter/>
            <Footer/>
        </Fragment>
    )
}

export default ProductsMenPage
