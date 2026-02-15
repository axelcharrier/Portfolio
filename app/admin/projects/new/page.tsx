import { supabase } from "@/lib/supabase";
import ProjectForm from "../ProjectForm";

export default async function NewProjectPage() {
  const { data: technologies } = await supabase
    .from("Technology")
    .select("*")
    .order("name");

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nouveau projet</h1>
      <ProjectForm technologies={technologies ?? []} />
    </div>
  );
}

