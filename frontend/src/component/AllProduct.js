import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { motion } from "framer-motion";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(4).fill(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="my-8 max-w-7xl mx-auto px-4">
      {heading && (
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {heading}
        </motion.h2>
      )}

      <div className="flex gap-4 justify-center overflow-x-auto pb-4 scrollbar-hide mb-8">
        {categoryList[0] ? (
          categoryList.map((el) => (
            <FilterProduct
              key={el}
              category={el}
              isActive={el.toLowerCase() === filterby.toLowerCase()}
              onClick={() => handleFilterProduct(el)}
            />
          ))
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading categories...</p>
          </div>
        )}
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dataFilter[0] ? (
          dataFilter.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
              description={el.description}
            />
          ))
        ) : (
          loadingArrayFeature.map((el, index) => (
            <CardFeature loading="Loading..." key={index+"allProduct"} />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default AllProduct;