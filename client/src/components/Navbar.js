import { Fragment, useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetUser } from "../features/auth/authSlice";
import { resetProjects } from "../features/projects/projectSlice";
import { Menu, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    dispatch(resetProjects());
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5 w-full bg-slate-900 text-white">
        <Link to="/projects">
          <div className="flex flex-row items-center gap-4">
            <img src="/images/ppm_icon.png" alt="job tracker logo" className="max-h-8" />
            <h1 className="text-xl hidden sm:block">Personal Project Manager</h1>
          </div>
        </Link>

        <Menu as="div" className="relative inline-block z-10">
          <div>
            <Menu.Button className="flex flex-row gap-4 hover:text-slate-300">
              <p className="text-xl">{user && user.username}</p>
              <MenuIcon className="h-7" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 bg-slate-700 rounded-sm">
              <div className="py-1 divide-y divide-slate-400">
                <Menu.Item onClick={handleLogout}>
                  <Link to="/" className="block w-full p-2 hover:bg-slate-900">
                    Logout
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
