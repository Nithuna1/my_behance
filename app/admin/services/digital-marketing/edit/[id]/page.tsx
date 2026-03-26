"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditDigitalMarketing() {
  const router = useRouter();
  const { id } = useParams();

  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const [website, setWebsite] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState("");

  const [oldImage, setOldImage] = useState("");
  const [oldVideo, setOldVideo] = useState("");

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
        setOldImage(service?.images?.[0] || "");
        setOldVideo(service?.videos?.[0] || "");
      });
  }, [id]);

  // ==============================
  // 🔥 IMAGE HANDLING
  // ==============================
  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreview((prev) => [...prev, ...previews]);
  };

  // ==============================
  // 🔥 VIDEO HANDLING
  // ==============================
  const handleVideoChange = (e: any) => {
    const file = e.target.files?.[0];
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

    formData.append("title", "Digital Marketing");

    formData.append(
      "category",
      JSON.stringify(["service", "digital-marketing"])
    );

    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    // 🔥 SEND FILES → API → CLOUDINARY
    images.forEach((img) => {
      formData.append("images", img);
    });

    if (video) {
      formData.append("videos", video);
    }

    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      router.push("/admin/services/digital-marketing");
    } else {
      alert(data.message || "Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Edit Digital Marketing
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl space-y-6">

        {/* WEBSITE */}
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Website URL"
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* OLD IMAGE */}
        {oldImage && (
          <img
            src={oldImage}
            className="h-24 w-24 object-cover rounded border"
          />
        )}

        {/* NEW IMAGES */}
        <input
          ref={imageRef}
          type="file"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          onClick={() => imageRef.current?.click()}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Upload Images
        </button>

        <div className="flex gap-3 flex-wrap">
          {imagePreview.map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-24 w-24 object-cover rounded border"
            />
          ))}
        </div>

        {/* OLD VIDEO */}
        {oldVideo && (
          <video src={oldVideo} controls className="h-32 rounded" />
        )}

        {/* NEW VIDEO */}
        <input
          ref={videoRef}
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="hidden"
        />

        <button
          onClick={() => videoRef.current?.click()}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Upload Video
        </button>

        {videoPreview && (
          <video src={videoPreview} controls className="h-32 mt-2 rounded" />
        )}

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">

          <button
            onClick={update}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Update
          </button>

          <button
            onClick={() =>
              router.push("/admin/services/digital-marketing")
            }
            className="bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}