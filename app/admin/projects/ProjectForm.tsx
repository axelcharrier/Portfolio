"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Project, Technology } from "@/lib/database.types";
import Link from 'next/link'
import { v4 as uuidv4 } from "uuid";

interface ProjectFormProps {
  project?: Project;
  technologies: Technology[];
  projectTechnologyIds?: string[];
}

export default function ProjectForm({
  project,
  technologies,
  projectTechnologyIds = [],
}: ProjectFormProps) {
  const router = useRouter();
  const isEditing = !!project;

  const [formData, setFormData] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    projectUrl: project?.projectUrl ?? "",
    githubUrl: project?.githubUrl ?? "",
    featured: project?.featured ?? false,
    order: project?.order ?? 0,
  });

  const [selectedTechIds, setSelectedTechIds] =
    useState<string[]>(projectTechnologyIds);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const now = new Date().toISOString();
      const projectId = project?.id ?? uuidv4();

      if (isEditing) {
        // Update project
        const { error: updateError } = await supabase
          .from("Project")
          .update({
            ...formData,
            projectUrl: formData.projectUrl || null,
            githubUrl: formData.githubUrl || null,
            updatedAt: now,
          })
          .eq("id", projectId);

        if (updateError) throw updateError;

        // Update technologies: delete existing and insert new
        await supabase
          .from("ProjectTechnology")
          .delete()
          .eq("projectId", projectId);
      } else {
        // Create project
        const { error: insertError } = await supabase.from("Project").insert({
          id: projectId,
          ...formData,
          projectUrl: formData.projectUrl || null,
          githubUrl: formData.githubUrl || null,
          createdAt: now,
          updatedAt: now,
        });

        if (insertError) throw insertError;
      }

      // Insert project technologies
      if (selectedTechIds.length > 0) {
        const projectTechnologies = selectedTechIds.map((techId) => ({
          id: uuidv4(),
          projectId,
          technologyId: techId,
        }));

        const { error: techError } = await supabase
          .from("ProjectTechnology")
          .insert(projectTechnologies);

        if (techError) throw techError;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const toggleTechnology = (techId: string) => {
    setSelectedTechIds((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Titre *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Description *
        </label>
        <textarea
          id="description"
          required
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
        />
      </div>

      {/* Project URL */}
      <div>
        <label
          htmlFor="projectUrl"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          URL du projet
        </label>
        <input
          type="url"
          id="projectUrl"
          value={formData.projectUrl}
          onChange={(e) =>
            setFormData({ ...formData, projectUrl: e.target.value })
          }
          placeholder="https://..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* GitHub URL */}
      <div>
        <label
          htmlFor="githubUrl"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          URL GitHub
        </label>
        <input
          type="url"
          id="githubUrl"
          value={formData.githubUrl}
          onChange={(e) =>
            setFormData({ ...formData, githubUrl: e.target.value })
          }
          placeholder="https://github.com/..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* Order */}
      <div>
        <label
          htmlFor="order"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Ordre d&apos;affichage
        </label>
        <input
          type="number"
          id="order"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
          }
          className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
          className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-800">
          Projet mis en avant (featured)
        </label>
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Technologies
        </label>
        {technologies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <button
                key={tech.id}
                type="button"
                onClick={() => toggleTechnology(tech.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTechIds.includes(tech.id)
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {tech.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Aucune technologie disponible.{" "}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/admin/technologies" className="text-orange-500">
              Créez-en une
            </a>
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg transition-colors"
        >
          {loading
            ? "Enregistrement..."
            : isEditing
              ? "Mettre à jour"
              : "Créer le projet"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-800"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
