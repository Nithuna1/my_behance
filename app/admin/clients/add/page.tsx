"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiGlobe, FiImage, FiLayers, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave } from "react-icons/fi";

export default function AddClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    website: "",
    showOnHome: false,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const change = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !image) {
        alert("Please provide the client name and a logo image.");
        return;
    }

    setLoading(true);
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("website", form.website);
    fd.append("showOnHome", form.showOnHome.toString());
    fd.append("image", image);

    try {
        const res = await fetch("/api/clients", {
          method: "POST",
          body: fd,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/clients");
        } else {
          alert("Failed to save client ❌");
        }
    } catch (error) {
        console.error("Submit Error:", error);
        alert("An error occurred. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      
      {/* BACK BUTTON & HEADER */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <Link 
            href="/admin/clients" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Clients
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Add New <span className="text-blue-600">Client</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT: NAME, WEBSITE & LOGO */}
          <div className="md:col-span-2 space-y-6">
            
            {/* BASIC INFO */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                   <FiUser size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Client Identity</h2>
              </div>

              {/* NAME */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Client Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={change}
                  placeholder="e.g. Acme Corporation"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
              </div>

              {/* WEBSITE */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Website Link
                </label>
                <input
                  name="website"
                  value={form.website}
                  onChange={change}
                  placeholder="https://client-site.com"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                />
              </div>
            </div>

            {/* LOGO SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 pb-6 border-b border-gray-50 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <FiImage size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Client Logo</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* PREVIEW BOX */}
                <div className="relative group w-full sm:w-48 aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center">
                  {preview ? (
                    <img src={preview} className="w-full h-full object-contain p-4" onLoad={() => URL.revokeObjectURL(preview)} />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                        <FiImage size={32} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">No Logo</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 w-full">
                   <label className="flex flex-col items-center justify-center gap-3 w-full py-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition group">
                      <FiUploadCloud size={28} className="text-gray-300 group-hover:text-blue-500 transition" />
                      <div className="text-center">
                        <p className="text-xs font-bold text-gray-500 group-hover:text-blue-600 transition uppercase tracking-widest">Select Image</p>
                        <p className="text-[10px] text-gray-300 mt-1 uppercase">PNG, JPG or SVG</p>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                   </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: SECTION & ACTIONS */}
          <div className="space-y-6">
            
            {/* PLACEMENT CARD */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                   <FiLayers size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Placement</h2>
              </div>



              {/* SHOW ON HOME SELECT */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer mt-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    name="showOnHome"
                    checked={form.showOnHome}
                    onChange={change}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Show on Main Clients Page (Max 6)
                  </span>
                </label>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e293b] text-white font-bold py-4 rounded-2xl shadow-lg shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <FiSave />
                        <span>Save Client</span>
                    </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/clients")}
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