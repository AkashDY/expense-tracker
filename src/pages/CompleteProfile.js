import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../components/store/auth-context";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  //----------------------------------------------------------
  useEffect(() => {
    const fetchProfileData = async () => {
      const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCU5htJbsi7PPgASZ7_N5MjWr0esR_8l-Y";
      const data = {
        idToken: authCtx.token,
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
        if (responseData.users && responseData.users.length > 0) {
          const user = responseData.users[0];
          setName(user.displayName || "");
          setProfilePicture(user.photoUrl || null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [authCtx.token]);

  //-----------------------------------------------------------
  const submitHandler = async (event) => {
    event.preventDefault();
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCU5htJbsi7PPgASZ7_N5MjWr0esR_8l-Y";
    const data = {
      displayName: name,
      photoUrl: profilePicture,
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
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    authCtx.completeProfile();
    history.push("/");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="profile-picture">Profile Picture:</label>
        <input
          type="file"
          id="profile-picture"
          onChange={(event) => setProfilePicture(event.target.files[0])}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default CompleteProfile;
