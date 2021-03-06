import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, resetUser } from "../../features/auth/authSlice";
import Spinner from "../Spinner";

function Signup() {
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

    if (inputs.password !== inputs.repeatPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const attemptSignup = (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    dispatch(
      register({
        username: inputs.username,
        password: inputs.password,
      })
    );
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

      <button type="submit" className="customButton w-full">
        {isLoading ? <Spinner small={true} /> : "SIGN UP"}
      </button>
    </form>
  );
}

export default Signup;
