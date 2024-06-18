import { Button, Modal } from "react-bootstrap";

const ConfirmDeleteModal = ({ show, close, updateUI, data }) => {

  return (
    <Modal show={show} size="lg" centered backdrop="static">
      <Modal.Header>Confirm</Modal.Header>
      <Modal.Body><h2>Are you sure you want to complete this action?</h2></Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          size="md"
          onClick={(e) => {
            updateUI();
            close();
          }}
        >
          YES
        </Button>
        <Button variant="outline-danger" size="md" onClick={close}>
          NO
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
