"use client";

import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Petit accent orange */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-orange-500"
          />

          {/* Titre principal avec Inter */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[var(--font-inter)] text-5xl md:text-6xl lg:text-7xl text-black leading-tight tracking-tight"
          >
            Bonjour,
            <br />
            <span className="text-gray-600">
              je suis <span className="text-black">Axel</span>
            </span>
          </motion.h1>

          {/* Description avec Libre Baskerville */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-[var(--font-libre-baskerville)] text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed"
          >
            Développeur passionné par la création d&#39;expériences web modernes et
            performantes. Je transforme des idées en solutions digitales élégantes
            et fonctionnelles.
          </motion.p>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.a
              href="#projets"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="font-[var(--font-inter)] inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-sm transition-colors hover:bg-gray-800 text-sm tracking-wide"
            >
              Découvrir mes projets
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="font-[var(--font-inter)] inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black rounded-sm transition-all hover:bg-black hover:text-white text-sm tracking-wide"
            >
              Me contacter
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Indicateur de scroll avec animation subtile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-[var(--font-inter)] text-xs text-gray-400 uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-orange-500 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

