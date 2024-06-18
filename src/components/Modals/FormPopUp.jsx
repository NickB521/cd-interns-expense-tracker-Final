import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import ReasonModal from "./ReasonModal";

const FormPopUp = ({ show, close, data, reqId }) => {
  const [showReason, setShowReason] = useState(false);

  return (
    <>
      <Modal id="modalPopUp" show={show} onHide={close} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Expense Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row className="user mb-3">
              <Col>
                <FloatingLabel controlId="floatingInput" label="First Name">
                  <Form.Control
                    disabled
                    value={data.firstName}
                    placeholder={data.firstName}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="Last Name">
                  <Form.Control
                    disabled
                    value={data.lastName}
                    placeholder={data.lastName}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="itemsRequested mb-3">
              <Col>
                <Form.Control
                  disabled
                  value={data.items}
                  placeholder={data.items}
                />
              </Col>
            </Row>
            <Row className="purpose">
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Purpose Of Request"
                >
                  <Form.Control
                    disabled
                    value={data.purpose}
                    placeholder={data.purpose}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="selectedPrograms">
              <ul className="selectedPrograms-List">
                {data.expensePrograms.map((program) => (
                  <li key={Math.random()}>
                    <InputGroup className="mt-3">
                      <InputGroup.Text>
                        {program.programName} cost:{" "}
                      </InputGroup.Text>
                      <Form.Control
                        disabled
                        value={program.cost}
                        placeholder={program.cost}
                      />
                    </InputGroup>
                  </li>
                ))}
              </ul>
            </Row>
            <Row className="program-dropdown mb-3">
              <Col>
                <InputGroup size="lg">
                  <InputGroup.Text>Programs</InputGroup.Text>
                  <Dropdown>
                    <Dropdown.Toggle
                      disabled
                      variant="outline-secondary"
                    ></Dropdown.Toggle>
                  </Dropdown>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <FloatingLabel controlId="floatingInput" label="Total">
                    <Form.Control
                      disabled
                      value={data.total}
                      placeholder={data.total}
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>
            </Row>

            <Row className="dateNeeded mb-3">
              <Col>
                <FloatingLabel controlId="floatingInput" label="Date Needed">
                  <Form.Control
                    disabled
                    value={data.dateNeeded}
                    placeholder={data.dateNeeded}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="signatures mb-3">
              <Col>
                <FloatingLabel controlId="floatingInput" label="Requestor">
                  <Form.Control
                    disabled
                    value={data.requester ? "Approved" : "Pending"}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Requester Supervisor"
                >
                  <Form.Control
                    disabled
                    value={
                      data.requesterSupervisor
                        ? "Approved"
                        : data.reason == ""
                        ? "Pending"
                        : "Denied"
                    }
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Director Of Operations"
                >
                  <Form.Control
                    disabled
                    value={
                      data.doo
                        ? "Approved"
                        : data.reason == ""
                        ? "Pending"
                        : "Denied"
                    }
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInput" label="CEO">
                  <Form.Control
                    disabled
                    value={
                      data.ceo
                        ? "Approved"
                        : data.reason == ""
                        ? "Pending"
                        : "Denied"
                    }
                  />
                </FloatingLabel>
              </Col>
              {data.reason != "" ? (
                <Button
                  className="mt-3"
                  variant="outline-info"
                  onClick={() => setShowReason(true)}
                >
                  View Reason
                </Button>
              ) : (
                ""
              )}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      {showReason ? (
        <ReasonModal
          show={showReason}
          close={() => setShowReason(false)}
          data={data}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default FormPopUp;
