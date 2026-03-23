"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEcommerce() {
  const router = useRouter();

  const [website, setWebsite] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    // ✅ REQUIRED FIELDS FOR SERVICE
    formData.append("title", "Ecommerce"); // or dynamic later
    formData.append("type", "ecommerce");

    // ✅ ARRAY FORMAT (matches your services API)
    formData.append("websites", JSON.stringify([website]));

    // optional empty arrays
    formData.append("tags", JSON.stringify([]));

    // ✅ FILES
    if (image) formData.append("images", image);
    if (video) formData.append("videos", video);

    const res = await fetch("/api/services", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Saved ✅");

      // ✅ redirect to filtered services
      router.push("/admin/services?type=ecommerce");
    } else {
      alert("Failed ❌");
    }
  };

  return (
    <form onSubmit={submit} className="p-6 space-y-4">

      {/* WEBSITE */}
      <input
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      {/* IMAGE */}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      {/* VIDEO */}
      <input
        type="file"
        onChange={(e) => setVideo(e.target.files?.[0] || null)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>

    </form>
  );
}