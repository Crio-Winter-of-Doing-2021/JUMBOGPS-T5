import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getShowLogout } from "../../../../../controller/reducer/ui";

const LogoutModal = ({onClose,logout}) => {
  const showLogoutModal = useSelector(getShowLogout);

  return (
    <Modal show={showLogoutModal}  onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to Sign Out</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="primary" onClick={logout}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
