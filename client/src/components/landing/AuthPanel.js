import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import Login from "./Login";
import Signup from "./Signup";
import Tab from "./Tab";

function AuthPanel(props, ref) {
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const guestLogin = () => {
    dispatch(login({ username: "Guest", password: "pass" }));
  };

  return (
    <div className=" w-[90%] sm:w-[60%] md:w-[80%] rounded bg-white" id="loginSection" ref={ref}>
      <div className="flex flex-row">
        <Tab text="LOGIN" active={showLogin} setSelf={setShowLogin} setOther={setShowSignup} />
        <Tab text="SIGN UP" active={showSignup} setSelf={setShowSignup} setOther={setShowLogin} />
      </div>
      {showLogin ? <Login /> : <Signup />}

      <div className="flex flex-col items-center justify-center gap-5 mb-5">
        <p onClick={guestLogin} className="font-thin underline cursor-pointer">
          Login as Guest
        </p>
      </div>
    </div>
  );
}

export default forwardRef(AuthPanel);
