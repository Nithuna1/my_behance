"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FiType, FiAlignLeft, FiImage, FiUser, FiCalendar, FiTag, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave, FiX, FiInfo } from "react-icons/fi";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const fileRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const getId = () => {
    if (!params?.id) return null;
    return Array.isArray(params.id) ? params.id[0] : params.id;
  };

  const loadProject = async () => {
    try {
      const id = getId();
      if (!id) return;

      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error("Project not found");
      }

      const project = data.project;

      setForm({
        title: project?.title || "",
        author: project?.author || "",
        year: project?.year || "",
        category: project?.category || "",
        description: project?.description || "",
      });

      setExistingImages(project?.gallery || []);
    } catch (err) {
      console.error("Error loading project:", err);
      alert("Failed to load project data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setImages((prev) => [...prev, ...files]);
  };

  const removeNewImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const id = getId();
    if (!id) return;

    setUpdating(true);
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
        const res = await fetch(`/api/projects/${id}`, {
          method: "PUT",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/projects");
        } else {
          alert(data.message || "Failed to update ❌");
        }
    } catch (err) {
        console.error("Update error:", err);
        alert("Something went wrong ❌");
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
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <Link 
            href="/admin/projects" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Edit <span className="text-blue-600">Project</span>
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
                  placeholder="Project Title"
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
                  placeholder="Project Description"
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
              </div>

              {/* GALLERY GRID */}
              <div className="space-y-8">
                
                {/* EXISTING IMAGES */}
                {existingImages.length > 0 && (
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                         <FiInfo size={12} /> Current Gallery
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {existingImages.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                            <img src={img} className="w-full h-full object-cover" />
                            {i === 0 && (
                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">Cover</div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
                         <FiInfo className="text-orange-400 shrink-0 mt-0.5" size={16} />
                         <p className="text-[10px] text-orange-600 leading-relaxed font-medium">Note: Uploading new images will replace the entire existing gallery on Cloudinary.</p>
                      </div>
                   </div>
                )}

                {/* NEW UPLOADS */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                     <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Uploads</div>
                     <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-blue-600 hover:text-white transition group">
                        <FiUploadCloud size={14} />
                        <span>Add Images</span>
                        <input ref={fileRef} type="file" multiple onChange={handleFileChange} className="hidden" />
                     </label>
                  </div>

                  {images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((img, i) => {
                        const preview = URL.createObjectURL(img);
                        return (
                            <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                            <img src={preview} className="w-full h-full object-cover" onLoad={() => URL.revokeObjectURL(preview)} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <button 
                                type="button" 
                                onClick={() => removeNewImage(i)}
                                className="w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                                >
                                <FiTrash2 size={14} />
                                </button>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-300">
                        <FiImage size={32} className="mb-2 opacity-20" />
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">No new images selected</p>
                    </div>
                  )}
                </div>
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
                  placeholder="Category"
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
                  placeholder="Author"
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
                  placeholder="Year"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
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
                        <span>Update Project</span>
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