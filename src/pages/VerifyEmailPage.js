import { useContext, useEffect } from "react";
import AuthContext from "../components/store/auth-context";

const VerifyEmailPage = () => {
  const authCtx = useContext(AuthContext);

  const sendVerificationEmail = async (email, token) => {
    const apiKey = "AIzaSyCU5htJbsi7PPgASZ7_N5MjWr0esR_8l-Y";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
    const data = {
      requestType: "VERIFY_EMAIL",
      email: email,
      idToken: token,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyEmailHandler = () => {
    // Replace this with the user's email address
    const email = authCtx.email;
    const token = authCtx.token;
    sendVerificationEmail(email, token);
  };

  return (
    <div>
      <h1>Verify Email</h1>
      <button onClick={verifyEmailHandler}>Verify</button>
    </div>
  );
};

export default VerifyEmailPage;
