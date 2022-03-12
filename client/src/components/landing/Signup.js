import React, { useState } from "react";

function Signup({ setError }) {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const validateInput = () => {
    if (!inputs.username || !inputs.password) {
      setError("Missing credentials");
      return false;
    }

    if (inputs.password !== inputs.repeatPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const attemptSignup = (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    // TODO: connect to server
  };

  return (
    <form onSubmit={attemptSignup} className="flex flex-col justify-center items-center gap-7 px-5 py-7">
      <input
        name="username"
        type="text"
        placeholder="Username"
        className="grayInput w-full"
        value={inputs.username || ""}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={inputs.password || ""}
        className="grayInput w-full"
        onChange={handleChange}
      />

      <input
        name="repeatPassword"
        type="password"
        placeholder="Confirm Password"
        value={inputs.repeatPassword || ""}
        className="grayInput w-full"
        onChange={handleChange}
      />

      <button type="submit" className="customButton customGradient w-full">
        SIGN UP
      </button>
    </form>
  );
}

export default Signup;
