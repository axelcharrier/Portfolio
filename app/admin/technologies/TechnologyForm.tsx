"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Technology } from "@/lib/database.types";

interface TechnologyFormProps {
  technology?: Technology;
}

const CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Autre"];

export default function TechnologyForm({ technology }: TechnologyFormProps) {
  const router = useRouter();
  const isEditing = !!technology;

  const [formData, setFormData] = useState({
    name: technology?.name ?? "",
    icon: technology?.icon ?? "",
    category: technology?.category ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const now = new Date().toISOString();

    if (isEditing && technology) {
      const { error: updateError } = await supabase
        .from("Technology")
        .update({
          name: formData.name,
          icon: formData.icon || null,
          category: formData.category || null,
          updatedAt: now,
        })
        .eq("id", technology.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase.from("Technology").insert({
        id: crypto.randomUUID(),
        name: formData.name,
        icon: formData.icon || null,
        category: formData.category || null,
        createdAt: now,
        updatedAt: now,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/technologies");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Nom *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: React, Node.js, PostgreSQL..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Catégorie
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
        >
          <option value="">Sélectionner une catégorie</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Icon */}
      <div>
        <label
          htmlFor="icon"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Icône (nom ou URL)
        </label>
        <input
          type="text"
          id="icon"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="Ex: react, node, ou URL d'image"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
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
              : "Créer la technologie"}
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

