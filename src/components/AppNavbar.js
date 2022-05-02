import { Container, Nav, Navbar, Button, Modal, Form} from "react-bootstrap"
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import Swal from "sweetalert2";


const AppNavbar = () => {

    const [showLogin, setShowLogin] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showRegister, setShowRegister] = useState(false);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const { user, setUser, unsetUser, cart, setCart } = useContext(UserContext);

    // Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {

        if (email !== "" && password !== "") {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }

    }, [email, password])

    function Login(e) {
        e.preventDefault()


        fetch("https://bleza-ecommerce-api.herokuapp.com/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {

                if (data !== false) {
                    
                    setShowLogin(false)

                    localStorage.setItem("token", data.access)
                    userDetails(data.access)

                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Enjoy Shopping!"
                    }).then((result) => {
                        window.location.reload()
                    })

                } else {
                    Swal.fire({
                        title: "Authentication failed",
                        icon: "error",
                        text: "Check your login details and try again"
                    })
                }
            })

        setEmail("")
        setPassword("")
    }

    const userDetails = (token) => {

        fetch("https://bleza-ecommerce-api.herokuapp.com/api/users/details", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin
                })

            })
    }


    // Register

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [emailR, setEmailR] = useState("")
    const [passwordR, setPasswordR] = useState("")
    const [cp, setCp] = useState("")

    const [isActiveR, setIsActiveR] = useState(true)



    function registerUser(e) {
        e.preventDefault()



        fetch("https://bleza-ecommerce-api.herokuapp.com/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                firstName: firstName,
                lastName: lastName,
                email: emailR,
                password: passwordR,
                mobileNo: mobileNo
            })
        }).then(response => response.json())
            .then(data => {


                if (data) {


                    Swal.fire({
                        title: "Registered Successful",
                        icon: "success",
                        text: "Welcome to SHOP!"
                    }).then((result) => {
                        window.location.reload()
                        // setShowLogin(true)
                    })

                    setShowRegister(false)

                    setFirstName("")
                    setLastName("")
                    setMobileNo("")
                    setEmailR("")
                    setPasswordR("")
                    setCp("")
                } else {
                    Swal.fire({
                        title: "Duplicate email found",
                        icon: "error",
                        text: "Please provide a different email"
                    })
                }
            })

        


    }

    useEffect(() => {

        if (emailR != "" && passwordR != "" && cp != "" &&
            passwordR == cp && mobileNo >= 11) {
            setIsActiveR(false)
        }

    }, [emailR, passwordR, cp])


    let rightNav = (user.id != null && user.isAdmin == false) ?
        <Nav>
            <Nav.Link className="navtext">
                <Link to="/orders">
                    Order History
                </Link>
            </Nav.Link>
            <Nav.Link className="navtext" onClick={unsetUser}>
                <Link to="/">
                    Logout
                </Link>
            </Nav.Link>
            <Nav.Link className="navtext">
                <Badge badgeContent={cart.length} showZero color="info">               
                    <Link to="/cart">
                        <ShoppingCartOutlined className="cart" />
                    </Link>
                </Badge>
            </Nav.Link>

        </Nav>

        : (user.id != null && user.isAdmin) ?

            <Nav >
                <Nav.Link className="navtext">
                        <Link to="/admin/products">
                            Admin Dashboard
                        </Link>
                </Nav.Link>
                <Nav.Link className="navtext">
                    <Link to="/orders">
                        Order History
                    </Link>
                </Nav.Link>
                <Nav.Link className="navtext" onClick={unsetUser}>
                    <Link to="/">
                        Logout
                    </Link>
                </Nav.Link>
                <Nav.Link className="navtext">
                    <Badge badgeContent={cart.length} showZero color="info">
                        <Link to="/cart">
                            <ShoppingCartOutlined className="cart" />
                        </Link>
                    </Badge>
                </Nav.Link>
            </Nav>

        : <Nav>
            <Nav.Link className="navtext" onClick={handleShowLogin}>Login</Nav.Link>
            <Nav.Link className="navtext" onClick={handleShowRegister}>Register</Nav.Link>
        </Nav>


    return (
        

        <Navbar collapseOnSelect expand="xl">
            <Container>
                <Navbar.Brand href="#home" className="logo"><Link to="/">SHOP</Link></Navbar.Brand>
 
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="navtext">
                            <Link to="/products">All Products</Link>
                        </Nav.Link>
                        <Nav.Link className="navtext">
                            <Link to="/products/men">Men</Link>
                        </Nav.Link>
                        <Nav.Link className="navtext">
                            <Link to="/products/women">Women</Link>
                        </Nav.Link>
                        <Nav.Link className="navtext">
                            <Link to="/products/kids">Kids</Link>
                        </Nav.Link>

                    </Nav>
                    {rightNav}
                </Navbar.Collapse>
                <Modal show={showLogin} onHide={handleCloseLogin}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => Login(e)}>
                            <Form.Group 
                                className="mb-3" 
                                controlId="formBasicEmail"
                                >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button 
                                variant="info" 
                                type="submit" 
                                className="text-white w-100"
                                disabled={isDisabled}
                            >
                                Login
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                <Modal show={showRegister} onHide={handleCloseRegister}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => registerUser(e)}>
                            <Form.Group className="mb-3" controlId="formBasicfirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }} 
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasiclastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter last name" 
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicmobileNo">
                                <Form.Label>Contact number</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter contact number" 
                                    value={mobileNo}
                                    onChange={(e) => {
                                        setMobileNo(e.target.value)
                                    }}
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                    value={emailR}
                                    onChange={(e) => {
                                        setEmailR(e.target.value)
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={passwordR}
                                    onChange={(e) => {
                                        setPasswordR(e.target.value)
                                    }}
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="ConfirmPassword" 
                                    value={cp}
                                    onChange={(e) => {
                                        setCp(e.target.value)
                                    }}
                                    />
                            </Form.Group>
                            <Button 
                                variant="info" 
                                type="submit" 
                                className="text-white w-100" 
                                disabled={isActiveR}
                                >
                                Register
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Navbar>

        
        
    )
}

export default AppNavbar
