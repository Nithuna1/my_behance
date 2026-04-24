"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProfile() {
  const router = useRouter();
  const params = useParams();

  const videoRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    websites: "",
    tags: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  
  const [video, setVideo] = useState<File | null>(null);
  const [existingVideos, setExistingVideos] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(true);

  const handleVideoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setVideo(file);
  };

  const getId = () => Array.isArray(params.id) ? params.id[0] : params.id;

  const load = async () => {
    const id = getId();
    if (!id) return;
    const res = await fetch(`/api/services/${id}`);
    const data = await res.json();
    if (data.service) {
      const s = data.service;
      setForm({
        title: s.title || "Profile",
        websites: (s.websites || []).join(", "),
        tags: (s.tags || []).join(", "),
      });
      setExistingImages(s.images || []);
      setExistingVideos(s.videos || []);
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
    formData.append("category", JSON.stringify(["service", "profile"]));
    formData.append("websites", JSON.stringify(form.websites.split(",").map(w => w.trim())));
    formData.append("tags", JSON.stringify(form.tags.split(",").map(t => t.trim())));

    if (video) formData.append("videos", video);

    images.forEach(img => formData.append("images", img));

    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Updated ✅");
      router.push("/admin/services/profile");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Edit Profile Item</h1>
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

          {/* VIDEO */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Video
            </label>

            <input
              ref={videoRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => videoRef.current?.click()}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Upload Video
            </button>

            {video && (
              <p className="text-green-600 mt-2 text-sm">
                {video.name}
              </p>
            )}

            {existingVideos && existingVideos.length > 0 && !video && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Current Video (will be replaced if new uploaded):</p>
                <video src={existingVideos[0]} className="h-24 object-cover rounded border" controls />
              </div>
            )}
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
            <button type="button" onClick={() => router.push("/admin/services/profile")} className="bg-gray-500 text-white px-5 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
