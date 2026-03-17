"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AppsAdmin() {

  const [apps, setApps] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/apps");
    const data = await res.json();

    console.log("APPS DATA:", data);

    if (Array.isArray(data)) {
      setApps(data);
    } else {
      console.error("API did not return array:", data);
      setApps([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await fetch("/api/apps", {
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
          Apps Listing
        </h1>

        <Link
          href="/admin/apps/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add App
        </Link>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full">

          {/* HEADER */}
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3 w-[80px]">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Features</th>
              <th className="p-3">Best For</th>
              <th className="p-3 text-right w-[180px]">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {apps.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No apps found
                </td>
              </tr>
            )}

            {apps.map((app) => (
              <tr key={app._id} className="border-t">

                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={app.image && app.image !== "" ? app.image : "https://via.placeholder.com/100"}
                    className="h-12 w-12 object-cover rounded border"
                    onError={(e: any) => {
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                </td>

                {/* TITLE */}
                <td className="p-3">{app.title}</td>

                {/* DESCRIPTION */}
                <td className="p-3 max-w-[200px] truncate">
                  {app.fullDescription}
                </td>

                {/* FEATURES */}
                <td className="p-3 max-w-[200px] truncate">
                  {app.features?.join(", ")}
                </td>

                {/* BEST FOR */}
                <td className="p-3">{app.bestFor}</td>

                {/* ACTIONS */}
                <td className="space-x-2 whitespace-nowrap text-right">

                  <Link href={`/admin/apps/edit/${app._id}`}>
                    <button className="bg-green-600 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => remove(app._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
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