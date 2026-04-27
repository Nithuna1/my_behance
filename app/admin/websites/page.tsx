"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WebsitesAdmin() {

  const [websites, setWebsites] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await fetch("/api/websites");
      const data = await res.json();

      if (Array.isArray(data)) {
        setWebsites(data);
      } else {
        setWebsites([]);
      }

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this website?")) return;

    await fetch("/api/websites", {
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
        <h1 className="text-2xl font-bold">Website Listing</h1>

        <Link
          href="/admin/websites/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Website
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto border border-gray-100">

        <table className="w-full border-collapse min-w-[900px]">

          {/* HEADER */}
          <thead className="bg-[#1e293b] text-white">
            <tr>
              <th className="p-4 w-[100px] text-center">Image</th>
              <th className="p-4 w-[250px] text-left">Name</th>
              <th className="p-4 text-left">URL</th>
              <th className="p-4 w-[150px] text-center">Video</th>
              <th className="p-4 w-[180px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {websites.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No websites found
                </td>
              </tr>
            ) : (
              websites.map((w) => (
                <tr key={w._id} className="border-t hover:bg-gray-50 transition">

                  {/* IMAGE */}
                  <td className="p-3 text-center align-middle">
  <img
    src={
      w.image && w.image.startsWith("http")
        ? w.image   // ✅ Cloudinary URL
        : "/no-image.png" // ✅ fallback
    }
    alt="website"
    className="h-12 w-12 min-w-[48px] object-cover rounded border mx-auto"
  />
</td>

                  {/* NAME */}
                  <td className="p-4 text-left align-middle font-semibold text-gray-800">
                    {w.name}
                  </td>

                  {/* URL */}
                  <td className="p-4 text-left align-middle">
                    {w.url ? (
                      <a
                        href={w.url}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition"
                      >
                        {w.url}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  {/* VIDEO */}
                <td className="p-3 text-center align-middle">
  {w.video && w.video.startsWith("http") ? (
    <video
      src={w.video} // ✅ Cloudinary video URL
      className="h-12 w-20 object-cover rounded mx-auto"
      controls
      muted
      preload="metadata"
    />
  ) : (
    "—"
  )}
</td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center align-middle">
                    <div className="flex justify-center gap-2">

                      <Link href={`/admin/websites/edit/${w._id}`}>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => remove(w._id)}
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