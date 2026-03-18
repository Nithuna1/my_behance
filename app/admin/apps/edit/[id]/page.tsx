"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditApp() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    title: "",
    fullDescription: "",
    features: "",
    bestFor: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ GET ID
  const getId = () => {
    if (!params?.id) return null;
    return Array.isArray(params.id) ? params.id[0] : params.id;
  };

  // ✅ LOAD DATA
  const loadApp = async () => {
    try {
      const id = getId();
      if (!id) return;

      const res = await fetch(`/api/apps/${id}`);
      const data = await res.json();

      if (!res.ok || !data._id) return;

      setForm({
        title: data.title || "",
        fullDescription: data.fullDescription || "",
        features: data.features?.join(", ") || "",
        bestFor: data.bestFor || "",
      });

      setExistingImage(data.image || "");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApp();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  // ✅ UPDATE
  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const id = getId();
      if (!id) return;

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("fullDescription", form.fullDescription);
      formData.append("bestFor", form.bestFor);

      // convert features string → array
      formData.append(
        "features",
        JSON.stringify(form.features.split(",").map((f) => f.trim()))
      );

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`/api/apps/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Updated ✅");
        router.push("/admin/apps");
      } else {
        alert(data.message || "Failed ❌");
      }

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Edit App
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
 <form
  onSubmit={submit}
  className="grid md:grid-cols-[1.4fr_1fr] gap-12"
>

            {/* LEFT */}
            <div className="space-y-6">

              <div>
                <label className="text-sm text-gray-600">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  className="w-full mt-1 border p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  name="fullDescription"
                  value={form.fullDescription}
                  onChange={change}
                  className="w-full mt-1 border p-3 rounded-lg h-32"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Features (comma separated)
                </label>
                <input
                  name="features"
                  value={form.features}
                  onChange={change}
                  className="w-full mt-1 border p-3 rounded-lg"
                />
              </div>

              <input
                name="bestFor"
                value={form.bestFor}
                onChange={change}
                placeholder="Best For"
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="file"
                onChange={handleImage}
                className="w-full border p-2 rounded-lg"
              />

            </div><br></br>

            {/* RIGHT - IMAGE */}
<div className="space-y-4 ml-8 flex flex-col items-start">

  <h3 className="font-semibold text-gray-700">
    Image Preview
  </h3>

  {existingImage ? (
    <div className="w-36 h-24 border rounded-lg overflow-hidden shadow-sm">
      <img
        src={existingImage}
        className="w-full h-full object-cover"
      />
    </div>
  ) : (
    <p className="text-gray-400">No image</p>
  )}

</div>

 {/* BUTTONS */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/admin/apps")}
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