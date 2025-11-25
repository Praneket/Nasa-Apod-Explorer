import { motion } from "framer-motion";

export default function IntroAnimation({ onFinish }) {
  return (
    <motion.div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80')",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 3.2, delay: 1 }}
      onAnimationComplete={onFinish}
    >
      <motion.h1
        className="font-orbitron text-white text-5xl md:text-7xl font-bold tracking-[0.2em] drop-shadow-lg"
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 1.0, opacity: 5 }}
        transition={{ duration: 5.6 }}
      >
        NASA APOD EXPLORER
      </motion.h1>
    </motion.div>
  );
}
