"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";


export default function AddProject() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    description: "",
  });

  // ✅ Use File[] (not FileList)
  const [images, setImages] = useState<File[]>([]);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Safe file handling
 const handleFileChange = (e: any) => {
  const files = Array.from(e.target.files || []) as File[];
  setImages((prev) => [...prev, ...files]); 
};

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("year", form.year);
    formData.append("category", form.category);
    formData.append("description", form.description);

    // ✅ Send all images
    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Saved ✅");
      router.push("/admin/projects");
    } else {
      alert("Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Add Project
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">

        <form onSubmit={submit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Images
            </label>

           <input
  ref={fileRef}
  type="file"
  multiple
  onChange={handleFileChange}
  className="hidden"
/>
            <p className="text-sm text-gray-500 mt-1">
              First image will be set as primary
            </p>

            {/* ✅ Preview */}
            <div className="flex gap-3 mt-3 flex-wrap">
              {images.map((img, i) => {
                const preview = URL.createObjectURL(img);

                return (
                  <div key={i} className="relative">

                    <img
                      src={preview}
                      className={`h-24 w-24 object-cover rounded border ${
                        i === 0 ? "ring-2 ring-blue-500" : ""
                      }`}
                      onLoad={() => URL.revokeObjectURL(preview)} // ✅ prevent memory leak
                    />

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, index) => index !== i))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ✕
                    </button>

                  </div>
                );
              })}
            </div>

            <button
  type="button"
  onClick={() => fileRef.current?.click()}
  className="bg-gray-600 text-black px-4 py-2 rounded"
>
  + Add More Images
</button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={change}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Year</label>
              <input
                name="year"
                value={form.year}
                onChange={change}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={change}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              Save Project
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}