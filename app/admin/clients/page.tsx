"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);

  // ================= LOAD CLIENTS =================
  const loadClients = async () => {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this client?")) return;

    try {
      await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      loadClients();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Listing</h1>

        {/* 🔥 ADD PAGE LINK */}
        <Link href="/admin/clients/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            + Add Client
          </button>
        </Link>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Review</th>
              <th className="p-3">Section</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No clients found
                </td>
              </tr>
            )}

            {clients.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-50">

                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={c.image}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                {/* NAME */}
                <td className="p-3 font-medium">{c.name}</td>

                {/* REVIEW */}
                <td
                  className="p-3 text-sm text-gray-600 max-w-xs truncate"
                  title={c.review}
                >
                  {c.review}
                </td>

                {/* SECTION */}
                <td className="p-3">
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {c.section}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">

                  {/* 🔥 FIXED EDIT BUTTON */}
                  <Link href={`/admin/clients/edit/${c._id}`}>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
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