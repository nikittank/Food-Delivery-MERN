import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {BsCloudUpload, BsCheckCircle} from "react-icons/bs";
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { FiXCircle } from "react-icons/fi";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const uploadImage = async(e) => {
    try {
      const imageData = await ImagetoBase64(e.target.files[0]);
      setData(prev => ({ ...prev, image: imageData }));
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {name, image, category, price} = data;

    if(!name || !image || !category || !price) {
      return toast.error("Please fill all required fields");
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      if(response.ok) {
        toast.success(result.message || "Product added successfully");
        setData({
          name: "",
          category: "",
          image: "",
          price: "",
          description: ""
        });
      } else {
        throw new Error(result.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Icecream", "Biryani", "Dosa", "Fish", "Pizza", 
    "Chicken", "Starters", "Pasta", "Fried Rice", 
    "Cake", "Noodles", "Burger", "Sandwich"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <p className="text-white/90">Fill in the details below to add a new menu item</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={handleOnChange}
                value={data.name}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={handleOnChange}
                value={data.category}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image <span className="text-red-500">*</span>
              </label>
              <label 
                htmlFor="productImage"
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                  data.image ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {data.image ? (
                  <div className="relative h-full w-full">
                    <img 
                      src={data.image} 
                      className="h-full w-full object-contain p-2" 
                      alt="Preview" 
                    />
                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                      <BsCheckCircle className="text-green-500 text-xl" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 p-6">
                    <BsCloudUpload className="text-4xl mb-2" />
                    <p className="text-sm text-center">
                      Click to upload an image<br />
                      <span className="text-xs">(JPEG, PNG, WEBP)</span>
                    </p>
                  </div>
                )}
                <input 
                  type="file" 
                  id="productImage" 
                  accept="image/*" 
                  onChange={uploadImage} 
                  className="hidden" 
                  required
                />
              </label>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="price"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={handleOnChange}
                  value={data.price}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                name="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={handleOnChange}
                value={data.description}
                placeholder="Enter a detailed description of the product..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  if(data.name || data.image || data.category || data.price) {
                    if(window.confirm("Are you sure you want to discard this product?")) {
                      setData({
                        name: "",
                        category: "",
                        image: "",
                        price: "",
                        description: ""
                      });
                    }
                  }
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Discard
              </button>
              <motion.button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg disabled:opacity-70 transition-all"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSubmitting ? "Saving..." : "Save Product"}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Newproduct;