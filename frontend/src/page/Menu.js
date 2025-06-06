import { toast } from 'react-toastify';
import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";
import {FiPlus } from "react-icons/fi";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.filter((el) => el._id === filterby)[0];

  const handleAddCartProduct = (e) => {
    e.stopPropagation();
    dispatch(addCartItem(productDisplay));
    toast.success("Added to cart!");
  };

  if (!productDisplay) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md mx-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Product not found</h2>
          <p className="text-gray-600 mb-6">The item you're looking for isn't available</p>
          <motion.button 
            onClick={() => navigate("/listmenu")}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium w-full max-w-xs mx-auto shadow-sm hover:shadow-md transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Browse Our Menu
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="bg-white rounded-2xl shadow-sm overflow-hidden md:flex border border-gray-100"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          {/* Product Image */}
          <div className="md:w-1/2 lg:w-2/5 p-6 md:p-8">
            <motion.div 
              className="relative overflow-hidden rounded-xl aspect-square bg-gray-50"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src={productDisplay.image}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                alt={productDisplay.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-sm font-medium">View full image</span>
              </div>
            </motion.div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 lg:w-3/5 p-6 md:p-8">
            <div className="flex flex-col h-full">
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold tracking-wide mb-4">
                  {productDisplay.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                  {productDisplay.name}
                </h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center text-amber-400 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">(24 reviews)</span>
                </div>

                <div className="mb-8">
                  <p className="text-3xl font-bold text-gray-900 mb-3">
                    <span className="text-emerald-600">₹</span>{productDisplay.price}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{productDisplay.description}</p>
                </div>
              </div>

              <div className="mt-auto">
                <motion.button
                  onClick={handleAddCartProduct}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiPlus className="text-lg" />
                  Add
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 px-2 tracking-tight">You May Also Like</h3>
          <AllProduct heading={""} />
        </div>
      </div>
    </motion.div>
  );
};

export default Menu;