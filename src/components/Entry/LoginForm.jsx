import React, { useState, useContext } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import MyContext from '../../FireBase/MyContext';
import signInFireBase from '../../FireBase/signInFireBase';

function LoginForm() {
    const { cookies, setCookies } = useContext(MyContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = async (e) => {
        e.preventDefault();
        const fireBaseUser = await signInFireBase(email, password);
        if (fireBaseUser) {
            setCookies('theme', "dark", { maxAge: 3600 });
            setCookies('name', fireBaseUser.displayName, { maxAge: 3600 });
        }
    };

    return (
        <>
            <Container fluid className="mb-3"
                style={{
                    width: "360.5px",
                    // fontFamily: "Open Sans"
                }}
            >
                <h1>Account Login</h1>
            </Container>
            <Container fluid style={{width: "350px", marginTop: "25px"}}>
                <Row className="user mb-3">
                    <Col>
                        <FloatingLabel controlId="floatingInputUser" label="Email">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                onPaste={(e) => setEmail(e.clipboardData.getData("text"))}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="pass mb-3">
                    <Col>
                        <FloatingLabel controlId="floatingInputPass" label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Ex. 123bb11aa2"
                                onChange={(e) => setPassword(e.target.value)}
                                onPaste={(e) => setPassword(e.clipboardData.getData("text"))}
                                onKeyDown={event => {
                                    // console.log(event.key)
                                    if (event.key === "Enter") {
                                      handleLogin(event);
                                    }
                                  }}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>


                <Button variant="outline-success px-5" size="lg" onClick={handleLogin}>
                    Login
                </Button>
            </Container>
        </>
    );
}

export default LoginForm;