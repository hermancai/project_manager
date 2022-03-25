import { useRef } from "react";
import { ArrowDownIcon } from "@heroicons/react/outline";
import AuthPanel from "../components/landing/AuthPanel";

function Landing() {
  const panelRef = useRef();

  const scrollToLogin = () => {
    const element = panelRef;
    element.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full gap-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col justify-center items-center w-full md:w-[50%] min-h-screen text-white gap-4 p-5 text-center">
        <img src="/images/ppm_icon.png" alt="job tracker logo" className="max-h-[280px] mt-auto md:mt-0" />
        <h1 className="text-5xl">Personal Project Manager</h1>
        <p>Keep track of your project tasks.</p>
        <div
          className="flex flex-col justify-center items-center self-center gap-3 mt-auto cursor-pointer md:hidden"
          onClick={scrollToLogin}
        >
          <p>Login/Sign Up</p>
          <ArrowDownIcon className="h-5 animate-bounce" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-[50%] min-h-screen">
        <AuthPanel ref={panelRef} />
      </div>
    </div>
  );
}

export default Landing;
