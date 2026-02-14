import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProjectForm from "../ProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;

  const [projectResult, technologiesResult, projectTechResult] =
    await Promise.all([
      supabase.from("Project").select("*").eq("id", id).single(),
      supabase.from("Technology").select("*").order("name"),
      supabase
        .from("ProjectTechnology")
        .select("technologyId")
        .eq("projectId", id),
    ]);

  if (projectResult.error || !projectResult.data) {
    notFound();
  }

  const projectTechnologyIds =
    projectTechResult.data?.map((pt) => pt.technologyId) ?? [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Modifier le projet
      </h1>
      <ProjectForm
        project={projectResult.data}
        technologies={technologiesResult.data ?? []}
        projectTechnologyIds={projectTechnologyIds}
      />
    </div>
  );
}
