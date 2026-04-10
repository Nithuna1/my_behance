"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditClient() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState<any>({
    name: "",
    review: "",
    section: "front",
    image: null,
  });

  // LOAD DATA
  useEffect(() => {
    fetch(`/api/clients/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleSubmit = async () => {
    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("review", form.review);
    fd.append("section", form.section);

    if (form.image instanceof File) {
      fd.append("image", form.image);
    }

    await fetch(`/api/clients/${id}`, {
      method: "PUT",
      body: fd,
    });

    router.push("/admin/clients");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Client</h1>

      <input
        value={form.name}
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <textarea
        value={form.review}
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, review: e.target.value })
        }
      />

      <select
        value={form.section}
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
          setForm({
            ...form,
            image: e.target.files?.[0],
          })
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        Update
      </button>
    </div>
  );
}