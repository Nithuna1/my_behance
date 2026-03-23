"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EcommerceAdmin() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/services");
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
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    load();
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Ecommerce Services</h1>

        <Link
          href="/admin/services/ecommerce/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Ecommerce
        </Link>
      </div>

      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>Image</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((e) => (
            <tr key={e._id} className="border-t text-center">

              <td>
                <img src={e.images?.[0]} className="h-12 mx-auto" />
              </td>

              <td>
                {e.websites?.[0] || "—"}
              </td>

              <td>
                <Link href={`/admin/services/ecommerce/edit/${e._id}`}>
                  <button className="bg-green-500 px-2 py-1">Edit</button>
                </Link>

                <button
                  onClick={() => remove(e._id)}
                  className="bg-red-500 px-2 py-1 ml-2"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}