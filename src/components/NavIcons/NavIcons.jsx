import React from "react";

import { UilEstate } from '@iconscout/react-unicons'
import { UilSignOutAlt } from '@iconscout/react-unicons'
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import { useDispatch } from "react-redux";

const NavIcons = () => {

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <div className="navIcons">
      <Link className="nav" to="../home">
        <div title="Home" >
          <UilEstate />
        </div>
      </Link>
      <Link className="nav" to="../auth">
        <div title="Sign Out" >
          <UilSignOutAlt onClick={handleLogOut} />
        </div>
      </Link>
    </div>
  );
};

export default NavIcons;
