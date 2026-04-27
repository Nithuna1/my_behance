"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Globe, Settings, Folder, Image, Smartphone, Menu, X, LogOut, ShoppingCart, Palette, Users } from "lucide-react";

export default function AdminLayout({ children }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

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
      
      {/* 🔥 MOBILE HEADER */}
      <div className="md:hidden bg-[#1e293b] text-white px-6 py-4 flex justify-between items-center shadow-lg z-50 sticky top-0">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex relative">
        
        {/* 🔥 OVERLAY FOR MOBILE */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 🔥 SIDEBAR */}
        <div className={`
          fixed md:sticky top-0 left-0 h-screen z-40
          w-64 bg-white p-6 shadow-2xl md:shadow-md transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="flex flex-col h-full">
            <h2 className="font-bold mb-6 text-gray-400 text-xs uppercase tracking-widest">Navigation</h2>

            <div className="flex-1 space-y-1 overflow-y-auto">
              <a 
                href="/admin/websites" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/admin/websites" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Globe size={20} />
                Manage Websites
              </a>

              <div className="py-2">
                <div className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <Settings size={16} />
                  Services
                </div>
                
                <div className="space-y-1">
                  {[
                    { href: "/admin/services", label: "All Services", icon: null },
                    { href: "/admin/services/ecommerce", label: "Ecommerce", icon: <ShoppingCart size={16} /> },
                    { href: "/admin/services/uiux", label: "UI / UX", icon: <Palette size={16} /> },
                    { href: "/admin/services/video-production", label: "Video Production", icon: "🎬" },
                    { href: "/admin/services/digital-marketing", label: "Digital Marketing", icon: "📈" },
                    { href: "/admin/services/profile", label: "Profile", icon: "📄" },
                    { href: "/admin/services/branding", label: "Branding", icon: "🎨" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 ml-4 px-4 py-2 rounded-lg text-sm transition-all ${pathname === item.href ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="w-5 flex justify-center">{item.icon || "•"}</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 my-4" />

              <a 
                href="/admin/projects" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/admin/projects" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Folder size={20} />
                Manage Projects
              </a>

              <a 
                href="/admin/posters" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/admin/posters" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Image size={20} />
                Manage Posters
              </a>

              <a 
                href="/admin/apps" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/admin/apps" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Smartphone size={20} />
                Manage Apps
              </a>

              <a 
                href="/admin/clients" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/admin/clients" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Users size={20} />
                Manage Clients
              </a>
            </div>

            <div className="mt-auto pt-6 space-y-2">
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-green-600 font-semibold hover:bg-green-50 transition-all"
              >
                <Globe size={20} />
                Visit Website
              </a>

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 transition-all"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* 🔥 MAIN CONTENT AREA */}
        <div className="flex-1 w-full min-h-screen">
          
          {/* 🔥 DESKTOP ONLY HEADER */}
          <div className="hidden md:flex bg-white text-gray-800 px-8 py-4 justify-between items-center border-b border-gray-100 sticky top-0 z-30">
            <h1 className="text-xl font-bold tracking-tight">
              {pathname === "/admin" ? "Dashboard Overview" : pathname.split("/").pop()?.replace("-", " ").toUpperCase()}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">Administrator</span>
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">AD</div>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-full overflow-x-hidden">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}