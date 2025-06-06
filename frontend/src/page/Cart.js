import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (!user.email) {
      toast.error("Please login to proceed with payment");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    try {
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productCartItem)
      });

      if (res.statusCode === 500) return;

      const data = await res.json();
      toast.loading("Redirecting to payment gateway...");
      
      await stripePromise.redirectToCheckout({ sessionId: data });
    } catch (error) {
      toast.error("Payment processing failed");
      console.error(error);
    }
  };

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
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          variants={containerVariants}
        >
          Your Shopping Cart
        </motion.h1>

        <AnimatePresence>
          {productCartItem[0] ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div 
                className="lg:col-span-2 space-y-6"
                variants={containerVariants}
              >
                {productCartItem.map((el) => (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                ))}
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-6"
                variants={containerVariants}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalQty} items)</span>
                    <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹49.00</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">₹{(totalPrice + 49).toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  onClick={handlePayment}
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure payment processing powered by Stripe
                </p>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img 
                src={emptyCartImage} 
                className="w-64 h-64 object-contain mb-8" 
                alt="Empty cart" 
              />
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
              <motion.button
                onClick={() => navigate("/listmenu")}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Menu
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cart;