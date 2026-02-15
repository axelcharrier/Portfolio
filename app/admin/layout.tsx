import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Portfolio Admin</h1>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Projets
          </Link>
          <Link
            href="/admin/technologies"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Technologies
          </Link>
        </nav>
        <div className="absolute bottom-6 left-6 right-6 space-y-4">
          <div className="text-sm text-gray-400">
            Connecté : {session.name || session.email}
          </div>
          <LogoutButton />
          <Link
            href="/"
            className="block text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Retour au site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
