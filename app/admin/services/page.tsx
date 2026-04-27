"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesAdmin() {

  const [services, setServices] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();

      if (Array.isArray(data)) {
        setServices(data);
      } else {
        setServices([]);
      }

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    load();
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Services Listing</h1>

        <Link
          href="/admin/services/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Service
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto border border-gray-100">

        <table className="w-full border-collapse min-w-[1000px]">

          {/* HEADER */}
          <thead className="bg-[#1e293b] text-white">
            <tr>
              <th className="p-4 w-[100px] text-center">Image</th>
              <th className="p-4 w-[200px] text-left">Title</th>
              <th className="p-4 w-[200px] text-left">Tags</th>
              <th className="p-4 text-left">Website</th>
              <th className="p-4 w-[150px] text-center">Video</th>
              <th className="p-4 w-[180px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {services.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No services found
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s._id} className="border-t hover:bg-gray-50 transition">

  {/* IMAGE */}
  <td className="p-3 text-center align-middle">
    <img
      src={s.images?.[0] ? s.images[0] : "/no-image.png"}
      className="h-12 w-12 min-w-[48px] object-cover rounded border mx-auto"
    />
  </td>

                  {/* TITLE */}
                  <td className="p-4 text-left align-middle font-semibold text-gray-800">
                    {s.title || "—"}
                  </td>

                  {/* TAGS */}
                  <td className="p-4 text-left align-middle text-sm text-gray-600">
                    <div className="line-clamp-2">
                      {s.tags?.length ? s.tags.join(", ") : "—"}
                    </div>
                  </td>

                  {/* WEBSITE */}
                  <td className="p-4 text-left align-middle">
                    {s.websites?.[0] ? (
                      <a
                        href={s.websites[0]}
                        target="_blank"
                        className="text-blue-600 hover:underline font-medium transition"
                      >
                        {s.websites[0]}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  {/* VIDEO */}
                  <td className="p-4 text-center align-middle">
                   {s.videos?.[0] ? (
  <video
    src={s.videos[0]}
    className="h-12 w-20 object-cover rounded mx-auto"
    controls
    muted
  />
) : (
  <span className="text-gray-400">—</span>
)}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center align-middle">
                    <div className="flex justify-center gap-2">

                      <Link href={`/admin/services/edit/${s._id}`}>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => remove(s._id)}
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