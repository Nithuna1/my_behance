"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditWebsite() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    name: "",
    url: "",
    video: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(""); // 🔥 new preview
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);

  const getId = () =>
    Array.isArray(params.id) ? params.id[0] : params.id;

  // ✅ LOAD WEBSITE
  const loadWebsite = async () => {
    const id = getId();
    if (!id) return;

    const res = await fetch(`/api/websites/${id}`);
    const data = await res.json();

    if (!res.ok) return;

    // ⚠️ your API returns { website }
    const website = data.website;

    setForm({
      name: website?.name || "",
      url: website?.url || "",
      video: website?.video || "",
    });

    setExistingImage(website?.image || "");
    setLoading(false);
  };

  useEffect(() => {
    loadWebsite();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ HANDLE FILE + PREVIEW
  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // ✅ UPDATE (Cloudinary handled in backend)
  const submit = async (e: any) => {
    e.preventDefault();

    const id = getId();
    if (!id) return;

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("url", form.url);
    formData.append("video", form.video);

    if (image) {
      formData.append("image", image); // 🔥 goes to Cloudinary via API
    }

    const res = await fetch(`/api/websites/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      router.push("/admin/websites");
    } else {
      alert(data.message || "Failed ❌");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Edit Website
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form onSubmit={submit} className="space-y-6">

            <input
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Website Name"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="url"
              value={form.url}
              onChange={change}
              placeholder="Website URL"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="video"
              value={form.video}
              onChange={change}
              placeholder="Video URL"
              className="w-full border p-3 rounded-lg"
            />

            {/* FILE INPUT */}
            <input
              type="file"
              onChange={handleFile}
              className="w-full border p-2 rounded-lg"
            />

            {/* ✅ IMAGE PREVIEW */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">
                Image Preview
              </h3>

              {/* 🔥 NEW IMAGE PREVIEW */}
              {preview ? (
                <div className="w-40 h-28 border rounded-lg overflow-hidden shadow">
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : existingImage ? (
                <div className="w-40 h-28 border rounded-lg overflow-hidden shadow">
                  <img
                    src={existingImage}
                    className="w-full h-full object-cover"
                  />
                </div>
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
                onClick={() => router.push("/admin/websites")}
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