import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getShowLogout } from "../../../../../controller/reducer/ui";

/**
 * Logout Modal Component
 * @description Displays a overlay for confirming logout action
 * @param {function} props.onClose   Close Logout Modal
 * @param {function} props.logout   perform logout
 * @component
 * @example
 * return (
 *   <LogoutModal onClose={onClose} logout={logout}/>
 * )
 */
const LogoutModal = ({ onClose, logout }) => {
  const showLogoutModal = useSelector(getShowLogout);

  return (
    <Modal show={showLogoutModal} animation={false}  onHide={onClose}>
      <Modal.Header >
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
