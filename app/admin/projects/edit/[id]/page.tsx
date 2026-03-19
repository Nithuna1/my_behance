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

    return Array.isArray(params.id)
      ? params.id[0]
      : params.id;
  };

  // ✅ LOAD PROJECT
  const loadProject = async () => {
    try {
      const id = getId();
      if (!id) return;

      console.log("FRONTEND ID:", id); // 🔍 DEBUG

      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();

      console.log("PROJECT DATA:", data);

      if (!res.ok || data.success === false) {
        console.error("Project not found");
        setLoading(false);
        return;
      }

      setForm({
        title: data.title || "",
        author: data.author || "",
        year: data.year || "",
        category: data.category || "",
        description: data.description || "",
      });

      setExistingImages(data.gallery || []);

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

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages((prev) => [...prev, ...files]);
  };

  // ✅ UPDATE
  const submit = async (e: any) => {
  e.preventDefault();

  try {
    const id = getId();
    if (!id) return;

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    console.log("UPDATE RESPONSE:", data); // 🔥 ADD THIS

    if (data.success) {
      alert("Updated ✅");
      router.push("/admin/projects");
    } else {
      alert(data.message || "Failed ❌"); // 🔥 SHOW REAL ERROR
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

    {/* PAGE WRAPPER */}
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

            <div>
              <label className="text-sm text-gray-600">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={change}
                className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={change}
                className="w-full mt-1 border p-3 rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
              />
            </div>

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

            <div>
              <label className="text-sm text-gray-600">Upload Images</label>
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
  className="bg-gray-600 text-black px-4 py-2 rounded mt-2"
>
  + Add More Images
</button>
            </div>

           

          </div><br></br>

          {/* RIGHT SIDE */}
          <div className="space-y-4 ml-4">

            <h3 className="font-semibold text-gray-700">
              Image Preview
            </h3>

            {existingImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">

                {existingImages.map((img, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden shadow-sm border"
                  >
                    <img
                      src={img}
                      className="w-full h-36 object-cover hover:scale-105 transition"
                    />
                  </div>
                ))}

                {images.length > 0 && (
  <div className="mt-4">
    <h4 className="text-sm text-gray-600 mb-2">New Images</h4>

    <div className="grid grid-cols-3 gap-3">
      {images.map((img, i) => {
        const preview = URL.createObjectURL(img);

        return (
          <img
            key={i}
            src={preview}
            className="w-full h-36 object-cover rounded"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
        );
      })}
    </div>
  </div>
)}

              </div>
            ) : (
              <p className="text-gray-400">No images available</p>
            )}

          </div>


           {/* BUTTONS */}
            <div className="flex gap-4 pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
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