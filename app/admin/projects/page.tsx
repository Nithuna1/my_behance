"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();

      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.log("ERROR:", err);
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
      <div className="bg-white shadow rounded-xl overflow-x-auto border border-gray-100">

        <table className="w-full border-collapse min-w-[900px]">

          {/* HEADER */}
          <thead className="bg-[#1e293b] text-white">
            <tr>
              <th className="p-4 w-[100px] text-center">Image</th>
              <th className="p-4 w-[250px] text-left">Title</th>
              <th className="p-4 w-[200px] text-left">Author</th>
              <th className="p-4 w-[100px] text-center">Year</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 w-[180px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No projects found
                </td>
              </tr>
            ) : (
              projects.map((p) => {

                // ✅ Cloudinary-safe image handling
                const imageUrl =
                  p.image && p.image.startsWith("http")
                    ? p.image // Cloudinary URL
                    : "/no-image.png"; // fallback

                return (
                  <tr key={p._id} className="border-t hover:bg-gray-50 transition">

                    {/* IMAGE */}
                    <td className="p-3 text-center align-middle">
                      <img
                        src={imageUrl}
                        alt={p.title}
                        className="h-12 w-12 min-w-[48px] object-cover rounded border mx-auto"
                      />
                    </td>

                    {/* TITLE */}
                    <td className="p-4 text-left align-middle font-semibold text-gray-800">
                      {p.title || "—"}
                    </td>

                    {/* AUTHOR */}
                    <td className="p-4 text-left align-middle text-gray-600">
                      {p.author || "—"}
                    </td>

                    {/* YEAR */}
                    <td className="p-4 text-center align-middle font-medium">
                      {p.year || "—"}
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4 text-left align-middle">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        {p.category || "General"}
                      </span>
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
                );
              })
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}