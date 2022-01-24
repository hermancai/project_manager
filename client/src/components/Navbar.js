import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { verifyUser } from "../api/auth";

function Navbar() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    verifyUser().then((res) => {
      console.log("from navbar" + res);
      if (res.isLoggedIn) return setUser(res.username);
      navigate("/login");
    });
  }, [setUser, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-row justify-end customGradient w-full p-5">
        {user && (
          <div className="flex flex-row gap-5">
            <p>{user}</p>
            <p onClick={logout}>Logout</p>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
