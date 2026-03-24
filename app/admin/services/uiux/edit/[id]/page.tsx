"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUiUx() {
  const router = useRouter();
  const { id } = useParams();

  const [website, setWebsite] = useState("");

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
    formData.append("title", "UIUX");

    // 🔥 IMPORTANT
    formData.append("category", JSON.stringify(["service", "uiux"]));

    formData.append("websites", JSON.stringify([website]));
    formData.append("tags", JSON.stringify([]));

    await fetch("/api/services", {
      method: "PUT",
      body: formData,
    });

    alert("Updated ✅");
    router.push("/admin/services/uiux");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Edit UI/UX</h1>

      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="border p-2"
      />

      <button onClick={update} className="bg-green-600 text-white px-4 py-2 mt-4">
        Update
      </button>

    </div>
  );
}