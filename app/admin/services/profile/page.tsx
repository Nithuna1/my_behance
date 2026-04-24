"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfileAdmin() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await fetch("/api/services?category=profile");
      const data = await res.json();

      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.log("ERROR:", err);
      setItems([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    try {
      await fetch("/api/services", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      load();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Profile Services
        </h1>

        <Link
          href="/admin/services/profile/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Profile
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full border-collapse">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 w-[100px] text-center">Image</th>
              <th className="p-3 text-left">Website</th>
              <th className="p-3 w-[180px] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  No profile items found
                </td>
              </tr>
            ) : (
              items.map((e) => {
                let imageUrl =
                  e.images?.[0] && e.images[0].startsWith("http")
                    ? e.images[0]
                    : "/no-image.png";

                return (
                  <tr key={e._id} className="border-t hover:bg-gray-50 transition">

                    <td className="p-3 text-center">
                      <img
                        src={imageUrl}
                        alt="service"
                        className="h-12 w-12 object-cover rounded border mx-auto"
                      />
                    </td>

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

                    <td className="p-3 text-center space-x-2">
                      <Link href={`/admin/services/profile/edit/${e._id}`}>
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
                );
              })
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
