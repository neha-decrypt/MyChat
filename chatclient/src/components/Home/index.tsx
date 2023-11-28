import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Home() {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another page
    navigate("/login");
  };

  return (
    <>
      <div>home</div>
      <button
        onClick={() => {
          isLoggedIn ? logout() : handleClick();
        }}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </>
  );
}

export default Home;
