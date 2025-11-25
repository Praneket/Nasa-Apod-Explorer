import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import milkyway from "../assets/milkyway.jpg";

export default function Gallery({ items = [], onOpen }) {
  return (
    <section className="mt-10 px-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-cyan-300">
        Recent
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map((it) => {
          const ref = useRef(null);
          const inView = useInView(ref, {
            threshold: 0.3,     // card becomes visible when 30% in view
            margin: "0px 0px -20% 0px",
          });

          return (
            <motion.div
              key={it.date}
              ref={ref}
              initial={{ opacity: 0, y: 60 }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 60,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-lg cursor-pointer"
              onClick={() => onOpen(it)}
            >
              {/* ⭐ IMAGE */}
              {it.media_type === "image" && (
                <img
                  src={it.url}
                  alt={it.title}
                  className="rounded-lg w-full h-44 object-cover shadow-xl"
                />
              )}

              {/* ⭐ VIDEO */}
              {it.media_type === "video" && (() => {
                let videoId = null;

                if (it.url.includes("youtube.com/watch")) {
                  const params = new URLSearchParams(it.url.split("?")[1]);
                  videoId = params.get("v");
                } else if (it.url.includes("youtube.com/embed/")) {
                  videoId = it.url.split("embed/")[1].split("?")[0];
                }

                const thumbnail = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : milkyway;

                return (
                  <div className="relative w-full h-44 rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={thumbnail}
                      alt={it.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="
                        w-16 h-16 
                        bg-cyan-500/40 
                        rounded-full 
                        flex items-center justify-center 
                        backdrop-blur-md 
                        shadow-[0_0_25px_rgba(0,255,255,1)]
                        text-white text-3xl font-bold
                      ">
                        ▶
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ⭐ OTHER */}
              {it.media_type === "other" && (
                <div className="relative w-full h-44 rounded-lg overflow-hidden shadow-xl bg-black/40 border border-cyan-500/40 backdrop-blur-md flex items-center justify-center">
                  <p className="text-cyan-300 text-center text-sm px-3">
                    No image / video available.<br />
                    Tap to read explanation.
                  </p>
                </div>
              )}

              {/* ⭐ TITLE */}
              <p className="mt-2 text-sm text-white/90 font-medium text-center">
                {it.title}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
