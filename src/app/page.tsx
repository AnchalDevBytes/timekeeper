"use client";
import { Footer } from "@/components";
import { useEffect, useState } from "react";
import { CiCalendar, CiClock2 } from "react-icons/ci";

export default function HomePage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date : Date) : string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">
          <div
            className="text-center opacity-0 translate-y-5 animate-fade-in-up"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Timekeeper
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-2xl">
              Your time, beautifully organized. Experience the next generation of
              calendar management.
            </p>
          </div>
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 animate-spin-slow border-4 border-purple-300/30 rounded-full"></div>
            <div className="absolute inset-4 animate-spin-slow-reverse border-4 border-blue-300/40 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-4xl font-bold">
                {formatTime(time)}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col items-center space-y-8 opacity-0 translate-y-5 animate-fade-in-up"
          >
            <div className="flex space-x-4">
              <div
                className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2 hover:scale-105 transition-transform"
              >
                <CiCalendar className="w-5 h-5 text-purple-200" />
                <span className="text-white">Smart Scheduling</span>
              </div>
              <div
                className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2 hover:scale-105 transition-transform"
              >
                <CiClock2 className="w-5 h-5 text-purple-200" />
                <span className="text-purple-100">Time Analytics</span>
              </div>
            </div>

            <button
              className="bg-white text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all duration-300 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl"
              onClick={() => {
                window.location.href = "/signin";
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
