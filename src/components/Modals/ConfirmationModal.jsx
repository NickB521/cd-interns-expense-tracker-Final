import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ConfirmationModal = ({ show, confirm, close, data, role }) => {
  return (
    <Modal id="modalPopUp" show={show} onHide={close} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {data[role] ? "Approval " : "Denial "}
          Confirmation
        </Modal.Title>
      </Modal.Header>
      {data[role] ? (
        ""
      ) : (
        <Modal.Body>
          <Container fluid>
            <Row className="purpose">
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Reason for Denial"
                >
                  <Form.Control
                    placeholder={""}
                    onChange={(e) => {
                      data.reason = e.target.value;
                    }}
                    onPaste={(e) => {
                      data.reason = e.clipboardData.getData("text");
                    }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button onClick={(e) => confirm()}>Please Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmationModal;
