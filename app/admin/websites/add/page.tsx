"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiGlobe, FiImage, FiVideo, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave, FiX } from "react-icons/fi";

export default function AddWebsite() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    url: "",
  });

  const [video, setVideo] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.url) {
        alert("Please fill in the website name and URL.");
        return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("url", form.url);
    if (video) {
      formData.append("video", video);
    }

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
        const res = await fetch("/api/websites", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/websites");
        } else {
          alert("Failed to save website ❌");
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
            href="/admin/websites" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Listings
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Add New <span className="text-blue-600">Website</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT: BASIC INFO */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                   <FiGlobe size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Basic Information</h2>
              </div>

              {/* NAME */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Website Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={change}
                  placeholder="e.g. My Creative Portfolio"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Website URL
                </label>
                <input
                  name="url"
                  value={form.url}
                  onChange={change}
                  placeholder="https://example.com"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                  required
                />
              </div>
            </div>

            {/* IMAGES SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3 pb-6 border-b border-gray-50 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <FiImage size={20} />
                  </div>
                  <h2 className="font-bold text-gray-800">Project Gallery</h2>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">First image is used as thumbnail</span>
              </div>

              {/* IMAGE UPLOAD GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img, i) => {
                  const preview = URL.createObjectURL(img);
                  return (
                    <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <img src={preview} className="w-full h-full object-cover" onLoad={() => URL.revokeObjectURL(preview)} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                         <button 
                           type="button" 
                           onClick={() => removeImage(i)}
                           className="w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                         >
                           <FiTrash2 size={14} />
                         </button>
                      </div>
                      {i === 0 && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                          Thumbnail
                        </div>
                      )}
                    </div>
                  );
                })}
                
                <label className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition group">
                  <FiUploadCloud size={24} className="text-gray-300 group-hover:text-blue-500 transition" />
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-wider">Add Image</span>
                  <input type="file" multiple onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: VIDEO & SUBMIT */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                   <FiVideo size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Featured Video</h2>
              </div>

              <div className="space-y-4">
                {video ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                         <FiVideo size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-gray-800 truncate">{video.name}</p>
                        <p className="text-[10px] text-gray-400">{(video.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setVideo(null)}
                        className="ml-auto w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-4 py-8 border-2 border-dashed border-gray-200 rounded-2xl hover:border-orange-400 hover:bg-orange-50/50 cursor-pointer transition group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-orange-100 group-hover:text-orange-600 transition">
                       <FiVideo size={24} />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Video</p>
                      <p className="text-[9px] text-gray-300 mt-1">MP4, WEBM (Max 50MB)</p>
                    </div>
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={(e) => setVideo(e.target.files?.[0] || null)} 
                      className="hidden" 
                    />
                  </label>
                )}
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
                        <span>Save Website</span>
                    </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/websites")}
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
