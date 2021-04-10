import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  getDeviceSize,
  getSpinner,
} from "../../../../../controller/reducer/ui";
import SpinnerComponent from "../../widget/spinner";

const PasswordForm = ({ notify, onSubmit, onClose }) => {
  const deviceSize = useSelector(getDeviceSize);
  const spinner = useSelector(getSpinner);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const submitPassword = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      notify("New passwords should match");
      return;
    }
    const passwordData = { oldPassword, newPassword };
    onSubmit(passwordData);
  };
  return (
    <form onSubmit={submitPassword}>
      {(spinner==="password") && <SpinnerComponent className="spinner-child" />}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="form-group">
            <label value="inputPassword4">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label value="inputPassword5">New Password</label>
            <input
              type="password"
              className="form-control"
              required
              id="inputPassword5"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label value="inputPassword6">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              required
              id="inputPassword6"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <p className="mb-2">Password requirements</p>
          <p className="small text-muted mb-2">
            To create a new password, you have to meet all of the following
            requirements:
          </p>
          <ul className="small text-muted pl-4 mb-0">
            <li>Minimum 8 character</li>
            <li>At least one special character</li>
            <li>At least one number</li>
            <li>Can’t be the same as a previous password</li>
          </ul>
        </div>
      </div>
      <Button
        className="mt-4"
        type="submit"
        variant="primary"
        size={deviceSize}
      >
        Save Password
      </Button>
      <Button
        className="ml-4 mt-4"
        onClick={onClose}
        variant="outline-secondary"
        size={deviceSize}
      >
        Close Settings
      </Button>
    </form>
  );
};

export default PasswordForm;
