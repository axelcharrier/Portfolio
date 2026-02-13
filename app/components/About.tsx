"use client";
import { motion } from "framer-motion";
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);
const MagnifyingGlassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
);
const aboutCards = [
  {
    icon: BookIcon,
    title: "Apprentissage continu",
    description: "Toujours en quête de nouvelles connaissances, je m'investis dans l'exploration des technologies émergentes et l'amélioration constante de mes compétences.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Recherche & Curiosité",
    description: "Passionné par la résolution de problèmes complexes, j'adopte une approche méthodique et curieuse pour trouver des solutions innovantes.",
  },
  {
    icon: UsersIcon,
    title: "Collaboration",
    description: "Convaincu que les meilleures idées naissent de l'échange, je valorise le travail d'équipe et la communication ouverte dans chaque projet.",
  },
];
export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-orange-500"
            />
            <h2 className="font-[var(--font-inter)] text-4xl md:text-5xl font-bold text-black leading-tight tracking-tight">
              À propos<br /><span className="text-gray-600">de moi</span>
            </h2>
            <div className="space-y-4">
              <p className="font-[var(--font-libre-baskerville)] text-lg text-gray-700 leading-relaxed">
                Développeur web passionné, je mets mon expertise au service de projets ambitieux qui allient performance technique et expérience utilisateur soignée.
              </p>
              <p className="font-[var(--font-libre-baskerville)] text-lg text-gray-700 leading-relaxed">
                Mon parcours m&#39;a permis d&#39;acquérir une vision globale du développement, de la conception à la mise en production. Je m&#39;efforce de créer des solutions digitales qui font la différence.
              </p>
              <p className="font-[var(--font-libre-baskerville)] text-lg text-gray-700 leading-relaxed">
                Au-delà du code, je suis animé par la volonté de comprendre les besoins réels et de proposer des réponses adaptées, élégantes et pérennes.
              </p>
            </div>
          </motion.div>
          <div className="space-y-6">
            {aboutCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-sm flex items-center justify-center text-orange-500">
                      <card.icon />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-[var(--font-inter)] text-lg font-semibold text-black">{card.title}</h3>
                      <p className="font-[var(--font-libre-baskerville)] text-gray-600 text-sm leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
