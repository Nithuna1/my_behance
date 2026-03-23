"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEcommerce() {
  const router = useRouter();
  const { id } = useParams();

  const [website, setWebsite] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

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

  const update = async () => {
    const formData = new FormData();

    formData.append("id", id as string);
    formData.append("title", "Ecommerce");
    formData.append("type", "ecommerce");
    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    if (image) formData.append("images", image);
    if (video) formData.append("videos", video);

    await fetch("/api/services", {
      method: "PUT",
      body: formData,
    });

    router.push("/admin/services/ecommerce");
  };

  return (
    <div className="p-6 space-y-4">

      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="border px-3 py-2 w-full"
      />

      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <input type="file" onChange={(e) => setVideo(e.target.files?.[0] || null)} />

      <button
        onClick={update}
        className="bg-green-600 text-white px-4 py-2"
      >
        Update
      </button>

    </div>
  );
}