import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getByDate, getToday, getRange } from "./api";

import Dashboard from "./components/Dashboard";
import Gallery from "./components/Gallery";
import DatePicker from "./components/DatePicker";
import IntroAnimation from "./components/IntroAnimation";
import ScrollFade from "./components/ScrollFade";

import "./index.css";

export default function App() {
  const [today, setToday] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [selected, setSelected] = useState(null);
  const [introDone, setIntroDone] = useState(false);

  // ⭐ Custom cursor
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    window.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }, []);

  // ⭐ Load APOD data
  useEffect(() => {
    getToday().then(setToday).catch(console.error);

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 8);

    const fmt = (d) => d.toISOString().slice(0, 10);

    getRange(fmt(start), fmt(end))
      .then((data) => setGallery(Array.isArray(data) ? data.reverse() : [data]))
      .catch(console.error);
  }, []);

  // ⭐ Intro animation first
  if (!introDone) return <IntroAnimation onFinish={() => setIntroDone(true)} />;

  return (
    <div className="min-h-screen flex flex-col bg-stars bg-cover bg-center bg-fixed text-white">
      {/* HEADER */}
      <ScrollFade>
        <header className="py-6 text-center">
          <motion.h1
            className="font-orbitron text-4xl md:text-5xl font-bold drop-shadow-lg tracking-wide text-cyan-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            NASA APOD EXPLORER
          </motion.h1>
        </header>
      </ScrollFade>

      <main className="flex-grow">
        {/* TODAY'S APOD */}
        {today && (
          <ScrollFade>
            <Dashboard apod={today} onOpen={setSelected} />
          </ScrollFade>
        )}

        {/* DATE PICKER SECTION */}
        <ScrollFade>
          <section className="controls my-8">
            <DatePicker
              onPick={(date) => {
                getByDate(date).then(setSelected).catch(console.error);
              }}
            />
          </section>
        </ScrollFade>

        {/* GALLERY */}
        <ScrollFade>
          <Gallery items={gallery} onOpen={setSelected} />
        </ScrollFade>

        {/* FOOTER */}
        <footer className="mt-auto py-6 text-center text-cyan-300/80 backdrop-blur-md bg-black/20 border-t border-cyan-400/20">
          <small className="font-exo tracking-wide">
            Data sourced from NASA APOD
          </small>
        </footer>
      </main>

      {/* MODAL VIEWER */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white/10 border border-cyan-400 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative modal-scroll-hide"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              className="absolute right-4 top-4 bg-cyan-500 text-black px-3 py-1 rounded-lg hover:bg-cyan-300 transition"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold">{selected.title}</h2>
            <p className="opacity-80 mb-4">{selected.date}</p>

            {/* MEDIA HANDLING */}
            {selected.media_type === "image" && (
              <img
                src={selected.url}
                alt={selected.title}
                className="rounded-xl w-full max-h-[400px] object-contain"
              />
            )}

            {selected.media_type === "video" && (
              <iframe
                src={
                  selected.url.includes("watch?v=")
                    ? selected.url.replace("watch?v=", "embed/")
                    : selected.url
                }
                title={selected.title}
                className="rounded-xl w-full h-[400px]"
                allowFullScreen
              />
            )}

            {selected.media_type === "other" && (
              <div className="rounded-xl bg-black/40 p-6 text-center text-cyan-300">
                ⚠ No direct media available — see description below.
              </div>
            )}

            <p className="mt-4 leading-relaxed text-sm">
              {selected.explanation}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
