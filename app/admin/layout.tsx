export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 p-6">
        <h2 className="font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <a href="/admin/projects" className="block">Manage Projects</a>
          <a href="/" className="block">View Website</a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 bg-gray-50">
        {children}
      </main>

    </div>
  );
}