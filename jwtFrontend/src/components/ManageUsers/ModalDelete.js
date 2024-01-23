import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/userService";
function ModalDelete(props) {
  const { handleClose, dataModalDelete } = props;
  // Confirm Modal Delete
  const handleConfirmDeleteUser = async () => {
    const response = await deleteUser(dataModalDelete);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      props.handleClose();
    } else {
      toast.error(response.EM);
    }
  };
  return (
    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete this user: {dataModalDelete.email} ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleConfirmDeleteUser()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
