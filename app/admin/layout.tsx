import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <div className="absolute bottom-6 left-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
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

