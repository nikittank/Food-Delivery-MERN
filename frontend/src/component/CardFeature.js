import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlide";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { FaStar, FaFire } from "react-icons/fa";

const CardFeature = ({ 
  image, 
  name, 
  price, 
  category, 
  loading, 
  id, 
  description,
  isBestSeller = false 
}) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    e.stopPropagation();
    dispatch(addCartItem({ 
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image,
      description: description
    }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full">
        <div className="animate-pulse flex flex-col h-full">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4 flex-grow flex flex-col">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded mt-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
            alt={name} 
          />
          {isBestSeller && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-2 py-1 rounded-full flex items-center text-xs font-bold">
              <FaFire className="mr-1" />
              <span>BESTSELLER</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow-sm">
            <FaStar className="text-yellow-400 text-xs mr-1" />
            <span className="text-xs font-medium">4.8</span>
          </div>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div className="w-3/4">
              <h3 className="font-bold text-gray-900 text-lg capitalize truncate">{name}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{category}</p>
            </div>
            <p className="font-bold text-gray-900 text-lg whitespace-nowrap">
              <span className="text-green-600">₹</span>
              {price}
            </p>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        </div>
      </Link>
      
      <div className="px-4 pb-4 mt-auto">
        <motion.button
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg transition-all font-medium text-sm"
          onClick={handleAddCartProduct}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus className="text-base" />
          <span>Add</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CardFeature;