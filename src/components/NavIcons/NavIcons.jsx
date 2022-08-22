import React from "react";

import { UilEstate } from '@iconscout/react-unicons'
import { UilSignOutAlt } from '@iconscout/react-unicons'
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link className="nav" to="../home">
        <div title="Home" >
          <UilEstate />
        </div>
      </Link>
      <Link className="nav" to="../chat">
        <div title="Sign Out" >
          <UilSignOutAlt />
        </div>
      </Link>
    </div>
  );
};

export default NavIcons;
