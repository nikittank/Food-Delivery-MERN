import React, { useRef , useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import { Link } from "react-router-dom";
import logo from "../assest/FRONT.png";
import { motion } from "framer-motion";
import { FaMotorcycle, FaClock, FaStar } from "react-icons/fa";
import { FiPackage, FiPercent } from 'react-icons/fi';
import heroImage from "../assest/hero-image.jpg";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const [featuredProducts] = useState(() => {
    // Select 4 random products and mark 2 as bestsellers
    const shuffled = [...productData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4).map((product, index) => ({
      ...product,
      isBestSeller: index < 2 // First two are bestsellers
    }));
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative px-4 py-12 md:py-24 md:px-10 lg:px-20 bg-gradient-to-r from-green-50 to-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <motion.div className="md:w-1/2 z-10" variants={itemVariants}>
            <div className="mb-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                New Arrivals
              </span>
              <span className="flex items-center text-yellow-600">
                <FaStar className="mr-1" /> 4.9 (1.2k+ Reviews)
              </span>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              <span className="text-gray-900">Hungry?</span>{' '}
              <span className="text-green-600">Order in Seconds,</span>{' '}
              <span className="text-green-800">Delivered in Minutes!</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-lg"
              variants={itemVariants}
            >
              Tabkha Foods brings Coimbatore's finest flavors to your doorstep within a 30km radius. Experience culinary excellence delivered fast.
            </motion.p>
            
            <motion.div className="flex flex-wrap gap-4 mb-8" variants={itemVariants}>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaMotorcycle className="text-green-600" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaClock className="text-green-600" />
                <span>30-min Promise</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link 
                to="/menu" 
                className="inline-block bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Order Now
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute -z-10 w-full h-full bg-green-100 rounded-2xl rotate-6 scale-95 opacity-70"></div>
            <div className="absolute -z-20 w-full h-full bg-green-50 rounded-2xl -rotate-6 scale-95 opacity-70"></div>
            <img
              src={heroImage}
              alt="Tabkha Foods"
              className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-xl object-cover h-96"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <section className="px-4 py-12 md:px-10 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our <span className="text-green-600">Signature</span> Dishes
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((el) => (
              <CardFeature
                key={el._id}
                id={el._id}
                name={el.name}
                category={el.category}
                price={el.price}
                image={el.image}
                description={el.description}
                isBestSeller={el.isBestSeller}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="px-4 py-12 md:px-10 lg:px-20 bg-gray-50">
        <AllProduct heading="Explore Our Full Menu" />
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 md:px-10 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            What Our <span className="text-green-600">Customers</span> Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The biryani here is absolutely divine! Best I've had in Coimbatore.",
                author: "Rahul K.",
                rating: 5
              },
              {
                quote: "Fast delivery and food was still piping hot. Will order again!",
                author: "Priya M.",
                rating: 5
              },
              {
                quote: "Consistently great quality. My go-to place for family dinners.",
                author: "Arjun S.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-medium text-green-600">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;