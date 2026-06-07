import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const influencers = [
  "Sapna Rai",
  "Nidhi Shah",
  "Jal Hiradiya",
  "Purva Pandey",
  "Manali Gandhi",
  "Srishti Dani",
  "Vishrut Kshatriya",
  "Om Parekh",
  "Dhruvil Shah",
];

const InfluencersMarquee = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % influencers.length);
    }, 2000); // Change name every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full text-center py-12">
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-xs md:text-sm">Trusted By</p>
          <h2 className="font-display text-xl md:text-3xl font-bold mb-4">9+ Influencers Globally</h2>
      <div className="relative h-10 mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-2xl font-semibold"
          >
            <FaQuoteLeft className="mr-4 text-gray-500" />
            <span>{influencers[index]}</span>
            <FaQuoteRight className="ml-4 text-gray-500" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InfluencersMarquee;
