"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesAdmin() {

  const [services, setServices] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/services");
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

        <table className="w-full table-fixed border-collapse">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white px-4 py-2 rounded">
            <tr>
              <th className="p-3 w-[80px] text-center">Image</th>
              <th className="p-3 w-[250px] text-center">Title</th>
              <th className="p-3 w-[200px] text-center">Tags</th>
              <th className="p-3 w-[100px] text-center">Websites</th>
              <th className="p-3 w-[220px] text-center">Videos</th>
              <th className="p-3 w-[180px] text-right">Actions</th>
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
              <tr key={s._id} className="border-t">

                {/* IMAGE (first image) */}
                <td className="p-3 text-center align-middle">
                  <img
                    src={s.images?.[0] || "https://via.placeholder.com/100"}
                     className="h-12 w-12 object-cover rounded border mx-auto"
                  />
                </td>

                {/* TITLE */}
                <td className="p-3 text-center align-middle">{s.title}</td>

                {/* TAGS */}
                <td className="p-3 text-center align-middle">
                  {s.tags?.join(", ") || "—"}
                </td>

                {/* WEBSITES */}
                <td className="p-3 text-center align-middle">
                  {s.websites?.length ? (
                    <a
                      href={s.websites[0]}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {s.websites[0]}
                    </a>
                  ) : "—"}
                </td>

                {/* VIDEOS */}
                <td className="p-3 text-center align-middle">
                  {s.videos?.length ? (
                    <a
                      href={s.videos[0]}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View Video
                    </a>
                  ) : "—"}
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center align-middle">

                  <Link href={`/admin/services/edit/${s._id}`}>
                    <button className="bg-green-600 text-black px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => remove(s._id)}
                    className="bg-red-500 hover:bg-red-600 text-black px-3 py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}