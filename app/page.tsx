"use client";

import Welcome from "./components/Welcome";
import About from "./components/About";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Welcome />
      <About />
    </div>
  );
}
