"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddWebsite() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    url: "",
    video: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages(files);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("url", form.url);
    formData.append("video", form.video);

    // ✅ images
    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch("/api/websites", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Website Saved ✅");
      router.push("/admin/websites");
    } else {
      alert("Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Add Website
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">

        <form onSubmit={submit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Website Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Website URL
            </label>
            <input
              name="url"
              value={form.url}
              onChange={change}
              placeholder="https://example.com"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* VIDEO */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Video URL (optional)
            </label>
            <input
              name="video"
              value={form.video}
              onChange={change}
              placeholder="https://youtube.com/..."
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Website Images
            </label>

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block"
            />

            <p className="text-sm text-gray-500 mt-1">
              First image will be used as main image
            </p>

            {/* PREVIEW */}
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
                      onLoad={() => URL.revokeObjectURL(preview)}
                    />

                    {/* REMOVE */}
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
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              Save Website
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/websites")}
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