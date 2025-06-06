import React, { useRef } from "react";
import { useSelector } from "react-redux";
import AllProduct from "../component/AllProduct";
import { motion } from "framer-motion";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <AllProduct heading={""} />
      </div>
    </motion.div>
  );
};

export default Home;