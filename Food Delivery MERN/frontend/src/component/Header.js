import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { RiMenu5Fill } from "react-icons/ri";
import { LiaUserCircle } from "react-icons/lia";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className="fixed bg-white bg-opacity-50 backdrop-blur-lg drop-shadow-lg shadow-sm w-full h-16 px-2 md:px-6 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-9">
            <img src={logo} alt="EveryDay Eats" className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-10 md:gap-16">
          <nav className="gap-10 md:gap-14 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"listmenu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer px-2">
                    New product
                  </Link>
                )}
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-2 -right-3 text-white bg-lime-900 h-4 w-4 rounded-full m-0 p-0 text-xs text-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className="text-4xl cursor-pointer w-12  text-slate-600 h-12 rounded-full overflow-hidden drop-shadow-md">
          <Link to = {"contact"} >
              {userData.image ? (
                <img src={userData.image} alt="User Profile" className="h-full  w-full" />
              ) : (
              <p className="mt-1.5">
                <LiaUserCircle />
                </p>
              )}</Link></div>
          <div className=" text-slate-600 " onClick={handleShowMenu}>

                          <div className="text-4xl mt-3  cursor-pointer w-12 h-12  overflow-hidden drop-shadow-md">
              { (
                <RiMenu5Fill />
              )}
            
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 gap-2 rounded-lg shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-lime-900"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"listmenu"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Profile
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
