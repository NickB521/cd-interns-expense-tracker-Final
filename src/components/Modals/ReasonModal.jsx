import Modal from "react-bootstrap/Modal";

const ReasonModal = ({ close, show, data }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Reason Of Denial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>{data.reason}</h1>
      </Modal.Body>
    </Modal>
  );
};

export default ReasonModal;
