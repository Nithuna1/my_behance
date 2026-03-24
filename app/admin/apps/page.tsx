"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AppsAdmin() {

  const [apps, setApps] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await fetch("/api/apps");
      const data = await res.json();

      if (Array.isArray(data)) {
        setApps(data);
      } else {
        setApps([]);
      }

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this app?")) return;

    await fetch("/api/apps", {
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
        <h1 className="text-2xl font-bold">Apps Listing</h1>

        <Link
          href="/admin/apps/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add App
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
              <th className="p-3 text-center">Description</th>
              <th className="p-3 text-center">Features</th>
              <th className="p-3 w-[160px] text-center">Best For</th>
              <th className="p-3 w-[160px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {apps.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No apps found
                </td>
              </tr>
            ) : (
              apps.map((app) => (
                <tr key={app._id} className="border-t hover:bg-gray-50 transition">

                  {/* IMAGE */}
                  <td className="p-3 text-center align-middle">
                    <img
                      src={app.image || "https://via.placeholder.com/100"}
                      className="h-12 w-12 min-w-[48px] object-cover rounded border mx-auto"
                    />
                  </td>

                  {/* TITLE */}
                  <td className="p-3 text-center align-middle font-medium break-words">
                    {app.title || "—"}
                  </td>

                  {/* DESCRIPTION */}
                  <td className="p-3 text-center align-middle text-sm text-gray-600">
                    <div className="line-clamp-2">
                      {app.fullDescription || "—"}
                    </div>
                  </td>

                  {/* FEATURES */}
                  <td className="p-3 text-center align-middle text-sm text-gray-600">
                    <div className="line-clamp-2">
                      {app.features?.length
                        ? app.features.join(", ")
                        : "—"}
                    </div>
                  </td>

                  {/* BEST FOR */}
                  <td className="p-3 text-center align-middle break-words">
                    {app.bestFor || "—"}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center align-middle">
                    <div className="flex justify-center gap-2">

                      <Link href={`/admin/apps/edit/${app._id}`}>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => remove(app._id)}
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