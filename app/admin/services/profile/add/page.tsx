"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AddProfile() {
  const router = useRouter();

  const imageRef = useRef<HTMLInputElement>(null);

  const [website, setWebsite] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages((prev) => [...prev, ...files]);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", "Profile");
    formData.append("category", JSON.stringify(["service", "profile"]));
    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch("/api/services", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Saved ✅");
      router.push("/admin/services/profile");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Add Profile Item
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">

        <form onSubmit={submit} className="space-y-5">

          {/* WEBSITE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Website URL / Link
            </label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Images
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
              + Upload Images
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
              Save
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/services/profile")}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
