"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WebsitesAdmin() {

  const [websites, setWebsites] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/websites");
    const data = await res.json();

    console.log("WEBSITES DATA:", data);

    if (Array.isArray(data)) {
      setWebsites(data);
    } else {
      console.error("API did not return array:", data);
      setWebsites([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await fetch("/api/websites", {
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
          Website Listing
        </h1>

        <Link
          href="/admin/websites/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Website
        </Link>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full table-fixed border-collapse">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white px-4 py-2 rounded">
            <tr>
              <th className="p-3 w-[80px] text-center">Image</th>
              <th className="p-3 w-[250px]">Name</th>
              <th className="p-3 w-[100px] text-center">URL</th>
              <th className="p-3 w-[220px]">Video</th>
              <th className="p-3 w-[180px] text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {websites.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No websites found
                </td>
              </tr>
            )}

            {websites.map((w) => (
              <tr key={w._id} className="border-t">

                {/* IMAGE */}
          <td className="p-3 text-center align-middle">
            <img
              src={w.image || "https://via.placeholder.com/100"}
              className="h-12 w-12 object-cover rounded border mx-auto"
            />
          </td>
                {/* NAME */}
                <td className="p-3 text-center align-middle">{w.name}</td>

                {/* URL */}
                <td className="p-3 text-center align-middle">
                  <a href={w.url} target="_blank">
                    {w.url}
                  </a>
                </td>

                {/* VIDEO */}
                <td className="p-3 text-center align-middle">
                  {w.video ? (
                    <a href={w.video} target="_blank" className="text-blue-600 underline">
                      View Video
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center align-middle">

                  <Link href={`/admin/websites/edit/${w._id}`}>
                    <button className="bg-green-600 text-black px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => remove(w._id)}
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