import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../FireBase/MyContext.jsx";
import * as userService from "../services/UserService.jsx";

const Profile = () => {
  const { cookies, setCookies } = useContext(MyContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!cookies.name) {
      navigate("/");
    }
    requestUserDataFromApi();
  }, [cookies.name]);

  function requestUserDataFromApi() {
    userService.getUserByUsername(cookies.name).then((res) => {
      setUser(res.data);
    });
  }

  return (
    <>
      <Container fluid>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="../src/assets/CDLogo.png" />
          <Card.Body>
            <Card.Title>User Information</Card.Title>
            <Card.Text className="mb-1">
                  Username: {user.name}
            </Card.Text>
            <Card.Text className="mb-1">
                  {user.role}
            </Card.Text>
            <Card.Text className="mb-1">
                  {user.admin ? "Admin" : ""}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
