"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AddVideoProduction() {
  const router = useRouter();

  const videoRef = useRef<HTMLInputElement>(null);

  const [website, setWebsite] = useState("");
  const [video, setVideo] = useState<File | null>(null);

  const handleVideoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setVideo(file);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", "Video Production");
    formData.append("category", JSON.stringify(["service", "video-production"]));
    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    if (video) formData.append("videos", video);

    await fetch("/api/services", {
      method: "POST",
      body: formData,
    });

    alert("Saved ✅");
    router.push("/admin/services/video-production");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Add Video Production</h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">

        <form onSubmit={submit} className="space-y-5">

          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website URL"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            ref={videoRef}
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="hidden"
          />

          <button type="button" onClick={() => videoRef.current?.click()}>
            Upload Video
          </button>

          {video && <p>{video.name}</p>}

          <button className="bg-blue-600 text-white px-5 py-2 rounded">
            Save
          </button>

        </form>

      </div>
    </div>
  );
}