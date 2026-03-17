"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostersAdmin() {

  const [posters, setPosters] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/posters");
    const data = await res.json();

    console.log("POSTERS DATA:", data);

    if (Array.isArray(data)) {
      setPosters(data);
    } else {
      console.error("API did not return array:", data);
      setPosters([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {

    await fetch("/api/posters", {
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
          Poster Listing
        </h1>

        <Link
          href="/admin/posters/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Poster
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
              <th className="p-3">Category</th>
              <th className="p-3">Created</th>
              <th className="p-3 text-right w-[180px]">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {posters.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No posters found
                </td>
              </tr>
            )}

            {posters.map((p) => (
              <tr key={p._id} className="border-t">

                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={p.image && p.image !== "" ? p.image : "https://via.placeholder.com/100"}
                    className="h-12 w-12 object-cover rounded border"
                    onError={(e: any) => {
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                </td>

                {/* TITLE */}
                <td className="p-3">{p.title}</td>

                {/* CATEGORY */}
                <td className="p-3">{p.category}</td>

                {/* CREATED DATE */}
                <td className="p-3">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td className="space-x-2 whitespace-nowrap text-right">

                  <Link href={`/admin/posters/edit/${p._id}`}>
                    <button className="bg-green-600 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => remove(p._id)}
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