import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SettingsModal from "../Modals/SettingsModal";
import { useState, useContext, useEffect } from "react";
import * as userService from "../../services/UserService.jsx";
import MyContext from "../../FireBase/MyContext";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
// Add more variety to icons to make change more noticable
import {
  DoorClosed, DoorOpenFill, House, HouseFill, Gear, GearFill,
  FileText, FileTextFill, Folder, FolderFill
} from "react-bootstrap-icons";

const NavbarC = ({ admin, setAdmin }) => {
  const [showSett, setShowSett] = useState(false);
  const [home, setHome] = useState(false);
  const [form, setForm] = useState(false);
  const [fold, setFold] = useState(false);
  const [sett, setSett] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const { cookies, setCookies, updateCookies } = useContext(MyContext);

  const [theme, setTheme] = useState("");
  const [navStyle, setNavStyle] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (cookies.admin) {
      setAdmin(true);
    }

    if (cookies.theme === "light") {
      document.querySelector("html").setAttribute("data-bs-theme", "light");
      setTheme("dark");
      setNavStyle({ backgroundColor: '#d1d3d4' });
    } else {
      document.querySelector("html").setAttribute("data-bs-theme", "dark");
      setTheme("light")
      setNavStyle({ backgroundColor: "#212529" });
    }
  }, []);

  function toggleTheme() {
    const currTheme = document
      .querySelector("html")
      .getAttribute("data-bs-theme");
    if (currTheme === "dark") {
      document.querySelector("html").setAttribute("data-bs-theme", "light");
      setTheme("dark");
      setCookies("theme", "light");
      setNavStyle({ backgroundColor: '#d1d3d4' });

    } else {
      document.querySelector("html").setAttribute("data-bs-theme", "dark");
      setCookies("theme", "dark");
      setTheme("light")
      setNavStyle({ backgroundColor: "#212529" });
    }
  }

  const [user, setUsers] = useState();

  useEffect(() => {
    requestDataFromApi();
  }, []);

  function requestDataFromApi() {
    userService.getUserByUsername(cookies.name).then((res) => {
      setUsers(res.data);
    });
  }

  const handleLogOut = () => {
    Cookies.remove("name");
    Cookies.remove("theme");
    Cookies.remove("admin");
    setAdmin(false);
    setForm(false);
    setFold(false);
    setHome(false);
    setLogOut(false);
    setSett(false);
  }

  return (
    <>

      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;1,300&display=swap');
      </style>
      {location.pathname == "/" ? "" : (<Navbar
        style={navStyle}
        expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/">
              <img
                style={{ height: 25, margin: 0 }}
                src="/src/assets/CDBrand.png"
              />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                onMouseEnter={() => setHome(true)}
                onMouseLeave={() => setHome(false)}
              >
                Home {home ? <HouseFill size={20} /> : <House size={20} />}
              </Nav.Link>
              <Nav.Link
                href="/request"
                onMouseEnter={() => setForm(true)}
                onMouseLeave={() => setForm(false)}
              >
                {/* FileRichtextFill instead of FileTextFill */}
                Request Form{" "}
                {form ? <FileTextFill size={20} /> : <FileText size={20} />}
              </Nav.Link>
              <Nav.Link
                href="/archive"
                onMouseEnter={() => setFold(true)}
                onMouseLeave={() => setFold(false)}
              >
                {/* FileRichtextFill instead of FileTextFill */}
                Archive{" "}
                {fold ? <FolderFill size={20} /> : <Folder size={20} />}
              </Nav.Link>
              <Button variant="transparent" size="md" onClick={() => setShowSett(true)}
                onMouseEnter={() => setSett(true)}
                onMouseLeave={() => setSett(false)}
              >
                Settings {sett ? <GearFill size={20} /> : <Gear size={20} />}
              </Button>
              <Button
                variant="transparent"
                size="md"
                onClick={() => {
                  handleLogOut()
                }}
                onMouseEnter={() => setLogOut(true)}
                onMouseLeave={() => setLogOut(false)}
              >
                Sign Out
                {logOut ? <DoorOpenFill size={20} /> : <DoorClosed size={20} />}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>)}

      {showSett ? (
        <SettingsModal
          show={showSett}
          hide={() => setShowSett(false)}
          admin={admin}
          user={user}
          isAdmin={() => {
            setAdmin(!admin);
            setCookies('admin', !admin, { maxAge: 3600 });
          }}
          theme={theme}
          changeTheme={() => {
            toggleTheme();
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default NavbarC;