"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AddDigitalMarketing() {
  const router = useRouter();

  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const [website, setWebsite] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages((prev) => [...prev, ...files]);
  };

  const handleVideoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setVideo(file);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", "Digital Marketing");
    formData.append("category", JSON.stringify(["service", "digital-marketing"]));

    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    images.forEach((img) => formData.append("images", img));
    if (video) formData.append("videos", video);

    await fetch("/api/services", {
      method: "POST",
      body: formData,
    });

    alert("Saved ✅");
    router.push("/admin/services/digital-marketing");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Add Digital Marketing</h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">

        <form onSubmit={submit} className="space-y-5">

          {/* WEBSITE */}
          <div>
            <label className="block text-sm mb-1">Website URL</label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-sm mb-1">Images</label>

            <input
              ref={imageRef}
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            <button type="button" onClick={() => imageRef.current?.click()}>
              Upload Images
            </button>

            <div className="flex gap-2 mt-3">
              {images.map((img, i) => {
                const preview = URL.createObjectURL(img);
                return <img key={i} src={preview} className="h-20" />;
              })}
            </div>
          </div>

          {/* VIDEO */}
          <div>
            <label className="block text-sm mb-1">Video</label>

            <input
              ref={videoRef}
              type="file"
              onChange={handleVideoChange}
              className="hidden"
            />

            <button type="button" onClick={() => videoRef.current?.click()}>
              Upload Video
            </button>

            {video && <p>{video.name}</p>}
          </div>

          <button className="bg-blue-600 text-white px-5 py-2 rounded">
            Save
          </button>

        </form>

      </div>
    </div>
  );
}