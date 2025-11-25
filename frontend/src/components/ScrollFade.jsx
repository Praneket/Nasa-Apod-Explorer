import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ScrollFade({ children }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    threshold: 0.2,       // 20% visibility
    margin: "0px 0px -20% 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 70,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
