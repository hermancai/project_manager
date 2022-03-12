import { useState, forwardRef } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Tab from "./Tab";

function AuthPanel(props, ref) {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState(null);

  const guestLogin = () => {
    // TODO
  };

  return (
    <div className=" w-[90%] sm:w-[60%] md:w-[80%] rounded bg-white" id="loginSection" ref={ref}>
      <div className="flex flex-row">
        <Tab text="LOGIN" active={showLogin} setSelf={setShowLogin} setOther={setShowSignup} setError={setError} />
        <Tab text="SIGN UP" active={showSignup} setSelf={setShowSignup} setOther={setShowLogin} setError={setError} />
      </div>
      {showLogin ? <Login setError={setError} /> : <Signup setError={setError} />}

      <div className="flex flex-col items-center justify-center gap-5 mb-5">
        <p className="text-red-500 text-sm">{error}</p>
        <p onClick={guestLogin} className="font-thin underline cursor-pointer">
          Login as Guest
        </p>
      </div>
    </div>
  );
}

export default forwardRef(AuthPanel);
