import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({ onLogin }) => {
  console.log("🔍 REACT_APP_GOOGLE_CLIENT_ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);

  if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    console.error("❌ Google Client ID is missing. Check .env file.");
    return <p style={{ color: "red" }}>Google Client ID is missing.</p>;
  }

  const handleLoginSuccess = async (response) => {
    console.log("✅ Google Login Response:", response);
    const idToken = response.credential;
    // Save the token (if needed)
    localStorage.setItem("google_id_token", idToken);

    // Call your backend sign-in endpoint to exchange the ID token for user details
    try {
      const res = await fetch("http://localhost:8000/auth/google-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });
      if (!res.ok) {
        throw new Error("Google sign-in failed on the backend.");
      }
      const userData = await res.json();
      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      onLogin(userData);
      window.location.reload();
    } catch (error) {
      console.error("Error in backend sign-in:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("❌ Google Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
