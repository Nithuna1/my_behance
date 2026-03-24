"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsAdmin() {

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/projects");
      const data = await res.json();

      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
      }

    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;

    await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    load();
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Project Listing</h1>

        <Link
          href="/admin/projects/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Project
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full table-fixed border-collapse">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 w-[80px] text-center">Image</th>
              <th className="p-3 w-[200px] text-center">Title</th>
              <th className="p-3 w-[180px] text-center">Author</th>
              <th className="p-3 w-[80px] text-center">Year</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 w-[160px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {/* 🔥 LOADER */}
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-6">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No projects found
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50 transition">

                  {/* IMAGE */}
                  <td className="p-3 text-center align-middle">
                    <img
                      src={p.image || "https://via.placeholder.com/100"}
                      className="h-12 w-12 min-w-[48px] object-cover rounded border mx-auto"
                    />
                  </td>

                  {/* TITLE */}
                  <td className="p-3 text-center align-middle font-medium break-words">
                    {p.title}
                  </td>

                  {/* AUTHOR */}
                  <td className="p-3 text-center align-middle break-words">
                    {p.author || "—"}
                  </td>

                  {/* YEAR */}
                  <td className="p-3 text-center align-middle">
                    {p.year || "—"}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-3 text-center align-middle break-words">
                    {p.category || "—"}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center align-middle">
                    <div className="flex justify-center gap-2">

                      <Link href={`/admin/projects/edit/${p._id}`}>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => remove(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}