"use client";

import { useEffect, useState } from "react";

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    review: "",
    section: "front",
    image: null as File | null,
  });

  const loadClients = async () => {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSubmit = async () => {
    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("review", form.review);
    fd.append("section", form.section);
    if (form.image) fd.append("image", form.image);

    if (editing) {
      fd.append("id", editing._id);

      await fetch("/api/clients", {
        method: "PUT",
        body: fd,
      });

      setEditing(null);
    } else {
      await fetch("/api/clients", {
        method: "POST",
        body: fd,
      });
    }

    setForm({ name: "", review: "", section: "front", image: null });
    loadClients();
  };

  const handleEdit = (client: any) => {
    setEditing(client);
    setForm({
      name: client.name,
      review: client.review,
      section: client.section,
      image: null,
    });
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/clients", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadClients();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Clients Admin</h1>

      {/* FORM */}
      <div className="space-y-3 mb-8">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Review"
          value={form.review}
          onChange={(e) =>
            setForm({ ...form, review: e.target.value })
          }
          className="border p-2 w-full"
        />

        <select
          value={form.section}
          onChange={(e) =>
            setForm({ ...form, section: e.target.value })
          }
          className="border p-2"
        >
          <option value="front">Front</option>
          <option value="back">Back</option>
        </select>

        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] || null })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2"
        >
          {editing ? "Update Client" : "Add Client"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-4 gap-4">
        {clients.map((c) => (
          <div key={c._id} className="border p-3">
            <img src={c.image} className="h-24 w-full object-cover" />
            <h3>{c.name}</h3>

            <button onClick={() => handleEdit(c)}>Edit</button>

            <button
              onClick={() => handleDelete(c._id)}
              className="text-red-500 ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}