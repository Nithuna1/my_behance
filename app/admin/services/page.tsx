"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesAdmin() {

  const [services, setServices] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/services?category=service");
    const data = await res.json();

    console.log("SERVICES DATA:", data);

    if (Array.isArray(data)) {
      setServices(data);
    } else {
      console.error("API did not return array:", data);
      setServices([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
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

        <h1 className="text-2xl font-bold">
          Services Listing
        </h1>

        <Link
          href="/admin/services/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Service
        </Link>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">

  <table className="w-full border-collapse">

    {/* HEADER */}
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="p-3 w-[80px] text-center">Image</th>
        <th className="p-3 w-[200px] text-center">Title</th>
        <th className="p-3 w-[180px] text-center">Tags</th>
        <th className="p-3 text-center">Websites</th>
        <th className="p-3 w-[150px] text-center">Videos</th>
        <th className="p-3 w-[180px] text-center">Actions</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {services.length === 0 && (
        <tr>
          <td colSpan={6} className="text-center p-4">
            No services found
          </td>
        </tr>
      )}

      {services.map((s) => (
        <tr key={s._id} className="border-t hover:bg-gray-50">

          {/* IMAGE */}
          <td className="p-3 text-center">
            <img
              src={s.images?.[0] || "https://via.placeholder.com/100"}
              className="h-12 w-12 object-cover rounded border mx-auto"
            />
          </td>

          {/* TITLE */}
          <td className="p-3 text-center font-medium">
            {s.title}
          </td>

          {/* TAGS */}
          <td className="p-3 text-center text-gray-500 text-sm">
            {s.tags?.join(", ") || "—"}
          </td>

          {/* WEBSITE (FIXED) */}
          <td className="p-3 text-center">
            {s.websites?.[0] ? (
              <a
                href={s.websites[0]}
                target="_blank"
                className="text-blue-600 underline block truncate max-w-[250px] mx-auto"
              >
                {s.websites[0]}
              </a>
            ) : "—"}
          </td>

          {/* VIDEO */}
          <td className="p-3 text-center">
            {s.videos?.[0] ? (
              <a
                href={s.videos[0]}
                target="_blank"
                className="text-blue-600 underline"
              >
                View
              </a>
            ) : "—"}
          </td>

          {/* ACTIONS (FIXED ALIGNMENT) */}
          <td className="p-3">
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
      ))}
    </tbody>

  </table>

</div>

    </div>
  );
}