"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditVideoProduction() {
  const router = useRouter();
  const { id } = useParams();

  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const [website, setWebsite] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState("");

  const [existingImage, setExistingImage] = useState("");
  const [existingVideo, setExistingVideo] = useState("");

  // ==============================
  // ✅ LOAD DATA (FIXED)
  // ==============================
  useEffect(() => {
    if (!id) return;

    fetch(`/api/services/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success) return;

        const service = data.service;

        setWebsite(service?.websites?.[0] || "");
        setExistingImage(service?.images?.[0] || "");
        setExistingVideo(service?.videos?.[0] || "");
      });
  }, [id]);

  // ==============================
  // 🔥 IMAGE HANDLING
  // ==============================
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ==============================
  // 🔥 VIDEO HANDLING
  // ==============================
  const handleVideo = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  // ==============================
  // ✅ UPDATE (CLOUDINARY FLOW)
  // ==============================
  const update = async () => {
    if (!id) return;

    const formData = new FormData();

    formData.append("title", "Video Production");
    formData.append(
      "category",
      JSON.stringify(["service", "video-production"])
    );

    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    // 🔥 SEND TO CLOUDINARY VIA API
    if (image) formData.append("images", image);
    if (video) formData.append("videos", video);

    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      router.push("/admin/services/video-production");
    } else {
      alert(data.message || "Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Edit Video Production
      </h1>

      {/* WEBSITE */}
      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website URL"
        className="border p-2 w-full mb-4"
      />

      {/* IMAGE */}
      <input
        ref={imageRef}
        type="file"
        onChange={handleImage}
        className="hidden"
      />

      <button
        onClick={() => imageRef.current?.click()}
        className="bg-gray-600 text-white px-4 py-2 rounded"
      >
        Upload Image
      </button>

      <div className="mt-3">
        {imagePreview ? (
          <img src={imagePreview} className="w-32 h-24 object-cover rounded" />
        ) : existingImage ? (
          <img src={existingImage} className="w-32 h-24 object-cover rounded" />
        ) : (
          <p className="text-gray-400">No image</p>
        )}
      </div>

      {/* VIDEO */}
      <input
        ref={videoRef}
        type="file"
        accept="video/*"
        onChange={handleVideo}
        className="hidden"
      />

      <button
        onClick={() => videoRef.current?.click()}
        className="bg-gray-600 text-white px-4 py-2 rounded mt-4"
      >
        Upload Video
      </button>

      <div className="mt-3">
        {videoPreview ? (
          <video src={videoPreview} controls className="h-32 rounded" />
        ) : existingVideo ? (
          <video src={existingVideo} controls className="h-32 rounded" />
        ) : (
          <p className="text-gray-400">No video</p>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={update}
        className="bg-green-600 text-white px-4 py-2 mt-6 rounded"
      >
        Update
      </button>

      <button
        onClick={() => router.push("/admin/services/video-production")}
        className="bg-gray-500 text-white px-5 py-2 rounded-lg"
      >
        Cancel
      </button>

    </div>
  );
}