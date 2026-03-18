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

        <table className="w-full table-fixed border-collapse">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white px-4 py-2 rounded">
            <tr>
              <th className="p-3 w-[80px] text-center">Image</th>
              <th className="p-3 w-[250px]">Title</th>
              <th className="p-3 w-[100px] text-center">Category</th>
              <th className="p-3 w-[220px]">Created</th>
              <th className="p-3 w-[180px] text-right">Actions</th>
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
          <td className="p-3 text-center align-middle">
            <img
              src={p.image || "https://via.placeholder.com/100"}
              className="h-12 w-12 object-cover rounded border mx-auto"
            />
          </td>

                {/* TITLE */}
                <td className="p-3 text-center align-middle">{p.title}</td>

                {/* CATEGORY */}
                <td className="p-3 text-center align-middle">{p.category}</td>

                {/* CREATED DATE */}
                <td className="p-3 text-center align-middle">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center align-middle"> 

                  <Link href={`/admin/posters/edit/${p._id}`}>
                    <button className="bg-green-600 text-black px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => remove(p._id)}
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