import React from "react";
import { NavLink } from "react-router-dom";

import Landing from "./Landing";
import Home from "./Home";
import SignIn from "./SignIn";
import Account from "./Account";

export default props => (
  <div>
    <ul>
      <li>
        <NavLink exact to="/" component={Landing}>
          Landing
        </NavLink>
      </li>
      <li>
        <NavLink to="/home" component={Home}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/signin" component={SignIn}>
          Sign-in
        </NavLink>
      </li>
      <li>
        <NavLink to="/account" component={Account}>
          Account
        </NavLink>
      </li>
    </ul>
  </div>
);
