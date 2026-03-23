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
    formData.append("website", website);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    const res = await fetch("/api/ecommerce", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Saved ✅");
      router.push("/admin/ecommerce");
    }
  };

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <input placeholder="Website" onChange={(e) => setWebsite(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <input type="file" onChange={(e) => setVideo(e.target.files?.[0] || null)} />
      <button className="bg-blue-600 text-white px-4 py-2">Save</button>
    </form>
  );
}