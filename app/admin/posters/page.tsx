"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostersAdmin() {

  const [posters, setPosters] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await fetch("/api/posters");
      const data = await res.json();

      if (Array.isArray(data)) {
        setPosters(data);
      } else {
        setPosters([]);
      }

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this poster?")) return;

    await fetch("/api/posters", {
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
        <h1 className="text-2xl font-bold">Poster Listing</h1>

        <Link
          href="/admin/posters/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Poster
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto border border-gray-100">

        <table className="w-full border-collapse min-w-[800px]">

          {/* HEADER */}
          <thead className="bg-[#1e293b] text-white">
            <tr>
              <th className="p-4 w-[100px] text-center">Image</th>
              <th className="p-4 w-[250px] text-left">Title</th>
              <th className="p-4 w-[200px] text-left">Category</th>
              <th className="p-4 w-[150px] text-center">Created</th>
              <th className="p-4 w-[180px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {posters.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No posters found
                </td>
              </tr>
            ) : (
              posters.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50 transition">

                  {/* IMAGE */}
                  <td className="p-3 text-center align-middle">
                    <img
  src={p.image || "/no-image.png"}
  className="h-12 w-12 min-w-[48px] object-cover rounded border mx-auto"
/>
                  </td>

                  {/* TITLE */}
                  <td className="p-4 text-left align-middle font-semibold text-gray-800">
                    {p.title || "—"}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-4 text-left align-middle">
                    <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      {p.category || "Poster"}
                    </span>
                  </td>

                  {/* CREATED DATE */}
                  <td className="p-4 text-center align-middle text-sm text-gray-500 font-medium">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center align-middle">
                    <div className="flex justify-center gap-2">

                      <Link href={`/admin/posters/edit/${p._id}`}>
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