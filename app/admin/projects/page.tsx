import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteProjectButton from "./DeleteProjectButton";

export const revalidate = 0;

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("Project")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    return (
      <div className="text-red-500">
        Erreur lors du chargement des projets: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
        <Link
          href="/admin/projects/new"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Nouveau projet
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Ordre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Titre
                </th>
                <th className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Featured
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Créé le
                </th>
                <th className="w-40 px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {project.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {project.title}
                    </div>
                    <div className="text-sm text-gray-600 truncate max-w-xs">
                      {project.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.featured ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Oui
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Non
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(project.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-orange-600 hover:text-orange-900 whitespace-nowrap"
                      >
                        Modifier
                      </Link>
                      <DeleteProjectButton
                        projectId={project.id}
                        projectTitle={project.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">Aucun projet pour le moment</p>
          <Link
            href="/admin/projects/new"
            className="text-orange-500 hover:text-orange-600"
          >
            Créer votre premier projet →
          </Link>
        </div>
      )}
    </div>
  );
}
