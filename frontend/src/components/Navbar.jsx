import { useContext, useEffect, useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContextProvider";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authorized, setAuthorized, token, navigate } =
    useContext(ShopContext);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("type");
    setAuthorized(false)
  };


  return (
    <header className="bg-white translate-y-[-10px] relative">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 mb-20"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              src="/public/assets/logo.png"
              className={`w-20 ${mobileMenuOpen ? "hidden" : "block"} h-20`}
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/"
            className="text-sm/6 font-semibold text-gray-900 hover:underline"
          >
            HOME
          </NavLink>
          <NavLink
            to="/services"
            className="text-sm/6 font-semibold text-gray-900 hover:underline"
          >
            SERVICES
          </NavLink>
          <NavLink
            to="/tracking"
            className="text-sm/6 font-semibold text-gray-900 hover:underline"
          >
            TRACKING
          </NavLink>
          <NavLink
            to="/contact"
            className="text-sm/6 font-semibold text-gray-900 hover:underline"
          >
            CONTACT US
          </NavLink>
          <NavLink
            to="/about"
            className="text-sm/6 font-semibold text-gray-900 hover:underline"
          >
            ABOUT US
          </NavLink>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <Link
                  to="/profile"
                  className="p-2 rounded-full transition-colors "
                >
                  <UserIcon className="h-6 w-6 text-gray-700" />
                </Link>
              </div>

              <button
                onClick={()=>{
                  handleLogout();
                  window.location.reload()
                }}
                className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                <span className="sr-only lg:not-sr-only">Log out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm/6 font-semibold text-gray-900 hover:underline"
            >
              LOG IN <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img src="/public/assets/logo.png" className="w-28" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  to="/services"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SERVICES
                </Link>
                <Link
                  to="/tracking"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  TRACKING
                </Link>
                <Link
                  to="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CONTACT US
                </Link>
                <Link
                  to="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT US
                </Link>
              </div>

              <div className="py-6">
                {authorized ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center -mx-3 rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserIcon className="h-6 w-6 mr-3 text-gray-400" />
                      Your Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center -mx-3 rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3 text-gray-400" />
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
