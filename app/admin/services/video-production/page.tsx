"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VideoProductionAdmin() {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/services?category=video-production");
    const data = await res.json();
    setItems(data);
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

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Video Production</h1>

        <Link
          href="/admin/services/video-production/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Video
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl overflow-x-auto border border-gray-100">
        <table className="w-full border-collapse min-w-[700px]">

          <thead className="bg-[#1e293b] text-white">
            <tr>
              <th className="p-4 w-[150px] text-center">Preview</th>
              <th className="p-4 text-left">Website</th>
              <th className="p-4 w-[180px] text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  No videos found
                </td>
              </tr>
            )}

            {items.map((e) => (
              <tr key={e._id} className="border-t">

                <td className="p-3 text-center">
  {e.videos?.[0] && e.videos[0].startsWith("http") ? (
    <video
      src={e.videos[0]} // ✅ Cloudinary URL
      className="h-12 w-20 object-cover rounded mx-auto"
      controls
      muted
      preload="metadata"
    />
  ) : (
    <span>—</span>
  )}
</td>

                <td className="p-4 text-left align-middle text-sm text-blue-600 font-medium">
                  {e.websites?.[0] ? (
                    <a href={e.websites[0]} target="_blank" className="hover:underline transition">
                      {e.websites[0]}
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                <td className="p-3 text-center space-x-2">
                  <Link href={`/admin/services/video-production/edit/${e._id}`}>
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