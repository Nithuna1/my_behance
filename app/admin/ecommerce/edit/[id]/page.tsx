"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEcommerce() {
  const router = useRouter();
  const { id } = useParams();

  const [website, setWebsite] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  // ✅ LOAD DATA FROM SERVICES API
  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        const item = data.find((x: any) => x._id === id);

        if (item) {
          setWebsite(item.websites?.[0] || "");
        }
      });
  }, [id]);

  // ✅ UPDATE (FORMDATA)
  const update = async () => {
    const formData = new FormData();

    formData.append("id", id as string);
    formData.append("title", "Ecommerce");
    formData.append("type", "ecommerce");

    // ✅ array format
    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    // ✅ optional files
    if (image) formData.append("images", image);
    if (video) formData.append("videos", video);

    await fetch("/api/services", {
      method: "PUT",
      body: formData,
    });

    // ✅ redirect
    router.push("/admin/services?type=ecommerce");
  };

  return (
    <div className="p-6 space-y-4">

      {/* WEBSITE */}
      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="border px-3 py-2 w-full rounded"
        placeholder="Website"
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

      <button
        onClick={update}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>

    </div>
  );
}