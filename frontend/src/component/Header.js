import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { TbPaperBag } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { RiMenu5Fill, RiCloseLine } from "react-icons/ri";
import { LiaUserCircle } from "react-icons/lia";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cartItemNumber = useSelector((state) => state.product.cartItem);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast.success("Logged out successfully");
    setShowMenu(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <header className="fixed w-full h-20 px-4 md:px-8 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.img 
            src={logo} 
            alt="EveryDay Eats" 
            className="h-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="listmenu" 
            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
          >
            Menu
          </Link>
          <Link 
            to="about" 
            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
          >
            About
          </Link>
          {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
            <Link 
              to="newproduct" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              New Product
            </Link>
          )}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <Link to="cart" className="relative">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl text-gray-700 hover:text-green-600 transition-colors"
            >
              <TbPaperBag />
            </motion.div>
            {cartItemNumber.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full"
              >
                {cartItemNumber.length}
              </motion.span>
            )}
          </Link>

          {/* Profile Icon */}
          <Link to="contact" className="hidden md:block">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-gray-600"
            >
              {userData.image ? (
                <img 
                  src={userData.image} 
                  alt="User Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <LiaUserCircle className="text-3xl" />
              )}
            </motion.div>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={handleShowMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-3xl text-gray-700"
            aria-label="Menu"
          >
            {showMenu ? <RiCloseLine /> : <RiMenu5Fill />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-20 right-0 left-0 bg-white shadow-lg border-t border-gray-100"
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link 
                to="/" 
                className="px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setShowMenu(false)}
              >
                Home
              </Link>
              <Link 
                to="listmenu" 
                className="px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setShowMenu(false)}
              >
                Menu
              </Link>
              <Link 
                to="about" 
                className="px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setShowMenu(false)}
              >
                About
              </Link>
              <Link 
                to="contact" 
                className="px-4 py-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setShowMenu(false)}
              >
                Profile
              </Link>
              
              {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <Link 
                  to="newproduct" 
                  className="px-4 py-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMenu(false)}
                >
                  New Product
                </Link>
              )}

              <div className="border-t border-gray-200 pt-2 mt-2">
                {userData.image ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout ({userData.firstName})
                  </button>
                ) : (
                  <Link
                    to="login"
                    className="block px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg"
                    onClick={() => setShowMenu(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;