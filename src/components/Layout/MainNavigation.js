import { Link, useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const isProfileComplete = authCtx.isProfileComplete;
  const isEmailVerified = authCtx.isEmailVerified;

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
          {isLoggedIn && (
            <li>
              <Link to="/add-expense">Add Expense +</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Change Password</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          {isLoggedIn && !isProfileComplete && (
            <li>
              <span style={{ color: "white" }}>
                Your profile is incomplete{" "}
              </span>
              <button onClick={() => history.push("/completeprofile")}>
                Complete profile
              </button>
            </li>
          )}
          {isLoggedIn && isProfileComplete && (
            <li>
              <span style={{ color: "white" }}>Your profile is complete </span>
            </li>
          )}
          {isLoggedIn && !isEmailVerified && (
            <li>
              <Link to="/verify-email">Verify Email</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
