import React, { useState, useContext } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { createUser } from '../../services/UserService';
import signUpFireBase from '../../FireBase/signUpFireBase';
import MyContext from '../../FireBase/MyContext';

function SignUpForm() {
    const [userEmail, setUserEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const { cookies, setCookies } = useContext(MyContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const username = lastname + ", " + firstname;
        const fireBaseUser = await signUpFireBase(userEmail, password, username);
        if (fireBaseUser) {
            createUser({ name: username, pass: password, email: userEmail, admin: false, uid: fireBaseUser.uid })
            setCookies('name', username, { maxAge: 3600 });
        }

    };

    return (
        <Container>
            <Container 
                fluid
                className="mb-3"
                style={{
                    // border: "solid white 1px",
                    width: "360.5px",
                    marginTop: "0px",
                    fontSize: "83%"
                }}
            >
                <h1>Account Creation</h1>
            </Container>
            <Container 
                fluid
                style={{
                    marginTop: "25px",
                    width: "350px"
                }}
            >
                <Row className="email mb-3">
                    <Col>
                        <FloatingLabel controlId="floatingInputEmail" label="Email">
                            <Form.Control
                                type="email"
                                placeholder="PlaceHolder@gmail.com"
                                onChange={(e) => setUserEmail(e.target.value)}
                                onPaste={(e) => setUserEmail(e.clipboardData.getData("text"))}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="first mb-3">
                    <Col>
                        <FloatingLabel controlId="floatingInputEmail" label="First Name">
                            <Form.Control
                                type="name"
                                placeholder="John"
                                onChange={(e) => setFirstname(e.target.value)}
                                onPaste={(e) => setFirstname(e.clipboardData.getData("text"))}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col className="last mb-3">
                        <FloatingLabel controlId="floatingInputUser" label="Last Name">
                            <Form.Control
                                type="name"
                                placeholder="Doe"
                                onChange={(e) => setLastname(e.target.value)}
                                onPaste={(e) => setLastname(e.clipboardData.getData("text"))}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col className="pass mb-3">
                        <FloatingLabel controlId="floatingInputPass" label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Ex. 123bb11aa2"
                                onChange={(e) => setPassword(e.target.value)}
                                onPaste={(e) => setPassword(e.clipboardData.getData("text"))}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>


                <Button variant="outline-success px-5" size="lg" onClick={handleSignUp}>
                    Sign Up
                </Button>
            </Container>
        </Container>
    );
}

export default SignUpForm;