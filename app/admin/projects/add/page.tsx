"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiType, FiAlignLeft, FiImage, FiUser, FiCalendar, FiTag, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave, FiX } from "react-icons/fi";

export default function AddProject() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    description: "",
  });

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
    if (!form.title || !form.category) {
        alert("Please fill in the project title and category.");
        return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("year", form.year);
    formData.append("category", form.category);
    formData.append("description", form.description);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
        const res = await fetch("/api/projects", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/projects");
        } else {
          alert("Failed to save project ❌");
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
            href="/admin/projects" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create New <span className="text-blue-600">Project</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT: TITLE, DESCRIPTION, GALLERY */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* CORE DETAILS */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                   <FiType size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Content Details</h2>
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Project Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="Enter a captivating title..."
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={change}
                  placeholder="What makes this project special?"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none h-40 resize-none"
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
                <span className="text-[10px] font-bold text-gray-400 uppercase">First image is the primary cover</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, i) => {
                  const preview = URL.createObjectURL(img);
                  return (
                    <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
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
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-blue-600/30">
                          Primary
                        </div>
                      )}
                    </div>
                  );
                })}
                
                <label className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition group">
                  <FiUploadCloud size={24} className="text-gray-300 group-hover:text-blue-500 transition" />
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-wider">Add Image</span>
                  <input ref={fileRef} type="file" multiple onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: METADATA & ACTIONS */}
          <div className="space-y-6">
            
            {/* METADATA CARD */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                   <FiTag size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Metadata</h2>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <FiTag size={12} /> Category
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={change}
                  placeholder="e.g. Branding, UI/UX"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
              </div>

              {/* AUTHOR */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <FiUser size={12} /> Author
                </label>
                <input
                  name="author"
                  value={form.author}
                  onChange={change}
                  placeholder="Who created this?"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>

              {/* YEAR */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <FiCalendar size={12} /> Project Year
                </label>
                <input
                  name="year"
                  value={form.year}
                  onChange={change}
                  placeholder="e.g. 2024"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
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
                        <span>Save Project</span>
                    </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/projects")}
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