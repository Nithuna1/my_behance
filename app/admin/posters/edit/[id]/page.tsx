"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPoster() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    title: "",
    category: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);

  const getId = () =>
    Array.isArray(params.id) ? params.id[0] : params.id;

  // ==============================
  // ✅ LOAD POSTER (FIXED)
  // ==============================
  const loadPoster = async () => {
    const id = getId();
    if (!id) return;

    const res = await fetch(`/api/posters/${id}`);
    const data = await res.json();

    if (!res.ok || !data.success) return;

    const poster = data.poster;

    setForm({
      title: poster?.title || "",
      category: poster?.category || "",
    });

    setExistingImage(poster?.image || "");
    setLoading(false);
  };

  useEffect(() => {
    loadPoster();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==============================
  // 🔥 FILE + PREVIEW
  // ==============================
  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ==============================
  // ✅ UPDATE (CLOUDINARY FLOW)
  // ==============================
  const submit = async (e: any) => {
    e.preventDefault();

    const id = getId();
    if (!id) return;

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(`/api/posters/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      router.push("/admin/posters");
    } else {
      alert(data.message || "Failed ❌");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Edit Poster
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form onSubmit={submit} className="space-y-6">

            <input
              name="title"
              value={form.title}
              onChange={change}
              placeholder="Poster Title"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="category"
              value={form.category}
              onChange={change}
              placeholder="Category"
              className="w-full border p-3 rounded-lg"
            />

            {/* FILE INPUT */}
            <input
              type="file"
              onChange={handleFile}
              className="w-full border p-2 rounded-lg"
            />

            {/* IMAGE PREVIEW */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">
                Image Preview
              </h3>

              {preview ? (
                <img
                  src={preview}
                  className="w-28 h-20 object-cover rounded border"
                />
              ) : existingImage ? (
                <img
                  src={existingImage}
                  className="w-28 h-20 object-cover rounded border"
                />
              ) : (
                <p className="text-gray-400">No image</p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-2">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Update
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/posters")}
                className="bg-gray-300 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}