import React from "react";
import { GoogleLogin } from "react-google-login";
import { googleSignIn } from "../services/api";

const GoogleSignIn = ({ onSuccess }) => {
  const responseGoogle = async (response) => {
    try {
      const user = await googleSignIn({ token: response.tokenId });
      onSuccess(user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSignIn;