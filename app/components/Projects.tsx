"use client";

import { motion } from "framer-motion";

interface ProjectWithTechnologies {
  id: string;
  title: string;
  description: string;
  projectUrl: string | null;
  githubUrl: string | null;
  technologies: { id: string; name: string }[];
}

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

export default function Projects({
  projects,
}: {
  projects: ProjectWithTechnologies[];
}) {
  return (
    <section id="projets" className="relative px-6 py-24 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-orange-500 mb-6"
          />
          <h2 className="font-[var(--font-inter)] text-4xl md:text-5xl text-black leading-tight tracking-tight">
            Mes <span className="text-gray-600">projets</span>
          </h2>
          <p className="font-[var(--font-libre-baskerville)] text-lg text-gray-600 mt-4 max-w-2xl">
            Découvrez une sélection de mes réalisations les plus récentes et pertinentes.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full bg-gray-50 border border-gray-100 rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Title & links */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3
                    style={{ fontFamily: "var(--font-inter)" }}
                    className="text-xl font-semibold text-black tracking-tight"
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Voir le code source de ${project.title} sur GitHub`}
                        className="text-gray-500 hover:text-black transition-colors"
                      >
                        <GithubIcon />
                      </a>
                    )}
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Voir le projet ${project.title}`}
                        className="text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description (300 chars max) */}
                <p className="font-[var(--font-libre-baskerville)] text-gray-700 leading-relaxed mb-6 flex-1">
                  {project.description.length > 300
                    ? `${project.description.slice(0, 300)}…`
                    : project.description}
                </p>

                {/* Technologies */}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech.id}
                        className="font-[var(--font-inter)] text-xs px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full tracking-wide"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-[var(--font-libre-baskerville)] text-gray-500 text-center text-lg"
          >
            Aucun projet à afficher pour le moment.
          </motion.p>
        )}
      </div>
    </section>
  );
}
