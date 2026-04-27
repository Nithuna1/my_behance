"use client";

import { useEffect, useState } from "react";
import { Smartphone, Settings, Globe, Image } from "lucide-react";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    projects: 0,
    apps: 0,
    services: 0,
    websites: 0,
    posters: 0,
  });

  const [authorized, setAuthorized] = useState(false);

  // ✅ AUTH CHECK
  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (!admin) {
      window.location.href = "/admin/login";
    } else {
      setAuthorized(true);
    }
  }, []);

  // ✅ FETCH DATA
  useEffect(() => {
    if (!authorized) return;

    async function fetchStats() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }

    fetchStats();
  }, [authorized]);

  if (!authorized) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-gray-100">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Welcome back, Admin
          </h2>
          <p className="text-gray-500 font-medium">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          System Online
        </div>
      </div>

      {/* 🔥 STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="group bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]">
          <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-1">Projects</p>
          <p className="text-5xl font-black text-white">{stats.projects}</p>
          <div className="mt-4 pt-4 border-t border-blue-400/30 text-blue-100 text-xs font-medium">
            Live on website
          </div>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-green-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <Smartphone size={24} />
            </div>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Mobile Apps</p>
          </div>
          <p className="text-5xl font-black text-gray-900">{stats.apps}</p>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-purple-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <Settings size={24} />
            </div>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Services</p>
          </div>
          <p className="text-5xl font-black text-gray-900">{stats.services}</p>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-yellow-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl">
              <Globe size={24} />
            </div>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Websites</p>
          </div>
          <p className="text-5xl font-black text-gray-900">{stats.websites}</p>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-pink-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
              <Image size={24} />
            </div>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Posters</p>
          </div>
          <p className="text-5xl font-black text-gray-900">{stats.posters}</p>
        </div>

      </div>

    </div>
  );
}