import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '.././components/AppNavbar';
import { Fragment } from 'react';
import Silder from '.././components/Silder';
import Announcement from '.././components/Announcement';
import Categories from '.././components/Categories';
import Newsletter from '.././components/Newsletter';
import Footer from '.././components/Footer';
import ProductsHome from '.././components/ProductsHome';
import Products from '.././components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsKids from '../components/ProductsKids';


function Home() {
    return (
        <Fragment>
            <AppNavbar />
            <Announcement />
            <Silder />
            <Categories />
            <ProductsHome />
            <Newsletter />
            <Footer />
        </Fragment>
    );
}

export default Home;
