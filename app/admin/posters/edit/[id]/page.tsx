"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FiType, FiImage, FiTag, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave, FiInfo } from "react-icons/fi";

export default function EditPoster() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    title: "",
    category: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getId = () => Array.isArray(params.id) ? params.id[0] : params.id;

  const loadPoster = async () => {
    const id = getId();
    if (!id) return;

    try {
        const res = await fetch(`/api/posters/${id}`);
        const data = await res.json();

        if (!res.ok || !data.success) throw new Error("Failed to load");

        const poster = data.poster;
        setForm({
          title: poster?.title || "",
          category: poster?.category || "",
        });

        setExistingImage(poster?.image || "");
    } catch (err) {
        console.error(err);
        alert("Error loading poster data.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadPoster();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const id = getId();
    if (!id) return;

    setUpdating(true);
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);

    if (image) {
      formData.append("image", image);
    }

    try {
        const res = await fetch(`/api/posters/${id}`, {
          method: "PUT",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/posters");
        } else {
          alert(data.message || "Failed to update ❌");
        }
    } catch (error) {
        console.error("Update Error:", error);
        alert("An error occurred during update.");
    } finally {
        setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      
      {/* BACK BUTTON & HEADER */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <Link 
            href="/admin/posters" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Posters
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Edit <span className="text-blue-600">Poster</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT: TITLE & IMAGE */}
          <div className="md:col-span-2 space-y-6">
            
            {/* BASIC INFO */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                   <FiType size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Poster Content</h2>
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Poster Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="Poster Title"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* IMAGE SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 pb-6 border-b border-gray-50 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <FiImage size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Poster Graphic</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* PREVIEW BOX */}
                <div className="relative group w-full sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center">
                  {(preview || existingImage) ? (
                    <img 
                      src={preview || existingImage} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                      onLoad={() => preview && URL.revokeObjectURL(preview)} 
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                        <FiImage size={40} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 w-full">
                   <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <div className="flex gap-2 text-blue-600 mb-1">
                         <FiInfo size={14} className="mt-0.5" />
                         <span className="text-xs font-bold uppercase tracking-wider">Replace Asset</span>
                      </div>
                      <p className="text-[10px] text-blue-400 leading-relaxed font-medium">Choosing a new file will update the primary poster graphic across the site.</p>
                   </div>

                   <label className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition group">
                      <FiUploadCloud size={20} className="text-gray-300 group-hover:text-blue-500 transition" />
                      <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 transition">Upload New</span>
                      <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                   </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: CATEGORY & ACTIONS */}
          <div className="space-y-6">
            
            {/* CATEGORY CARD */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                   <FiTag size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Organization</h2>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Category
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={change}
                  placeholder="Category"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                  required
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={updating}
                className="w-full bg-[#1e293b] text-white font-bold py-4 rounded-2xl shadow-lg shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {updating ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <FiSave />
                        <span>Update Poster</span>
                    </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/posters")}
                className="w-full bg-white text-gray-400 font-bold py-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}