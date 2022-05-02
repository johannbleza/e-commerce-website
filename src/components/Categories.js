import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Categories = () => {
    return (
        <Container className='my-4'>
            <Row className='p-0 m-0' >
                <Col className='col-12 col-lg-4 cat-lg p-0 mb-2'>
                    <img src='https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/446997/sub/goods_446997_sub9.jpg?width=1600&impolicy=quality_75' className='img-fluid cat-img'/>
                    <div className='cat-container'>
                    <h1 className='cat-text'>MEN</h1>
                    <Link to="/products/men">
                        <button className='cat-button'>SHOP NOW</button>
                    </Link>
                    
                    </div>
                </Col>
                <Col className='col-12 col-lg-4 cat-lg p-0 mb-2'>
                    <img src='https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442666/sub/goods_442666_sub9.jpg?width=1600&impolicy=quality_75' className='img-fluid'/>
                    <div className='cat-container'>
                        <h1 className='cat-text'>WOMEN</h1>
                        <Link to="/products/women">
                            <button className='cat-button'>SHOP NOW</button>
                        </Link>
                    </div>
                </Col>
                <Col className='col-12 col-lg-4 cat-lg p-0 mb-2'>
                    <img src='https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/447865/item/phgoods_00_447865.jpg?width=1600&impolicy=quality_75' className='img-fluid'/>
                    <div className='cat-container'>
                        <h1 className='cat-text'>KIDS</h1>
                        <Link to="/products/kids">
                            <button className='cat-button'>SHOP NOW</button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Categories
