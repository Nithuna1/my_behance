"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditService() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    title: "",
    tags: "",
    websites: "",
    videos: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getId = () =>
    Array.isArray(params.id) ? params.id[0] : params.id;

  // ✅ LOAD SERVICE
  const loadService = async () => {
    const id = getId();
    if (!id) return;

    const res = await fetch(`/api/services/${id}`);
    const data = await res.json();

    if (!res.ok) return;

    setForm({
      title: data.title || "",
      tags: (data.tags || []).join(", "),
      websites: (data.websites || []).join(", "),
      videos: (data.videos || []).join(", "),
    });

    setExistingImages(data.images || []);
    setLoading(false);
  };

  useEffect(() => {
    loadService();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = (e: any) => {
    setImages(Array.from(e.target.files));
  };

  // ✅ UPDATE
  const submit = async (e: any) => {
    e.preventDefault();

    const id = getId();
    if (!id) return;

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("tags", JSON.stringify(form.tags.split(",")));
    formData.append("websites", JSON.stringify(form.websites.split(",")));
    formData.append("videos", JSON.stringify(form.videos.split(",")));

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      router.push("/admin/services");
    } else {
      alert(data.message || "Failed ❌");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Edit Service
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* ✅ SINGLE COLUMN FORM */}
          <form onSubmit={submit} className="space-y-6">

            <input
              name="title"
              value={form.title}
              onChange={change}
              placeholder="Title"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="tags"
              value={form.tags}
              onChange={change}
              placeholder="Tags (comma separated)"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="websites"
              value={form.websites}
              onChange={change}
              placeholder="Websites (comma separated)"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="videos"
              value={form.videos}
              onChange={change}
              placeholder="Videos (comma separated)"
              className="w-full border p-3 rounded-lg"
            />

            {/* FILE INPUT */}
            <input
              type="file"
              multiple
              onChange={handleFiles}
              className="w-full border p-2 rounded-lg"
            />

           <div className="space-y-3">

  <h3 className="font-semibold text-gray-700">
    Image Preview
  </h3>

  {existingImages.length > 0 ? (
    <div className="flex flex-wrap gap-3">

      {existingImages.map((img, i) => (
        <div
          key={i}
          className="w-28 h-20 rounded-lg overflow-hidden border"
        >
          <img
            src={img}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

    </div>
  ) : (
    <p className="text-gray-400">No images</p>
  )}

</div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-2">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Update
              </button>

              
                <button
                  type="button"
                  onClick={() => router.push("/admin/services")}
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