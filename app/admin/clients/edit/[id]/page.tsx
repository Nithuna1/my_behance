"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditClient() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    name: "",
    review: "",
    section: "front",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ GET ID (same as app page)
  const getId = () => {
    if (!params?.id) return null;
    return Array.isArray(params.id) ? params.id[0] : params.id;
  };

  // ==============================
  // ✅ LOAD CLIENT
  // ==============================
  const loadClient = async () => {
    try {
      const id = getId();
      if (!id) return;

      const res = await fetch(`/api/clients/${id}`);
      const data = await res.json();

      if (!res.ok || data.success === false) return;

      const client = data.client;

      setForm({
        name: client?.name || "",
        review: client?.review || "",
        section: client?.section || "front",
      });

      setExistingImage(client?.image || "");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClient();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==============================
  // IMAGE HANDLING
  // ==============================
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // ==============================
  // UPDATE CLIENT
  // ==============================
  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const id = getId();
      if (!id) return;

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("review", form.review);
      formData.append("section", form.section);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Updated ✅");
        router.push("/admin/clients");
      } else {
        alert(data.message || "Failed ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Edit Client
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form
            onSubmit={submit}
            className="grid md:grid-cols-[1.4fr_1fr] gap-10"
          >

            {/* LEFT */}
            <div className="space-y-6">

              <input
                name="name"
                value={form.name}
                onChange={change}
                placeholder="Client Name"
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="review"
                value={form.review}
                onChange={change}
                placeholder="Review"
                className="w-full border p-3 rounded-lg h-32"
              />

              <select
                name="section"
                value={form.section}
                onChange={change}
                className="w-full border p-3 rounded-lg"
              >
                <option value="front">Front</option>
                <option value="back">Back</option>
              </select>

              <input
                type="file"
                onChange={handleImage}
                className="w-full border p-2 rounded-lg"
              />

            </div>

            {/* RIGHT - IMAGE PREVIEW */}
            <div className="space-y-4">

              <h3 className="font-semibold text-gray-700">
                Image Preview
              </h3>

              {preview ? (
                <img
                  src={preview}
                  className="w-40 h-28 object-cover rounded"
                />
              ) : existingImage ? (
                <img
                  src={existingImage}
                  className="w-40 h-28 object-cover rounded"
                />
              ) : (
                <p className="text-gray-400">No image</p>
              )}

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-4 col-span-2">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                Update
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/clients")}
                className="bg-gray-300 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}