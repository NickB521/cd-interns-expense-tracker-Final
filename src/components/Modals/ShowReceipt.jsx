import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ShowReceipt = ({ show, close, data }) => {
  console.log(data)
  return (
    <Modal size="lg" show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-body" className="d-flex justify-content-center">
        <embed src={data.receipt} width="500px" height="500px"></embed>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowReceipt;
