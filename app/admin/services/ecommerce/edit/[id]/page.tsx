"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEcommerce() {
  const router = useRouter();
  const { id } = useParams();

  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const [website, setWebsite] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const [oldImage, setOldImage] = useState("");
  const [oldVideo, setOldVideo] = useState("");

  // ✅ LOAD EXISTING DATA
  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        const item = data.find((x: any) => x._id === id);

        if (item) {
          setWebsite(item.websites?.[0] || "");
          setOldImage(item.images?.[0] || "");
          setOldVideo(item.videos?.[0] || "");
        }
      });
  }, [id]);

  // ✅ IMAGE CHANGE
  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages((prev) => [...prev, ...files]);
  };

  // ✅ VIDEO CHANGE
  const handleVideoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setVideo(file);
  };

  const update = async () => {
    const formData = new FormData();

    formData.append("id", id as string);
    formData.append("title", "Ecommerce");
    formData.append("type", "ecommerce");
    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    images.forEach((img) => {
      formData.append("images", img);
    });

    if (video) formData.append("videos", video);

    await fetch("/api/services", {
      method: "PUT",
      body: formData,
    });

    alert("Updated ✅");
    router.push("/admin/services/ecommerce");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Edit Ecommerce
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl space-y-6">

        {/* WEBSITE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Website URL
          </label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* OLD IMAGE */}
        {oldImage && (
          <div>
            <label className="text-sm font-medium">Current Image</label>
            <img
              src={oldImage}
              className="h-24 w-24 object-cover rounded border mt-2"
            />
          </div>
        )}

        {/* NEW IMAGES */}
        <div>
          <label className="text-sm font-medium mb-1 block">
            Replace / Add Images
          </label>

          <input
            ref={imageRef}
            type="file"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => imageRef.current?.click()}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Upload Images
          </button>

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

        {/* OLD VIDEO */}
        {oldVideo && (
          <div>
            <label className="text-sm font-medium">Current Video</label>
            <video
              src={oldVideo}
              controls
              className="h-32 mt-2 rounded"
            />
          </div>
        )}

        {/* NEW VIDEO */}
        <div>
          <label className="text-sm font-medium mb-1 block">
            Replace Video
          </label>

          <input
            ref={videoRef}
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => videoRef.current?.click()}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Upload Video
          </button>

          {video && (
            <p className="text-green-600 mt-2 text-sm">
              {video.name}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">

          <button
            onClick={update}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Update
          </button>

          <button
            onClick={() => router.push("/admin/services/ecommerce")}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}