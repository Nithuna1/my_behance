"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminClients() {

  const [clients, setClients] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();

      if (Array.isArray(data)) {
        setClients(data);
      } else {
        setClients([]);
      }

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this client?")) return;

    await fetch("/api/clients", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }), // ✅ SAME AS APP API
    });

    load();
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Clients Listing</h1>

        <Link
          href="/admin/clients/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Client
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full table-fixed border-collapse">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 w-[80px] text-center">Image</th>
              <th className="p-3 w-[180px] text-center">Name</th>
              <th className="p-3 text-center">Review</th>
              <th className="p-3 w-[120px] text-center">Section</th>
              <th className="p-3 w-[160px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No clients found
                </td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr
                  key={c._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* IMAGE */}
                  <td className="p-3 text-center align-middle">
                    <img
                      src={
                        c.image && c.image.startsWith("http")
                          ? c.image
                          : "/no-image.png"
                      }
                      alt="client"
                      className="h-12 w-12 min-w-[48px] object-cover rounded border mx-auto"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-3 text-center align-middle font-medium break-words">
                    {c.name || "—"}
                  </td>

                  {/* REVIEW */}
                  <td className="p-3 text-center align-middle text-sm text-gray-600">
                    <div className="line-clamp-2">
                      {c.review || "—"}
                    </div>
                  </td>

                  {/* SECTION */}
                  <td className="p-3 text-center align-middle">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {c.section || "—"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center align-middle">
                    <div className="flex justify-center gap-2">

                      <Link href={`/admin/clients/edit/${c._id}`}>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => remove(c._id)}
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