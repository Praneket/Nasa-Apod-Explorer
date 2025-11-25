import React from "react";
import { motion } from "framer-motion";

export default function Dashboard({ apod, onOpen }) {
  return (
    <section className="mt-10 px-4 flex justify-center">
      <motion.div
        className="max-w-3xl w-full bg-black/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/10 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => onOpen(apod)}
      >
        <h2 className="text-3xl font-bold mb-3 text-center text-cyan-200 drop-shadow">
          Today's Astronomy Picture
        </h2>

        <h3 className="text-xl font-semibold">{apod.title}</h3>
        <p className="opacity-70 mb-3">{apod.date}</p>

        {apod.media_type === "image" ? (
          <img
            src={apod.url}
            alt={apod.title}
            className="rounded-xl w-full max-h-[520px] object-cover shadow-lg"
          />
        ) : (
          <div className="bg-black p-10 rounded-xl text-center">Video</div>
        )}

        <p className="mt-3 opacity-80 text-sm leading-relaxed">
          {apod.explanation?.slice(0, 200)}...
        </p>
      </motion.div>
    </section>
  );
}
