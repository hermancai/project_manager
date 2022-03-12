import { useState } from "react";

function Login({ setError }) {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const validateInput = () => {
    if (!inputs.username || !inputs.password) {
      setError("Missing credentials");
      return false;
    }

    return true;
  };

  const attemptLogin = (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    // TODO: connect to server
  };

  return (
    <form onSubmit={attemptLogin} className="flex flex-col justify-center items-center gap-7 px-5 py-7">
      <input
        name="username"
        placeholder="Username"
        type="text"
        className="grayInput w-full"
        value={inputs.username || ""}
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        value={inputs.password || ""}
        className="grayInput w-full"
        onChange={handleChange}
      />

      <button type="submit" className="customButton customGradient w-full">
        LOGIN
      </button>
    </form>
  );
}

export default Login;
