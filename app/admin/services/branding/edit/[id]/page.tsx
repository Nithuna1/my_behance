"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBranding() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    title: "",
    websites: "",
    tags: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getId = () => Array.isArray(params.id) ? params.id[0] : params.id;

  const load = async () => {
    const id = getId();
    if (!id) return;
    const res = await fetch(`/api/services/${id}`);
    const data = await res.json();
    if (data.service) {
      const s = data.service;
      setForm({
        title: s.title || "Branding",
        websites: (s.websites || []).join(", "),
        tags: (s.tags || []).join(", "),
      });
      setExistingImages(s.images || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    const id = getId();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", JSON.stringify(["service", "branding"]));
    formData.append("websites", JSON.stringify(form.websites.split(",").map(w => w.trim())));
    formData.append("tags", JSON.stringify(form.tags.split(",").map(t => t.trim())));

    images.forEach(img => formData.append("images", img));

    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Updated ✅");
      router.push("/admin/services/branding");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Edit Branding Item</h1>
      <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl">
        <form onSubmit={submit} className="space-y-5">
           <div>
            <label className="block text-sm font-medium mb-1">Website URL</label>
            <input
              value={form.websites}
              onChange={(e) => setForm({...form, websites: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files || []))}
            />
            <div className="flex gap-2 mt-2">
              {existingImages.map((img, i) => (
                <img key={i} src={img} className="h-20 w-20 object-cover rounded border" />
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">Update</button>
            <button type="button" onClick={() => router.push("/admin/services/branding")} className="bg-gray-500 text-white px-5 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
