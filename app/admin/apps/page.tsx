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

        <table className="w-full table-fixed border-collapse">

          {/* HEADER */}
         <thead className="bg-blue-600 text-white px-4 py-2 rounded">
            <tr>
              <th className="p-3 w-[80px] text-center">Image</th>
              <th className="p-3 w-[250px] text-center">Title</th>
              <th className="p-3 w-[200px] text-center">Description</th>
              <th className="p-3 w-[100px] text-center">Features</th>
              <th className="p-3 w-[220px] text-center">Best For</th>
              <th className="p-3 w-[180px] text-right">Actions</th>
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
          <td className="p-3 text-center align-middle">
            <img
              src={app.image || "https://via.placeholder.com/100"}
              className="h-12 w-12 object-cover rounded border mx-auto"
            />
          </td>


                {/* TITLE */}
                <td className="p-3 text-center align-middle">{app.title}</td>

                {/* DESCRIPTION */}
                <td className="p-3 text-center align-middle max-w-[200px] truncate">
                  {app.fullDescription}
                </td>

                {/* FEATURES */}
                <td className="p-3 text-center align-middle max-w-[200px] truncate">
                  {app.features?.join(", ")}
                </td>

                {/* BEST FOR */}
                <td className="p-3 text-center align-middle">{app.bestFor}</td>

                {/* ACTIONS */}
                <td className="p-3 text-center align-middle">

                  <Link href={`/admin/apps/edit/${app._id}`}>
                    <button className="bg-green-600 text-black px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => remove(app._id)}
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