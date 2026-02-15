"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface DeleteTechnologyButtonProps {
  technologyId: string;
  technologyName: string;
}

export default function DeleteTechnologyButton({
  technologyId,
  technologyName,
}: DeleteTechnologyButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(`Êtes-vous sûr de vouloir supprimer "${technologyName}" ?`)
    ) {
      return;
    }

    const { error } = await supabase
      .from("Technology")
      .delete()
      .eq("id", technologyId);

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

