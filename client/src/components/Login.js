import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../api/auth";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({});
  const [showLogin, setShowLogin] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const attemptLogin = async (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: inputs.username, password: inputs.password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("from attemptLogin" + res);
        if (res.error) return setError(res.error);

        if (res.token) localStorage.setItem("token", res.token);
        navigate("/");
      });
  };

  const guestLogin = () => {
    fetch("/login/guest", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.token) return setError(res.error);
        localStorage.setItem("token", res.token);
        navigate("/");
      });
  };

  useEffect(() => {
    verifyUser().then((res) => {
      console.log("from login useeffect " + res);
      if (!res.isLoggedIn) return setShowLogin(true);
      navigate("/");
    });
  }, [navigate]);

  return showLogin ? (
    <div className="flexCenter grow w-full customGradient">
      <div className="flexCenter flex-col w-[90%] sm:w-[60%] md:w-[40%] rounded bg-white">
        <form className="flexCenter flex-col gap-7 p-5 w-[80%]" onSubmit={attemptLogin}>
          <h1 className="text-2xl font-bold text-sky-700">LOGIN</h1>
          <label className="flex flex-col w-full">
            Username
            <input
              name="username"
              type="text"
              className="inputBlack"
              value={inputs.username || ""}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col w-full">
            Password
            <input
              name="password"
              type="password"
              value={inputs.password || ""}
              className="inputBlack"
              onChange={handleChange}
            />
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="customGradient text-white font-bold rounded-full py-2 px-3 cursor-pointer w-full"
          >
            LOGIN
          </button>
          <div className="flexCenter flex-col gap-4 mt-5">
            <p className="text-sm underline cursor-pointer" onClick={guestLogin}>
              Login As Guest
            </p>
            <p className="text-sm underline cursor-pointer" onClick={() => navigate("/signup")}>
              Sign Up
            </p>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default Login;
