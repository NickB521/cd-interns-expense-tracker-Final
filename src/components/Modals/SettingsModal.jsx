import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import {
  Person,
  PersonLinesFill,
  Lock,
  UnlockFill,
  Sun, SunFill, MoonFill,
  Moon
} from "react-bootstrap-icons";

const SettingsModal = ({
  show,
  hide,
  user,
  admin,
  isAdmin,
  theme,
  changeTheme,
}) => {
  const [profile, setProfile] = useState(false);
  const [color, setColor] = useState(false);

  const buttonVar = "outline-" + theme;

  return (
    <Modal size="lg" show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-body">
        <p>
          Toggle Theme:{" "}
          <Button
            variant={buttonVar}
            onClick={changeTheme}
            onMouseEnter={() => setColor(true)}
            onMouseLeave={() => setColor(false)}
          >
            {theme} {theme == "light" ? (color ? <SunFill /> : <Sun />) : (color ? <MoonFill />: <Moon />)}
          </Button>{" "}
        </p>

        {user.admin ? (
          <p>
            Admin View:{" "}
            <Button variant={buttonVar} onClick={isAdmin}>
              {admin ? "ON" : "OFF"} {admin ? <UnlockFill /> : <Lock />}
            </Button>
          </p>
        ) : (
          ""
        )}

        <p>
          Profile:{" "}
          <Button
            variant={buttonVar}
            href="/profile"
            onMouseEnter={() => setProfile(true)}
            onMouseLeave={() => setProfile(false)}
          >
            View {profile ? <PersonLinesFill /> : <Person />}
          </Button>
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
