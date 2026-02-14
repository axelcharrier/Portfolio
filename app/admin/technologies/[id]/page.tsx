import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TechnologyForm from "../TechnologyForm";

interface EditTechnologyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTechnologyPage({
  params,
}: EditTechnologyPageProps) {
  const { id } = await params;

  const { data: technology, error } = await supabase
    .from("Technology")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !technology) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Modifier la technologie
      </h1>
      <TechnologyForm technology={technology} />
    </div>
  );
}
