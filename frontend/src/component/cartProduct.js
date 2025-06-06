import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlide";
import { motion } from "framer-motion";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();

  return (
    <motion.div 
      className="bg-white rounded-lg p-4 shadow-sm flex gap-4 items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-w-[100px] h-[100px] rounded-lg overflow-hidden">
        <img 
          src={image} 
          className="w-full h-full object-cover" 
          alt={name} 
        />
      </div>
      
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">{name}</h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          
          <motion.button
            className="text-gray-500 hover:text-red-500 p-1"
            onClick={() => dispatch(deleteCartItem(id))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AiFillDelete size={20} />
          </motion.button>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3">
            <motion.button 
              className="bg-gray-100 p-1 rounded hover:bg-gray-200"
              onClick={() => dispatch(decreaseQty(id))}
              whileTap={{ scale: 0.9 }}
            >
              <TbMinus />
            </motion.button>
            
            <span className="font-medium w-6 text-center">{qty}</span>
            
            <motion.button 
              className="bg-gray-100 p-1 rounded hover:bg-gray-200"
              onClick={() => dispatch(increaseQty(id))}
              whileTap={{ scale: 0.9 }}
            >
              <TbPlus />
            </motion.button>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Unit Price</p>
            <p className="font-bold text-gray-800">
              <span className="text-red-500">₹</span>{price}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <p className="font-bold text-lg text-gray-800">
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartProduct;