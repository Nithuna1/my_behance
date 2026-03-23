"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EcommerceAdmin() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/services?type=ecommerce");
    const data = await res.json();

    const ecommerce = Array.isArray(data)
      ? data.filter((s: any) => s.type === "ecommerce")
      : [];

    setItems(ecommerce);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    await fetch("/api/services", {
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
        <h1 className="text-2xl font-bold">
          Ecommerce Services
        </h1>

        <Link
          href="/admin/services/ecommerce/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Ecommerce
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full table-fixed border-collapse">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 w-[100px] text-center">Image</th>
              <th className="p-3 text-center">Website</th>
              <th className="p-3 w-[150px] text-center">Video</th>
              <th className="p-3 w-[180px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No ecommerce items found
                </td>
              </tr>
            )}

            {items.map((e) => (
              <tr key={e._id} className="border-t">

                {/* IMAGE */}
                <td className="p-3 text-center">
                  <img
                    src={e.images?.[0] || "https://via.placeholder.com/100"}
                    className="h-12 w-12 object-cover rounded border mx-auto"
                  />
                </td>

                {/* WEBSITE */}
                <td className="p-3 text-center">
                  {e.websites?.[0] ? (
                    <a
                      href={e.websites[0]}
                      target="_blank"
                      className="text-blue-600 underline truncate block"
                    >
                      {e.websites[0]}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                {/* VIDEO */}
                <td className="p-3 text-center">
                  {e.videos?.[0] ? (
                    <a
                      href={e.videos[0]}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center space-x-2">

                  <Link href={`/admin/services/ecommerce/edit/${e._id}`}>
                    <button className="bg-green-600 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => remove(e._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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