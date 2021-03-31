import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { getUser, getProfile } from '../../../../../controller/reducer/user';
import { Button } from "react-bootstrap";

const ProfileForm = ({onSubmit,onClose}) => {
    const user = useSelector(getUser);
    const profile = useSelector(getProfile);

    const [name, setName] = useState(profile.name);
    const [about, setAbout] = useState(profile.about);
    const [address, setAddress] = useState(profile.address);
    const [male, setMale] = useState(profile.isMale);
    const [role, setRole] = useState(profile.role);
    const [phone, setPhone] = useState(profile.phone);

    const submitProfile = (e) => {
        e.preventDefault();
        const profileData = { name, about, address, isMale: String(male), role, phone };
        onSubmit(profileData);
      };

    return (
        <form onSubmit={submitProfile}>
        <div className="form-row ">
          <div className="form-group col-md-8">
            <label value="firstname">Full Name</label>
            <input
              type="text"
              id="firstname"
              className="form-control"
              placeholder="Brown"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <label value="inputState5">Gender</label>
            <select
              value={male ? "M" : "F"}
              onChange={(e) => {
                setMale(e.target.value === "M");
              }}
              className="form-control"
            >
              <option value={"M"}>Male</option>
              <option value={"F"}>Female</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label value="inputEmail4">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="brown@asher.me"
            value={user.email}
            readOnly={true}
          />
        </div>
        <div className="form-group">
          <label>Address {profile.address}</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress5"
            placeholder="P.O. Box 464, 5975 Eget Avenue"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label value="inputAbout5">About</label>
          <input
            type="text"
            className="form-control"
            id="inputAbout"
            placeholder="I love exploring options"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label value="inputRole5">Role</label>
            <input
              type="text"
              className="form-control"
              id="inputRole5"
              required
              placeholder="Site Admin"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-6">
            <label value="inputPhone5">Phone</label>
            <input
              type="text"
              className="form-control"
              id="inputPhone5"
              placeholder="9101244685"
              value={phone}
              onChange={(e) => {
                setPhone(Number(e.target.value));
              }}
            />
          </div>
        </div>
        <Button type="submit" variant="primary">
          Save Change
        </Button>
        <Button
          className="ml-4"
          onClick={onClose}
          variant="outline-secondary"
        >
          Close Settings
        </Button>
      </form>
    )
}

export default ProfileForm
