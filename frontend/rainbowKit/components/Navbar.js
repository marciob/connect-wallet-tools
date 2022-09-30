import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-scroll";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* for main Navcontainer */}
      <nav className="shadow-sm  w-full z-10">
        <div className="w-full m">
          <div className="flex items-center h-20 w-full">
            {/* first block section Outer part */}
            <div className="flex items items-center mx-20 justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0">
                <h1 className="font-bold text-xl cursor-pointer">Logo</h1>
              </div>
              {/* for small screen we don't show tabs that's Y written hidden and on medium devices i.e. md
              we want them as block */}
              <div className="hidden md:block">
                <dvi className="ml-10 flex items-baseline space-x-4">
                  {/* link carry some of the properties like activeClass i.e. on current page,
                    to i.e on about page if there, smooth i.e transotion between tabs,
                    offset i.e time interval transition. duration i.e how much time it will change */}
                  <Link
                    activeClass="Home"
                    to="about"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black"
                  >
                    Home
                  </Link>

                  <Link
                    activeClass="about"
                    to="about"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>

                  <Link
                    activeClass="contact"
                    to="contact"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer  text-white px-3 py-2 rounded-md text-sm font-medium "
                  >
                    {/* Connect */}
                    <ConnectButton />
                  </Link>
                </dvi>
              </div>
            </div>
            {/* Work on mobile responsive */}
            <div className="mr-10 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* it takes the icon menu from w3 website */}
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12" // for cross shape
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* transition from headlessui for smoothness in mobile experience */}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            //handle the mobile menu tabs
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
              >
                <Link
                  href="/home"
                  activeClass="home"
                  to="home"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  activeClass="about"
                  to="about"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  activeClass="work"
                  to="work"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  <ConnectButton />
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
