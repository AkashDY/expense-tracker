import { Link, useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import CompleteProfile from "../../pages/CompleteProfile";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const isProfileComplete = authCtx.isProfileComplete;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          {isLoggedIn && !isProfileComplete && (
            <li>
              <span>Your profile is incomplete</span>
              <button onClick={() => history.push("/completeprofile")}>Complete profile</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;