import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteTechnologyButton from "./DeleteTechnologyButton";

export const revalidate = 0;

export default async function TechnologiesPage() {
  const { data: technologies, error } = await supabase
    .from("Technology")
    .select("*")
    .order("name");

  if (error) {
    return (
      <div className="text-red-500">
        Erreur lors du chargement des technologies: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Technologies</h1>
        <Link
          href="/admin/technologies/new"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Nouvelle technologie
        </Link>
      </div>

      {technologies && technologies.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Nom
                </th>
                <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Icône
                </th>
                <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {technologies.map((tech) => (
                <tr key={tech.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900 truncate block">
                      {tech.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {tech.category ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span
                      className="truncate block max-w-[150px]"
                      title={tech.icon ?? ""}
                    >
                      {tech.icon ?? "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/technologies/${tech.id}`}
                        className="text-orange-600 hover:text-orange-900 whitespace-nowrap"
                      >
                        Modifier
                      </Link>
                      <DeleteTechnologyButton
                        technologyId={tech.id}
                        technologyName={tech.name}
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
          <p className="text-gray-500 mb-4">Aucune technologie pour le moment</p>
          <Link
            href="/admin/technologies/new"
            className="text-orange-500 hover:text-orange-600"
          >
            Créer votre première technologie →
          </Link>
        </div>
      )}
    </div>
  );
}
