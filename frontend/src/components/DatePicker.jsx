import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

export default function DatePicker({ onPick }) {
  const MIN_YEAR = 1995;
  const MAX_YEAR = new Date().getFullYear();

  const [year, setYear] = useState(MAX_YEAR);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const [carouselData, setCarouselData] = useState([]);

  // Format date
  const formatDate = () => {
    const yyyy = year;
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Load preview for selected date
  const loadPreview = async () => {
    const d = formatDate();
    setLoadingPreview(true);

    try {
      const res = await fetch(`/api/apod?date=${d}`);
      const data = await res.json();

      // If date is invalid or APOD doesn't exist
      if (data.error || !data.url) {
        setPreview({
          media_type: "none",
          title: "No APOD available for this date",
        });
        setLoadingPreview(false);
        return;
      }

      if (data.media_type === "image") {
        // Preload image before showing
        const img = new Image();
        img.src = data.url;
        img.onload = () => {
          setPreview(data);
          setLoadingPreview(false);
        };
      } else {
        setPreview(data);
        setLoadingPreview(false);
      }
    } catch (err) {
      setPreview({
        media_type: "none",
        title: "No APOD available for this date",
      });
      setLoadingPreview(false);
    }
  };

  useEffect(() => {
    loadPreview();
  }, [year, month, day]);

  // Load recent carousel (last 8 days)
  useEffect(() => {
    const loadCarousel = async () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 8);

      const fmt = (date) => date.toISOString().slice(0, 10);
      const url = `/api/apod/range?start_date=${fmt(start)}&end_date=${fmt(end)}`;

      const res = await fetch(url);
      const data = await res.json();

      setCarouselData(
        Array.isArray(data)
          ? data.filter((x) => x.media_type === "image")
          : []
      );
    };

    loadCarousel();
  }, []);

  // Load final APOD into the modal
  const handleSelect = async () => {
    setLoading(true);
    await onPick(formatDate());
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center gap-10 px-4 my-10">

      {/* LEFT PANEL — TIMELINE */}
      <div className="w-full lg:w-1/2 bg-black/30 border border-cyan-300 rounded-2xl p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(0,255,255,0.35)]">
        <h2 className="text-center text-3xl font-bold text-cyan-300 mb-10">
          Time Travel Selector
        </h2>

        {/* YEAR */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setYear(Math.max(MIN_YEAR, year - 1))} className="text-cyan-300 text-2xl">◀</button>
            <span className="text-cyan-300 text-xl font-bold">Year: {year}</span>
            <button onClick={() => setYear(Math.min(MAX_YEAR, year + 1))} className="text-cyan-300 text-2xl">▶</button>
          </div>
          <input
            type="range"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={year}
            onChange={(e) => setYear(+e.target.value)}
            className="w-full h-2 accent-cyan-400 bg-black/50 rounded-full"
          />
        </div>

        {/* MONTH */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setMonth(Math.max(1, month - 1))} className="text-cyan-300 text-2xl">◀</button>
            <span className="text-cyan-300 text-xl font-bold">Month: {String(month).padStart(2, "0")}</span>
            <button onClick={() => setMonth(Math.min(12, month + 1))} className="text-cyan-300 text-2xl">▶</button>
          </div>

          <input
            type="range"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(+e.target.value)}
            className="w-full h-2 accent-cyan-400 bg-black/50 rounded-full"
          />
        </div>

        {/* DAY */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setDay(Math.max(1, day - 1))} className="text-cyan-300 text-2xl">◀</button>
            <span className="text-cyan-300 text-xl font-bold">Day: {String(day).padStart(2, "0")}</span>
            <button onClick={() => setDay(Math.min(31, day + 1))} className="text-cyan-300 text-2xl">▶</button>
          </div>

          <input
            type="range"
            min={1}
            max={31}
            value={day}
            onChange={(e) => setDay(+e.target.value)}
            className="w-full h-2 accent-cyan-400 bg-black/50 rounded-full"
          />
        </div>

        {/* LOAD BUTTON */}
        <button
          onClick={handleSelect}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-lg border ${
            loading
              ? "bg-cyan-400 text-black animate-pulse"
              : "bg-black/40 border-cyan-400 text-cyan-300 hover:shadow-[0_0_30px_rgba(0,255,255,1)]"
          }`}
        >
          {loading ? "Loading..." : "Load APOD"}
        </button>
      </div>

      {/* RIGHT PANEL — PREVIEW */}
      <div className="w-full lg:w-1/2 bg-black/20 border border-cyan-400 rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.25)]">

        <h2 className="text-2xl font-bold text-cyan-300 mb-4 text-center">
          Preview APOD
        </h2>

        {/* LOADING */}
        {loadingPreview ? (
          <div className="w-full h-80 rounded-xl bg-black/40 border border-cyan-300 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : preview ? (

          preview.media_type === "none" ? (
            /* NO DATA AVAILABLE */
            <div className="w-full h-80 rounded-xl bg-black/40 border border-red-500 flex items-center justify-center text-red-400 text-lg font-semibold">
              🚫 No APOD available for this date.
            </div>
          ) : (
            /* NORMAL PREVIEW */
            <motion.div
              key={preview.url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => onPick(formatDate())}
              className="cursor-pointer bg-black/30 border border-cyan-400 p-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] transition"
            >
              {preview.media_type === "image" && (
                <img
                  src={preview.url}
                  alt={preview.title}
                  className="rounded-xl w-full max-h-80 object-cover"
                />
              )}

              {preview.media_type === "video" && (
                <div className="rounded-xl bg-black/40 p-5 text-center text-cyan-200">
                  📹 Video APOD — Click to view
                </div>
              )}

              <p className="text-center text-cyan-300 font-medium mt-3">
                {preview.title}
              </p>
            </motion.div>
          )

        ) : (
          /* CAROUSEL FALLBACK */
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            autoplay={{ delay: 2200 }}
            loop={carouselData.length > 1}
            className="w-full h-80 rounded-xl overflow-hidden"
          >
            {carouselData.map((img) => (
              <SwiperSlide key={img.date}>
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-80 object-cover opacity-90"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </div>
  );
}
