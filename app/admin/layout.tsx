"use client";

import { usePathname } from "next/navigation";
import { Globe, Settings, Folder, Image, Smartphone } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Palette } from "lucide-react";
import { Users } from "lucide-react";

export default function AdminLayout({ children }: any) {
  const pathname = usePathname();

  if (
    pathname === "/admin/login" ||
    pathname === "/admin/projects/add" ||
    pathname === "/admin/apps/add" ||
    pathname === "/admin/services/add" ||
    pathname === "/admin/websites/add" ||
    pathname === "/admin/posters/add" ||
    pathname.startsWith("/admin/projects/edit/") ||
    pathname.startsWith("/admin/apps/edit/") ||
    pathname.startsWith("/admin/services/edit/") ||
    pathname.startsWith("/admin/websites/edit/") ||
    pathname.startsWith("/admin/posters/edit/") ||
    pathname === "/admin/clients/add" ||
    pathname.startsWith("/admin/clients/edit/")
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

          <div className="space-y-2 text-gray-700">

            <a href="/admin/websites" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <Globe size={18} />
              Manage Websites
            </a>

            <div>
              {/* MAIN */}
              <div className="flex items-center gap-3 px-3 py-2 font-medium text-gray-800">
                <Settings size={18} />
                Manage Services
              </div>

              {/* SUB MENU */}
              <div className="ml-6 mt-2 space-y-1 text-sm">

                <a
                  href="/admin/services"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 hover:text-blue-600"
                >
                  • All Services
                </a>

                <a
                  href="/admin/services/ecommerce"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 hover:text-blue-600"
                >
                  <ShoppingCart size={14} />
                  Ecommerce
                </a>

                <a
                  href="/admin/services/uiux"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 hover:text-blue-600"
                >
                  <Palette size={14} />
                  UI / UX
                </a>

                <a
                  href="/admin/services/video-production"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 hover:text-blue-600"
                >
                  🎬 Video Production
                </a>

                <a
                  href="/admin/services/digital-marketing"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 hover:text-blue-600"
                >
                  📈 Digital Marketing
                </a>

                <a
                  href="/admin/services/profile"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 hover:text-blue-600"
                >
                  📄 Profile
                </a>

                <a
                  href="/admin/services/branding"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 hover:text-blue-600"
                >
                  🎨 Branding
                </a>

              </div>
            </div>

            <a href="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <Folder size={18} />
              Manage Projects
            </a>

            <a href="/admin/posters" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <Image size={18} />
              Manage Posters
            </a>

            <a href="/admin/apps" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <Smartphone size={18} />
              Manage Apps
            </a>

            <a
              href="/admin/clients" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <Users size={18} />
              Manage Client
            </a>

            {/* DIVIDER */}
            <div className="border-t my-3"></div>

            {/* VISIT WEBSITE */}
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-green-600 font-semibold hover:bg-green-50 hover:text-green-700"
            >
              <Globe size={18} />
              Visit Website
            </a>

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