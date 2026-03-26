"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUiUx() {
  const router = useRouter();
  const { id } = useParams();

  const fileRef = useRef<HTMLInputElement>(null);

  const [website, setWebsite] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");

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
      });
  }, [id]);

  // ==============================
  // 🔥 IMAGE HANDLING
  // ==============================
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ==============================
  // ✅ UPDATE (CLOUDINARY FLOW)
  // ==============================
  const update = async () => {
    if (!id) return;

    const formData = new FormData();

    formData.append("title", "UIUX");

    formData.append(
      "category",
      JSON.stringify(["service", "uiux"])
    );

    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    // 🔥 SEND IMAGE → API → CLOUDINARY
    if (image) {
      formData.append("images", image);
    }

    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      router.push("/admin/services/uiux");
    } else {
      alert(data.message || "Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Edit UI/UX
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
        ref={fileRef}
        type="file"
        onChange={handleImage}
        className="hidden"
      />

      <button
        onClick={() => fileRef.current?.click()}
        className="bg-gray-600 text-white px-4 py-2 rounded"
      >
        Upload Image
      </button>

      {/* PREVIEW */}
      <div className="mt-4">
        {preview ? (
          <img src={preview} className="w-32 h-24 object-cover rounded" />
        ) : existingImage ? (
          <img src={existingImage} className="w-32 h-24 object-cover rounded" />
        ) : (
          <p className="text-gray-400">No image</p>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={update}
        className="bg-green-600 text-white px-4 py-2 mt-6 rounded"
      >
        Update
      </button>

    </div>
  );
}