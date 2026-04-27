"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiType, FiAlignLeft, FiImage, FiCpu, FiStar, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave, FiPlus, FiX } from "react-icons/fi";

export default function AddApp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    fullDescription: "",
    features: [""],
    bestFor: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [primaryIndex, setPrimaryIndex] = useState(0);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages((prev) => [...prev, ...files]);
    if (images.length === 0 && files.length > 0) {
      setPrimaryIndex(0);
    }
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (index === primaryIndex) {
      setPrimaryIndex(0);
    } else if (index < primaryIndex) {
      setPrimaryIndex((prev) => prev - 1);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm({ ...form, features: updated });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ""] });
  };

  const removeFeature = (index: number) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (!form.title || images.length === 0) {
        alert("Please provide at least a title and one image.");
        return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("fullDescription", form.fullDescription);
    formData.append("bestFor", form.bestFor);

    const featuresArray = form.features.filter((f) => f.trim() !== "");
    formData.append("features", JSON.stringify(featuresArray));

    images.forEach((img) => {
      formData.append("images", img);
    });
    formData.append("primaryIndex", primaryIndex.toString());

    try {
        const res = await fetch("/api/apps", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/apps");
        } else {
          alert("Failed to save app ❌");
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
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <Link 
            href="/admin/apps" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Apps
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Deploy New <span className="text-blue-600">Application</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT: INFO, FEATURES, GALLERY */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* CORE INFO */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                   <FiType size={20} />
                </div>
                <h2 className="font-bold text-gray-800">General Information</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  App Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="e.g. Creative Cloud Suite"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Full Description
                </label>
                <textarea
                  name="fullDescription"
                  value={form.fullDescription}
                  onChange={change}
                  placeholder="Explain the app's purpose and functionality..."
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none h-40 resize-none"
                />
              </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <FiCpu size={20} />
                    </div>
                    <h2 className="font-bold text-gray-800">Core Features</h2>
                </div>
                <button 
                  type="button" 
                  onClick={addFeature}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition"
                >
                  <FiPlus size={12} /> Add Feature
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {form.features.map((feature, i) => (
                  <div key={i} className="group relative">
                    <input
                      value={feature}
                      onChange={(e) => handleFeatureChange(i, e.target.value)}
                      placeholder={`Key Feature ${i + 1}`}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none pr-10"
                    />
                    {form.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-50 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition"
                      >
                        <FiX size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* GALLERY SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3 pb-6 border-b border-gray-50 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <FiImage size={20} />
                  </div>
                  <h2 className="font-bold text-gray-800">App Showcase</h2>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Click an image to set primary</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, i) => {
                  const preview = URL.createObjectURL(img);
                  return (
                    <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 cursor-pointer">
                      <img 
                        src={preview} 
                        onClick={() => setPrimaryIndex(i)}
                        className={`w-full h-full object-cover transition duration-300 ${i === primaryIndex ? 'opacity-100' : 'opacity-60 grayscale-[50%] hover:grayscale-0 hover:opacity-100'}`} 
                        onLoad={() => URL.revokeObjectURL(preview)} 
                      />
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
                         <button 
                           type="button" 
                           onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                           className="w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white shadow-sm transition"
                         >
                           <FiTrash2 size={14} />
                         </button>
                      </div>
                      {i === primaryIndex && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-blue-600/30">
                          Primary
                        </div>
                      )}
                    </div>
                  );
                })}
                
                <label className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition group">
                  <FiUploadCloud size={24} className="text-gray-300 group-hover:text-blue-500 transition" />
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-wider">Add Asset</span>
                  <input type="file" multiple onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: METADATA & ACTIONS */}
          <div className="space-y-6">
            
            {/* TARGETING CARD */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                   <FiStar size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Classification</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Best For
                </label>
                <input
                  name="bestFor"
                  value={form.bestFor}
                  onChange={change}
                  placeholder="e.g. Enterprises, Startups"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
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
                        <span>Save Application</span>
                    </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/apps")}
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