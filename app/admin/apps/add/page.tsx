"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddApp() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    fullDescription: "",
    features: "",
    bestFor: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages(files);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("fullDescription", form.fullDescription);
    formData.append("bestFor", form.bestFor);

    // ✅ features array
    const featuresArray = form.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f !== "");

    formData.append("features", JSON.stringify(featuresArray));

    // ✅ images
    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch("/api/apps", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("App Saved ✅");
      router.push("/admin/apps");
    } else {
      alert("Failed ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Add App
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl">

        <form onSubmit={submit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              App Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              App Images
            </label>

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block"
            />

            <p className="text-sm text-gray-500 mt-1">
              First image will be used as main image
            </p>

            {/* PREVIEW */}
            <div className="flex gap-3 mt-3 flex-wrap">
              {images.map((img, i) => {
                const preview = URL.createObjectURL(img);

                return (
                  <div key={i} className="relative">

                    <img
                      src={preview}
                      className={`h-24 w-24 object-cover rounded border ${
                        i === 0 ? "ring-2 ring-blue-500" : ""
                      }`}
                      onLoad={() => URL.revokeObjectURL(preview)}
                    />

                    {/* REMOVE */}
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, index) => index !== i))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ✕
                    </button>

                  </div>
                );
              })}
            </div>
          </div>

          {/* FEATURES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Features (comma separated)
            </label>
            <input
              name="features"
              value={form.features}
              onChange={change}
              placeholder="Login, Dashboard, Analytics"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* BEST FOR */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Best For
            </label>
            <input
              name="bestFor"
              value={form.bestFor}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              Save App
            </button>

             <button
              type="button"
              onClick={() => router.push("/admin/apps")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}