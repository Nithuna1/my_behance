"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddWebsite() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    url: "",
  });

  // ✅ FIXED TYPES
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string>("");

  // ✅ CLOUDINARY UPLOAD
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/Root/auto/upload"
    );

    const data = await res.json();
    return data.secure_url;
  };

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE UPLOAD
  const handleFileChange = async (e: any) => {
    const files = Array.from(e.target.files || []);

    const urls = await Promise.all(
      files.map((file: any) => uploadToCloudinary(file))
    );

    setImages(urls);
  };

  // ✅ VIDEO UPLOAD
  const handleVideoChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);
    setVideo(url);
  };

  // ✅ SUBMIT (NO FORMDATA)
  const submit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/websites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        url: form.url,
        image: images[0],
        images,
        video,
      }),
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
      <h1 className="text-2xl font-bold mb-6">Add Website</h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">
        <form onSubmit={submit} className="space-y-5">

          {/* NAME */}
          <input
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Website Name"
            className="w-full border px-3 py-2"
          />

          {/* URL */}
          <input
            name="url"
            value={form.url}
            onChange={change}
            placeholder="https://example.com"
            className="w-full border px-3 py-2"
          />

          {/* VIDEO */}
          <input type="file" accept="video/*" onChange={handleVideoChange} />

          {video && (
            <p className="text-green-600 text-sm">Video uploaded ✅</p>
          )}

          {/* IMAGES */}
          <input type="file" multiple onChange={handleFileChange} />

          {/* PREVIEW */}
          <div className="flex gap-3 mt-3 flex-wrap">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="h-24 w-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, index) => index !== i))
                  }
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button className="bg-blue-600 text-white px-5 py-2 rounded">
            Save Website
          </button>
        </form>
      </div>
    </div>
  );
}