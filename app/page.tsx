import Welcome from "./components/Welcome";
import About from "./components/About";
import Projects from "./components/Projects";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

export const revalidate = 0;

function createFreshClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, options) =>
          fetch(url, { ...options, cache: "no-store" }),
      },
    }
  );
}

async function getProjects() {
  const supabase = createFreshClient();

  // Récupérer les projets featured, triés par order
  const { data: projects, error } = await supabase
    .from("Project")
    .select("*")
    .eq("featured", true)
    .order("order", { ascending: true });

  if (error || !projects) return [];

  // Récupérer les technologies associées à chaque projet
  const projectIds = projects.map((p) => p.id);

  const { data: projectTechnologies } = await supabase
    .from("ProjectTechnology")
    .select("projectId, technologyId")
    .in("projectId", projectIds);

  const technologyIds = [
    ...new Set((projectTechnologies ?? []).map((pt) => pt.technologyId)),
  ];

  const { data: technologies } = await supabase
    .from("Technology")
    .select("id, name")
    .in("id", technologyIds.length > 0 ? technologyIds : [""]);

  // Assembler les données
  return projects.map((project) => {
    const techIds = (projectTechnologies ?? [])
      .filter((pt) => pt.projectId === project.id)
      .map((pt) => pt.technologyId);

    const techs = (technologies ?? []).filter((t) => techIds.includes(t.id));

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl,
      technologies: techs,
    };
  });
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-white">
      <Welcome />
      <About />
      <Projects projects={projects} />
    </div>
  );
}
