import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const attemptRegister = async (e) => {
    e.preventDefault();

    fetch("/login/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputs.username,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setError(res.error);

        if (res.token) localStorage.setItem("token", res.token);
        navigate("/login");
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

  return (
    <div className="flexCenter grow w-full customGradient">
      <div className="flexCenter flex-col w-[90%] sm:w-[60%] md:w-[40%] border-2 border-gray-400 rounded bg-white">
        <form className="flexCenter flex-col gap-7 p-5 w-[80%]" onSubmit={attemptRegister}>
          <h1 className="text-2xl font-bold text-sky-700">SIGN UP</h1>
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
              className="inputBlack"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col w-full">
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              className="inputBlack"
              value={inputs.confirmPassword || ""}
              onChange={handleChange}
            />
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="customGradient text-white font-bold rounded-full py-2 px-3 cursor-pointer w-full"
          >
            SIGN UP
          </button>
          <div className="flexCenter flex-col gap-4 mt-5">
            <p className="text-sm underline cursor-pointer" onClick={guestLogin}>
              Login As Guest
            </p>
            <p className="text-sm underline cursor-pointer" onClick={() => navigate("/login")}>
              Login With Existing Account
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
