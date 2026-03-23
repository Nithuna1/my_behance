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

    formData.append("title", "Ecommerce");
    formData.append("type", "ecommerce");
    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    if (image) formData.append("images", image);
    if (video) formData.append("videos", video);

    const res = await fetch("/api/services", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin/services/ecommerce");
    }
  };

  return (
    <form onSubmit={submit} className="p-6 space-y-4">

      <input
        placeholder="Website URL"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="border px-3 py-2 w-full"
      />

      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <input type="file" onChange={(e) => setVideo(e.target.files?.[0] || null)} />

      <button className="bg-blue-600 text-white px-4 py-2">
        Save
      </button>

    </form>
  );
}