import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import femaleIcon from "../../../../assets/illustrations/female.svg";
import maleIcon from "../../../../assets/illustrations/male.svg";
import {
  getLoading,
  getShowSidenav,
  setError,
} from "../../../../controller/reducer/ui";
import {
  getProfile,
  getUser,
  loadProfile,
  updatePassword,
  updateProfile,
} from "../../../../controller/reducer/user";
import { useSelectedTab } from "../../../hooks/useSelectedTab";
import Loader from "../widget/loader";
import ProfileForm from "./form";
import PasswordForm from "./form-password";
import "./style.css";

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
const Profile = () => {
  const dispatch = useDispatch();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const user = useSelector(getUser);
  const profile = useSelector(getProfile);
  const sidenav = useSelector(getShowSidenav);
  const loading = useSelector(getLoading);

  const closeProfile = () => setShowProfileForm(false);
  const closePassword = () => setShowPasswordForm(false);

  const notify = (msg) => dispatch(setError(msg));

  useSelectedTab("4");

  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  const profileSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  const passwordSubmit = (data) => {
    dispatch(updatePassword(data));
  };
  if (loading) return <Loader />;

  return (
    <div
      className=" profile bg-light"
      style={{ left: sidenav ? "var(--sidenav-width)" : "0px" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8 mx-auto">
          <div className="my-4">
            <div className="row mt-5 align-items-center">
              <div className="col-md-3 text-center mb-5">
                <div className="avatar avatar-xl">
                  <img
                    src={profile.isMale ? maleIcon : femaleIcon}
                    alt="user avatar"
                    className="avatar-img rounded-circle"
                  />
                </div>
              </div>
              <div className="col">
                <div className="row align-items-center">
                  <div className="col-md-7">
                    <h4 className="mb-1">{user.name}</h4>
                    <p className=" mb-3">
                      <span className="p-1 badge badge-dark">
                        {profile.role}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-7">
                    <p className="text-muted">{profile.about}</p>
                  </div>
                  <div className="col">
                    <p className="small mb-0 text-muted">{profile.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="h4  font-weight-normal">Profile Settings</h1>
            <hr className="my-4" />
            {!showProfileForm && (
              <Button
                onClick={() => setShowProfileForm(true)}
                className="p-20"
                variant="outline-primary"
                block
              >
                Update Profile
              </Button>
            )}
            <div>
              {showProfileForm && (
                <ProfileForm onSubmit={profileSubmit} onClose={closeProfile} />
              )}
              <br />
              <br />
              <h1 className="h4  font-weight-normal">Password Settings</h1>
              <hr className="my-4" />
              {!showPasswordForm && (
                <Button
                  onClick={() => setShowPasswordForm(true)}
                  className="m-20"
                  variant="outline-primary"
                  block
                >
                  Update Password
                </Button>
              )}
              <br />
              {showPasswordForm && (
                <PasswordForm
                  onSubmit={passwordSubmit}
                  notify={notify}
                  onClose={closePassword}
                />
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
