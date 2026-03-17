"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddService() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    tags: "",
    websites: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages(files);
  };

  const handleVideoChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setVideos(files);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);

    // ✅ arrays
    formData.append(
      "tags",
      JSON.stringify(
        form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      )
    );

    formData.append(
      "websites",
      JSON.stringify(
        form.websites.split(",").map((w) => w.trim()).filter(Boolean)
      )
    );

    // ✅ images
    images.forEach((img) => {
      formData.append("images", img);
    });

    // ✅ videos
    videos.forEach((vid) => {
      formData.append("videos", vid);
    });

    const res = await fetch("/api/services", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Service Saved ✅");
      router.push("/admin/services");
    } else {
      alert("Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Add Service
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">

        <form onSubmit={submit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Service Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Service Images
            </label>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
            />

            <div className="flex gap-3 mt-3 flex-wrap">
              {images.map((img, i) => {
                const preview = URL.createObjectURL(img);
                return (
                  <div key={i} className="relative">
                    <img
                      src={preview}
                      className="h-24 w-24 object-cover rounded border"
                      onLoad={() => URL.revokeObjectURL(preview)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, idx) => idx !== i))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VIDEOS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Service Videos
            </label>

            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoChange}
            />

            <div className="flex gap-3 mt-3 flex-wrap">
              {videos.map((vid, i) => {
                const preview = URL.createObjectURL(vid);
                return (
                  <div key={i} className="relative">
                    <video
                      src={preview}
                      className="h-24 w-32 object-cover rounded border"
                      controls
                      onLoadedData={() => URL.revokeObjectURL(preview)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setVideos(videos.filter((_, idx) => idx !== i))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TAGS */}
          <div>
            <label>Tags (comma separated)</label>
            <input
              name="tags"
              value={form.tags}
              onChange={change}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* WEBSITES */}
          <div>
            <label>Websites (comma separated)</label>
            <input
              name="websites"
              value={form.websites}
              onChange={change}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-5 py-2 rounded">
              Save
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/services")}    
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