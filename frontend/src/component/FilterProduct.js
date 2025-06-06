import React from "react";
import { motion } from "framer-motion";
import { 
  GiRiceCooker,
  GiNoodles,
  GiFullPizza,
  GiChickenOven,
  GiBarbecue,
  GiMeat,
  GiIndianPalace,
  GiChopsticks
} from "react-icons/gi";

const categoryIcons = {
  "biryani": <GiRiceCooker className="text-xl" />,
  "fried rice": <GiIndianPalace className="text-xl" />,
  "noodles": <GiNoodles className="text-xl" />,
  "pasta": <GiFullPizza className="text-xl" />,
  "chicken": <GiChickenOven className="text-xl" />,
  "starters": <GiBarbecue className="text-xl" />,
  "mutton": <GiMeat className="text-xl" />,
  "chinese": <GiChopsticks className="text-xl" />
};

const FilterProduct = ({ category, onClick, isActive }) => {
  const icon = categoryIcons[category.toLowerCase()] || <GiRiceCooker className="text-xl" />;
  
  return (
    <motion.div 
      className="flex flex-col items-center min-w-[80px] cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className={`p-3 rounded-xl flex items-center justify-center transition-all ${
        isActive 
          ? "bg-gradient-to-br from-green-600 to-green-800 text-white shadow-lg" 
          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
      }`}>
        {icon}
      </div>
      <p className={`text-center font-medium mt-2 capitalize text-sm md:text-base ${
        isActive ? "text-green-700 font-semibold" : "text-gray-600"
      }`}>
        {category}
      </p>
    </motion.div>
  );
};

export default FilterProduct;