"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function EcommerceAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const params = useSearchParams();

  const type = params.get("type"); // ✅ GET TYPE

  const load = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();

    if (!Array.isArray(data)) {
      setItems([]);
      return;
    }

    // ✅ FILTER BASED ON TYPE
    const filtered = type
      ? data.filter((s: any) => s.type === type)
      : data;

    setItems(filtered);
  };

  useEffect(() => {
    load();
  }, [type]); // ✅ RELOAD WHEN TYPE CHANGES

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
        <h1 className="text-2xl font-bold">
          {type === "ecommerce" ? "Ecommerce Services" : "All Services"}
        </h1>

        <Link
          href="/admin/services/add?type=ecommerce"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Ecommerce
        </Link>
      </div>

      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>Image</th>
            <th>Title</th>
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

              <td>{e.title}</td>

              <td>
                {e.websites?.[0] ? (
                  <a href={e.websites[0]} target="_blank">
                    {e.websites[0]}
                  </a>
                ) : "—"}
              </td>

              <td>
                <Link href={`/admin/services/edit/${e._id}`}>
                  <button className="bg-green-500 px-2 py-1">
                    Edit
                  </button>
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