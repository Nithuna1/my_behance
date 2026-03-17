"use client";

import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: any) {
  const pathname = usePathname();

  if (
    pathname === "/admin/login" ||
    pathname === "/admin/projects/add" ||
    pathname === "/admin/apps/add" ||
    pathname === "/admin/services/add" ||
    pathname === "/admin/websites/add" ||
    pathname === "/admin/posters/add"
  ) {
    return <div className="min-h-screen bg-gray-100 p-8">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 TOP NAVBAR */}
      <div className="bg-[#1e293b] text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex">

        {/* Sidebar */}
        <div className="w-60 bg-white p-6 shadow-md min-h-screen">
          <h2 className="font-semibold mb-6 text-gray-600">NAVIGATION</h2>

          <div className="space-y-3 text-gray-700">
            <a href="/admin/projects" className="block hover:text-blue-600">Manage Projects</a>
            <a href="/admin/apps" className="block hover:text-blue-600">Manage Apps</a>
            <a href="/admin/services" className="block hover:text-blue-600">Manage Services</a>
            <a href="/admin/websites" className="block hover:text-blue-600">Manage Websites</a>
            <a href="/admin/posters" className="block hover:text-blue-600">Manage Posters</a>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {children}
        </div>

      </div>

    </div>
  );
}