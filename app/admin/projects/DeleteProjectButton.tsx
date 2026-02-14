"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface DeleteProjectButtonProps {
  projectId: string;
  projectTitle: string;
}

export default function DeleteProjectButton({
  projectId,
  projectTitle,
}: DeleteProjectButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${projectTitle}" ?`)) {
      return;
    }

    const { error } = await supabase
      .from("Project")
      .delete()
      .eq("id", projectId);

    if (error) {
      alert("Erreur lors de la suppression: " + error.message);
      return;
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Supprimer
    </button>
  );
}

