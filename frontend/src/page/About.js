import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-16"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-90"></div>
          <div className="relative px-8 py-12 sm:py-16 sm:px-12 lg:px-16 lg:py-24">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Tabkha Foods
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mb-8"
              variants={itemVariants}
            >
              Crafting culinary excellence in Coimbatore since 2023
            </motion.p>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* About Section */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-5 text-gray-600">
              <p>
                Founded in 2023, Tabkha Foods began as a small family-owned restaurant in Sai Karan Nagar with a simple mission: to deliver authentic flavors with uncompromising quality.
              </p>
              <p>
                Today, we've grown into one of Coimbatore's most beloved dining destinations, known for our innovative take on traditional recipes and commitment to sustainable sourcing.
              </p>
              <p>
                Our team of award-winning chefs brings together decades of experience from kitchens around the world to create a menu that celebrates both local traditions and global influences.
              </p>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Values</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-green-600">Quality First</h3>
                <p className="text-gray-600">
                  We source only the freshest ingredients from trusted local suppliers and organic farms.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-600">Sustainable Practices</h3>
                <p className="text-gray-600">
                  Zero-waste kitchen, eco-friendly packaging, and energy-efficient operations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-600">Community Focus</h3>
                <p className="text-gray-600">
                  Supporting local producers and giving back through our foundation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 text-white">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-xl">
                    <FiMail />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:71762134001@cit.edu.in" className="hover:underline">
                      71762134001@cit.edu.in
                    </a>
                    <br />
                    <a href="mailto:71762134033@cit.edu.in" className="hover:underline">
                      71762134033@cit.edu.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-xl">
                    <FiPhone />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a href="tel:+918880416700" className="hover:underline">
                      +91 8880416700
                    </a>
                    <br />
                    <a href="tel:+919043045343" className="hover:underline">
                      +91 9043045343
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-xl">
                    <FiMapPin />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>Tabkha Foods, Sai Karan Nagar, Singanallur, Coimbatore - 641005</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a href="#" className="text-2xl hover:text-white/80 transition">
                  <FaInstagram />
                </a>
                <a href="#" className="text-2xl hover:text-white/80 transition">
                  <FaFacebook />
                </a>
                <a href="#" className="text-2xl hover:text-white/80 transition">
                  <FaTwitter />
                </a>
              </div>
            </div>

            <div className="hidden md:block bg-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.123456789012!2d76.987654321!3d11.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA3JzI0LjQiTiA3NsKwNTknMTUuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin" 
                className="w-full h-full min-h-[400px]"
                allowFullScreen="" 
                loading="lazy"
                title="Map Location"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;