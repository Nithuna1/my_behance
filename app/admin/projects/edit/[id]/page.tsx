"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // ✅ LOAD PROJECT DATA
  const loadProject = async () => {
    const res = await fetch(`/api/projects/${params.id}`);
    const data = await res.json();

    setForm({
      title: data.title || "",
      author: data.author || "",
      year: data.year || "",
      category: data.category || "",
      description: data.description || "",
    });

    setExistingImages(data.gallery || []);
  };

  useEffect(() => {
    if (params.id) loadProject();
  }, [params.id]);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages(files);
  };

  // ✅ UPDATE
  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch(`/api/projects/${params.id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      router.push("/admin/projects");
    } else {
      alert("Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Edit Project
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">

        <form onSubmit={submit} className="space-y-5">

          {/* Title */}
          <input
            name="title"
            value={form.title}
            onChange={change}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={change}
            className="w-full border p-2 rounded"
          />

          {/* Existing Images */}
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-20 w-20 object-cover rounded border"
              />
            ))}
          </div>

          {/* Upload New */}
          <input type="file" multiple onChange={handleFileChange} />

          {/* Other fields */}
          <input
            name="author"
            value={form.author}
            onChange={change}
            placeholder="Author"
            className="w-full border p-2 rounded"
          />

          <input
            name="year"
            value={form.year}
            onChange={change}
            placeholder="Year"
            className="w-full border p-2 rounded"
          />

          <input
            name="category"
            value={form.category}
            onChange={change}
            placeholder="Category"
            className="w-full border p-2 rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Project
          </button>

        </form>

      </div>

    </div>
  );
}