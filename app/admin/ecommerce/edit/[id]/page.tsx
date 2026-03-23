"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEcommerce() {
  const router = useRouter();
  const { id } = useParams();

  const [website, setWebsite] = useState("");

  useEffect(() => {
    fetch("/api/ecommerce")
      .then(res => res.json())
      .then(data => {
        const item = data.find((x: any) => x._id === id);
        if (item) setWebsite(item.website);
      });
  }, []);

  const update = async () => {
    await fetch("/api/ecommerce", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, website }),
    });

    router.push("/admin/ecommerce");
  };

  return (
    <div className="p-6">
      <input value={website} onChange={(e) => setWebsite(e.target.value)} />
      <button onClick={update} className="bg-green-600 text-white px-4 py-2">
        Update
      </button>
    </div>
  );
}