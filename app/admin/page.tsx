import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function AdminDashboard() {
  const { count: projectCount } = await supabase
    .from("Project")
    .select("*", { count: "exact", head: true });

  const { count: techCount } = await supabase
    .from("Technology")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Projets */}
        <Link
          href="/admin/projects"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-gray-800">Projets</h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {projectCount ?? 0}
          </p>
          <p className="text-sm text-gray-600 mt-1">Gérer vos projets →</p>
        </Link>

        {/* Card Technologies */}
        <Link
          href="/admin/technologies"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-gray-800">Technologies</h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {techCount ?? 0}
          </p>
          <p className="text-sm text-gray-600 mt-1">Gérer les technologies →</p>
        </Link>
      </div>
    </div>
  );
}
