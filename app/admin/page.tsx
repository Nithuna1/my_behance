"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    projects: 0,
    apps: 0,
    services: 0,
    websites: 0,
    posters: 0,
  });

  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

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
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 TOP HEADER */}
      <div className="bg-[#1e293b] text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>

       <button
  onClick={logout}
  style={{ backgroundColor: "#dc2626", color: "#fff" }}
  className="fixed top-5 right-5 px-4 py-2 rounded-lg text-sm shadow-lg z-50"
>
  Logout
</button>
      </div>

      {/* 🔥 CONTENT */}
      <div className="p-8">

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-2">
            Welcome, Admin
          </h2>

          <p className="text-gray-500">
            Manage portfolio content and website settings from here.
          </p>

          {/* 🔥 STATS GRID */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
              <p className="text-gray-500 text-sm">TOTAL PROJECTS</p>
              <p className="text-3xl font-bold mt-2">{stats.projects}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-green-500">
              <p className="text-gray-500 text-sm">TOTAL APPS</p>
              <p className="text-3xl font-bold mt-2">{stats.apps}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
              <p className="text-gray-500 text-sm">TOTAL SERVICES</p>
              <p className="text-3xl font-bold mt-2">{stats.services}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
              <p className="text-gray-500 text-sm">TOTAL WEBSITES</p>
              <p className="text-3xl font-bold mt-2">{stats.websites}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-pink-500">
              <p className="text-gray-500 text-sm">TOTAL POSTERS</p>
              <p className="text-3xl font-bold mt-2">{stats.posters}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}