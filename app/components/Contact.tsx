"use client";

import { motion } from "framer-motion";

interface ContactProps {
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  cvPath?: string;
}

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const contactLinks = [
  {
    icon: MailIcon,
    label: "Email",
    href: "mailto:axel.charrier1@ecoles-epsi.net",
    text: "axel.charrier1@ecoles-epsi.net",
    external: false,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/axel-charrier1/",
    text: "Mon profil LinkedIn",
    external: true,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/axelcharrier",
    text: "Mon profil GitHub",
    external: true,
  },
];

export default function Contact({
  email,
  linkedinUrl,
  githubUrl,
  cvPath = "/CV-Axel-CHARRIER.pdf",
}: ContactProps) {
  const links = [...contactLinks];
  if (email) {
    links[0] = { ...links[0], href: `mailto:${email}`, text: email };
  }
  if (linkedinUrl) {
    links[1] = { ...links[1], href: linkedinUrl };
  }
  if (githubUrl) {
    links[2] = { ...links[2], href: githubUrl };
  }

  return (
    <section id="contact" className="relative px-6 py-24 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Texte d'intro + remerciement */}
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
            <h2 className="font-[var(--font-inter)] text-4xl md:text-5xl text-black leading-tight tracking-tight">
              Me <span className="text-gray-600">contacter</span>
            </h2>
            <div className="space-y-4">
              <p className="font-[var(--font-libre-baskerville)] text-lg text-gray-700 leading-relaxed">
                Vous avez un projet en tête, une question ou simplement envie d&#39;échanger ? N&#39;hésitez pas à me contacter via l&#39;un des moyens ci-dessous.
              </p>
              <p className="font-[var(--font-libre-baskerville)] text-lg text-gray-700 leading-relaxed">
                Merci d&#39;avoir pris le temps de parcourir mon portfolio. Chaque visite compte et je suis reconnaissant de l&#39;intérêt que vous portez à mon travail. Au plaisir d&#39;échanger avec vous !
              </p>
            </div>

            {/* Bouton télécharger CV */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href={cvPath}
                download
                style={{ fontFamily: "var(--font-inter)" }}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-6 py-3 rounded-sm transition-colors"
              >
                <DownloadIcon />
                Télécharger mon CV
              </a>
            </motion.div>
          </motion.div>

          {/* Cartes de contact */}
          <div className="space-y-6">
            {links.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                <motion.a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="block bg-white p-6 rounded-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-sm flex items-center justify-center text-orange-500">
                      <link.icon />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-[var(--font-inter)] text-lg text-black">{link.label}</h3>
                      <p className="font-[var(--font-libre-baskerville)] text-gray-600 text-sm leading-relaxed truncate">{link.text}</p>
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
