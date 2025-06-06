import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiLogOut, FiUser, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user.email) {
    toast.error('Please login to view your profile');
    setTimeout(() => navigate('/login'), 1000);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={itemVariants}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {user.image ? (
                    <img 
                      src={user.image} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full border-4 border-white/30 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <FaUserCircle className="text-3xl text-white" />
                    </div>
                  )}
                  <button 
                    className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                    onClick={() => navigate('/profile/edit')}
                  >
                    <FiEdit className="text-blue-600" />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-white/90">Premium Member</p>
                </div>
              </div>
              <button 
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition"
                onClick={() => {
                  // Add logout functionality here
                  toast.success('Logged out successfully');
                  setTimeout(() => navigate('/'), 1000);
                }}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiUser className="text-blue-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="font-medium">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="font-medium">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium flex items-center gap-2">
                    <FiMail className="text-blue-600" />
                    {user.email}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiMapPin className="text-blue-600" />
                Contact Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium flex items-center gap-2">
                    <FiPhone className="text-blue-600" />
                    {user.phoneno || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">
                    {user.address || 'No address saved'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Browse Menu CTA */}
          <motion.div 
            className="border-t border-gray-200 p-6 text-center"
            variants={itemVariants}
          >
            <button 
              onClick={() => navigate('/menu')}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-md transition w-full max-w-xs"
            >
              Browse Our Menu
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;