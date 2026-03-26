"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ SAFE ID
  const getId = () => {
    if (!params?.id) return null;
    return Array.isArray(params.id) ? params.id[0] : params.id;
  };

  // ==============================
  // ✅ LOAD PROJECT (FIXED)
  // ==============================
  const loadProject = async () => {
    try {
      const id = getId();
      if (!id) return;

      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();

      if (!res.ok || data.success === false) {
        console.error("Project not found");
        return;
      }

      const project = data.project; // 🔥 FIXED

      setForm({
        title: project?.title || "",
        author: project?.author || "",
        year: project?.year || "",
        category: project?.category || "",
        description: project?.description || "",
      });

      setExistingImages(project?.gallery || []);
    } catch (err) {
      console.error("Error loading project:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==============================
  // ✅ HANDLE FILE + PREVIEW
  // ==============================
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages((prev) => [...prev, ...files]);
  };

  // ==============================
  // ✅ UPDATE (CLOUDINARY READY)
  // ==============================
  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const id = getId();
      if (!id) return;

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // 🔥 SEND MULTIPLE IMAGES
      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Updated ✅");

        // 🔥 reload to get Cloudinary URLs
        await loadProject();

        router.push("/admin/projects");
      } else {
        alert(data.message || "Failed ❌");
      }

    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong ❌");
    }
  };

  if (loading) {
    return <div className="p-8">Loading project...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Edit Project
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form
            onSubmit={submit}
            className="grid md:grid-cols-[1.4fr_1fr] gap-12"
          >

            {/* LEFT SIDE */}
            <div className="space-y-6">

              <input
                name="title"
                value={form.title}
                onChange={change}
                placeholder="Title"
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={change}
                placeholder="Description"
                className="w-full border p-3 rounded-lg h-32"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="author"
                  value={form.author}
                  onChange={change}
                  placeholder="Author"
                  className="border p-3 rounded-lg"
                />

                <input
                  name="year"
                  value={form.year}
                  onChange={change}
                  placeholder="Year"
                  className="border p-3 rounded-lg"
                />
              </div>

              <input
                name="category"
                value={form.category}
                onChange={change}
                placeholder="Category"
                className="w-full border p-3 rounded-lg"
              />

              {/* FILE INPUT */}
              <input
                ref={fileRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                + Add Images
              </button>

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-4">

              <h3 className="font-semibold text-gray-700">
                Image Preview
              </h3>

              {/* EXISTING IMAGES (Cloudinary URLs) */}
              {existingImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Existing</p>
                  <div className="grid grid-cols-3 gap-3">
                    {existingImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* NEW IMAGES */}
              {images.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mt-4 mb-2">New</p>
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img, i) => {
                      const preview = URL.createObjectURL(img);
                      return (
                        <img
                          key={i}
                          src={preview}
                          className="w-full h-32 object-cover rounded"
                          onLoad={() => URL.revokeObjectURL(preview)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {existingImages.length === 0 && images.length === 0 && (
                <p className="text-gray-400">No images</p>
              )}

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-6 col-span-2">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                Update
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/projects")}
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