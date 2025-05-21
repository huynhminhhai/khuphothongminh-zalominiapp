import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import images from "assets/images";

const BlurLoading = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={classNames(
            "fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50"
          )}
        >
          <div>
            <motion.img
              width={80}
              src={images.logopng}
              alt="logo"
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlurLoading;
