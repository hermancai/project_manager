import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, resetUser } from "../../features/auth/authSlice";
import Spinner from "../Spinner";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess || user) navigate("/projects");

    dispatch(resetUser());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const validateInput = () => {
    if (!inputs.username || !inputs.password) {
      toast.error("Missing username/password");
      return false;
    }

    return true;
  };

  const attemptLogin = (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    dispatch(
      login({
        username: inputs.username,
        password: inputs.password,
      })
    );
  };

  if (isLoading) return <Spinner />;

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

      <button type="submit" className="customButton w-full">
        LOGIN
      </button>
    </form>
  );
}

export default Login;
