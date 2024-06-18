import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Container from "react-bootstrap/Container";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../FireBase/MyContext";
import { Button } from "react-bootstrap";

const EntryPoint = () => {
  const { cookies, setCookies } = useContext(MyContext);
  const [pageBool, setPageBool] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.name) {
      navigate("/home");
    }
  }, [cookies.name]);

  return (
    <Container
      style={{
        border: "solid 1px #495057",
        backgroundColor: "#231f20",
        padding: "25px 25px",
        borderRadius: "6.5px",
      }}
    >
      <img width={333} src="../../src/assets/CDIcon2.png" />
      {pageBool ? <SignUpForm /> : <LoginForm />}
      <Button
        className="mt-2"
        variant="outline-info"
        size="sm"
        onClick={() => setPageBool(!pageBool)}
      >
        {pageBool ? "Already Have an Account." : "Create an Account?"}
      </Button>
    </Container>
  );
};

export default EntryPoint;
