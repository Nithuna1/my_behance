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
      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full table-fixed border-collapse">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 w-[80px] text-center">Image</th>
              <th className="p-3 w-[180px] text-center">Title</th>
              <th className="p-3 w-[200px] text-center">Tags</th>
              <th className="p-3 text-center">Website</th>
              <th className="p-3 w-[120px] text-center">Video</th>
              <th className="p-3 w-[160px] text-center">Actions</th>
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
                  <img
  src={
    s.images?.[0]
      ? s.images[0] // works for BOTH base64 & Cloudinary
      : "/no-image.png"
  }
  className="h-12 w-12 min-w-[48px] object-cover rounded border mx-auto"
/>

                  {/* TITLE */}
                  <td className="p-3 text-center align-middle font-medium break-words">
                    {s.title || "—"}
                  </td>

                  {/* TAGS */}
                  <td className="p-3 text-center align-middle text-sm text-gray-600">
                    <div className="line-clamp-2">
                      {s.tags?.length ? s.tags.join(", ") : "—"}
                    </div>
                  </td>

                  {/* WEBSITE */}
                  <td className="p-3 text-center align-middle">
                    {s.websites?.[0] ? (
                      <a
                        href={s.websites[0]}
                        target="_blank"
                        className="text-blue-600 underline block truncate max-w-[250px] mx-auto"
                      >
                        {s.websites[0]}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* VIDEO */}
                  <td className="p-3 text-center align-middle">
                   {s.videos?.[0] ? (
  <video
    src={s.videos[0]}
    className="h-12 w-16 mx-auto"
    controls
  />
) : (
  "—"
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