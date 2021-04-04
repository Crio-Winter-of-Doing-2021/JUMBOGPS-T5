import React from "react";
import { Badge, Button, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HashLink } from 'react-router-hash-link';
import burgerIcon from "../../../../../assets/icons/menu.svg";
import femaleIcon from "../../../../../assets/illustrations/female.svg";
import maleIcon from "../../../../../assets/illustrations/male.svg";
import { getDeviceSize, getUnseenNotificationsCount } from "../../../../../controller/reducer/ui";
import { getUser } from "../../../../../controller/reducer/user";
import "./styles.css";

/**
 * Extract first name from full name
 * @param {string} name full name of user
 * @returns first name from full name
 */
const firstName = (name) => name.split(" ")[0];

/**
 * Header Component
 * @description
 * Header carrying male/female avatar, brand name and sidenav toggling option for
 * low < medium devices
 * @param {function} props.onSelect   Toggle SideNav
 * @component
 * @example
 * return (
 *   <Header onSelect={onSelect}/>
 * )
 */
function Header({ onSelect }) {

  const user = useSelector(getUser);
  const unseenNotificationsCount = useSelector(getUnseenNotificationsCount);
  const deviceSize = useSelector(getDeviceSize);

  return (
    <Navbar className="header justify-content-between" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Trasset</Navbar.Brand>
      {user && user.name && deviceSize!=="sm" && (
        <div className="d-flex ">
          <img
            src={user.profile.isMale ? maleIcon : femaleIcon}
            className="avatar-small"
            alt="avatar"
          />
          <p className="h6 ml-2 mt-1 font-weight-normal text-light">
            {firstName(user.name)}
          </p>
        </div>
      )}
      <div>
        {unseenNotificationsCount !== 0 && (
            <Button
              as={HashLink} to="/#notification"
              smooth 
              variant="outline-light"
              size="sm"
              className="mb-1 mr-2"
            >
              🔔<Badge variant="light">{unseenNotificationsCount}</Badge>
            </Button>
        )}{" "}
        <Button
          variant="outline-light"
          size="sm"
          className="mb-1 burger-container"
        >
          <img src={burgerIcon} onClick={onSelect} className="burger"  alt="menu"/>
        </Button>
      </div>
    </Navbar>
  );
}

export default Header;
