import React from 'react'
import { Carousel, Container } from 'react-bootstrap'

const Silder = () => {
    return (
        <Container className='mt-3 d-none d-lg-block'>
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://im.uniqlo.com/global-cms/spa/resb6bbc32e412c30bb3e0c4b590155fb18fr.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://im.uniqlo.com/global-cms/spa/res030d2d2950276c7dcc1057dfe482e6b8fr.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://im.uniqlo.com/global-cms/spa/resfd845f599f432d52aa33a1c4b6970589fr.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://im.uniqlo.com/global-cms/spa/res6aa04da630fee6ab3c0b81393c511aecfr.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </Container>
    )
}

export default Silder
