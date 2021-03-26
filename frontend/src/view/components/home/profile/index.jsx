import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUser } from "../../../../controller/reducer/user";
import maleIcon from "../../../../assets/illustrations/male.svg";
import femaleIcon from "../../../../assets/illustrations/female.svg";
import "./style.css";
import Loader from "../widget/loader";
import { getLoading, getShowSidenav } from "../../../../controller/reducer/ui";

//TODO 
/**
 * Profile Component
 * @description Shows profile of user and allow him/her to make changes
 * @component
 * @example
 * return (
 *   <Profile dispatch={dispatch}/>
 * )
 */
const Profile = ({ dispatch }) => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const user = useSelector(getUser);
  const sidenav = useSelector(getShowSidenav);
  if (useSelector(getLoading)) return <Loader />;

  return (
    <div
      className="container profile bg-light"
      style={{ left: sidenav ? "200px" : "0px" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8 mx-auto">
          <div className="my-4">
            <div className="row mt-5 align-items-center">
              <div className="col-md-3 text-center mb-5">
                <div className="avatar avatar-xl">
                  <img
                    src={user.profile.male ? maleIcon : femaleIcon}
                    alt="user avatar"
                    className="avatar-img rounded-circle"
                  />
                </div>
              </div>
              <div className="col">
                <div className="row align-items-center">
                  <div className="col-md-7">
                    <h4 className="mb-1">{user.name}</h4>
                    <p className="small mb-3">
                      <span className="badge badge-dark">Site Admin</span>
                    </p>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-7">
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris blandit nisl ullamcorper, rutrum metus in, congue
                      lectus. In hac habitasse platea dictumst. Cras urna quam,
                      malesuada vitae risus at, pretium blandit sapien.
                    </p>
                  </div>
                  <div className="col">
                    <p className="small mb-0 text-muted">
                      Nec Urna Suscipit Ltd
                    </p>
                    <p className="small mb-0 text-muted">
                      P.O. Box 464, 5975 Eget Avenue
                    </p>
                    <p className="small mb-0 text-muted">(537) 315-1481</p>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="h4  font-weight-normal">Profile Settings</h1>
            <hr className="my-4" />
            {!showProfileForm && (
              <Button
                onClick={() => setShowProfileForm(!showProfileForm)}
                className="p-20"
                variant="outline-primary"
                block
              >
                Update Profile
              </Button>
            )}
            <div>
              {showProfileForm && (
                <form>
                  <div className="form-row ">
                    <div className="form-group col-md-8">
                      <label value="firstname">Full Name</label>
                      <input
                        type="text"
                        id="firstname"
                        className="form-control"
                        placeholder="Brown"
                        value={user.name}
                        onChange={()=>{}}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label value="inputState5">Gender</label>
                      <select className="form-control">
                        <option value="">Choose...</option>
                        <option>Male</option>
                        <option>Female</option>
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
                    <label value="inputAddress5">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress5"
                      placeholder="P.O. Box 464, 5975 Eget Avenue"
                    />
                  </div>
                  <div className="form-group">
                    <label value="inputAbout5">About</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAbout"
                      placeholder="I love exploring options"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label value="inputRole5">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputRole5"
                        placeholder="Site Admin"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label value="inputPhone5">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputPhone5"
                        placeholder="9101244685"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="primary">
                    Save Change
                  </Button>
                  <Button
                    className="ml-4"
                    onClick={() => setShowProfileForm(!showProfileForm)}
                    variant="outline-secondary"
                  >
                    Close Settings
                  </Button>
                </form>
              )}
              <br />
              <br />
              <h1 className="h4  font-weight-normal">Password Settings</h1>
              <hr className="my-4" />
              {!showPasswordForm && (
                <Button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="m-20"
                  variant="outline-primary"
                  block
                >
                  Update Password
                </Button>
              )}
              <br />
              {showPasswordForm && (
                <form>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label value="inputPassword4">Old Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword5"
                        />
                      </div>
                      <div className="form-group">
                        <label value="inputPassword5">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword5"
                        />
                      </div>
                      <div className="form-group">
                        <label value="inputPassword6">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword6"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-2">Password requirements</p>
                      <p className="small text-muted mb-2">
                        To create a new password, you have to meet all of the
                        following requirements:
                      </p>
                      <ul className="small text-muted pl-4 mb-0">
                        <li>Minimum 8 character</li>
                        <li>At least one special character</li>
                        <li>At least one number</li>
                        <li>Can’t be the same as a previous password</li>
                      </ul>
                    </div>
                  </div>
                  <Button type="submit" variant="primary">
                    Save Password
                  </Button>
                  <Button
                    className="ml-4"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    variant="outline-secondary"
                  >
                    Close Settings
                  </Button>
                </form>
              )}
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
