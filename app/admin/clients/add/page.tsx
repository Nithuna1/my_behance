"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClient() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    review: "",
    section: "front",
  });

  const [image, setImage] = useState<File | null>(null);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("review", form.review);
    fd.append("section", form.section);

    if (image) {
      fd.append("image", image);
    }

    const res = await fetch("/api/clients", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (data.success) {
      alert("Client Saved ✅");
      router.push("/admin/clients");
    } else {
      alert("Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Add Client
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">

        <form onSubmit={submit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Client Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* REVIEW */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Review
            </label>
            <textarea
              name="review"
              value={form.review}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* SECTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Section
            </label>
            <select
              name="section"
              value={form.section}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="front">Front</option>
              <option value="back">Back</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Client Image
            </label>

            <input
              type="file"
              onChange={handleImage}
              className="block"
            />

            {/* PREVIEW */}
            {image && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(image)}
                  className="h-24 w-24 object-cover rounded border"
                  onLoad={(e) =>
                    URL.revokeObjectURL((e.target as any).src)
                  }
                />
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              Save Client
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/clients")}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}