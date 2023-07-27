import { Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./components/store/auth-context";
import CompleteProfile from "./pages/CompleteProfile";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ExpensePage from "./pages/ExpensePage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/completeprofile">
          {authCtx.isLoggedIn && <CompleteProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/verify-email">
          {authCtx.isLoggedIn && <VerifyEmailPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
        <Route path="/add-expense">
          {authCtx.isLoggedIn && <ExpensePage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
      </>
    </Layout>
  );
}

export default App;
