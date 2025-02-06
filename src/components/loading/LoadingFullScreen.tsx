import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

const BlurLoading = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={classNames(
            "fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50"
          )}
          >
          <span className="loader"></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlurLoading;
