"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClient() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    review: "",
    section: "front",
    image: null as File | null,
  });

  const handleSubmit = async () => {
    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("review", form.review);
    fd.append("section", form.section);

    if (form.image) {
      fd.append("image", form.image);
    }

    await fetch("/api/clients", {
      method: "POST",
      body: fd,
    });

    router.push("/admin/clients");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Add Client</h1>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <textarea
        placeholder="Review"
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, review: e.target.value })
        }
      />

      <select
        className="border p-2 mb-3"
        onChange={(e) =>
          setForm({ ...form, section: e.target.value })
        }
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
        className="bg-blue-600 text-white px-4 py-2 mt-4"
      >
        Save
      </button>
    </div>
  );
}