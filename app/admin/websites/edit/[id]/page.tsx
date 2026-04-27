"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FiGlobe, FiImage, FiVideo, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave, FiX, FiInfo } from "react-icons/fi";

export default function EditWebsite() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState({
    name: "",
    url: "",
    video: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getId = () => Array.isArray(params.id) ? params.id[0] : params.id;

  const loadWebsite = async () => {
    const id = getId();
    if (!id) return;

    try {
        const res = await fetch(`/api/websites/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to load");

        const website = data.website;
        setForm({
          name: website?.name || "",
          url: website?.url || "",
          video: website?.video || "",
        });

        setExistingImage(website?.image || "");
    } catch (err) {
        console.error(err);
        alert("Error loading website data.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadWebsite();
  }, []);

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleVideoFile = (e: any) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const id = getId();
    if (!id) return;

    setUpdating(true);
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("url", form.url);

    if (image) {
      formData.append("image", image);
    }

    if (videoFile) {
      formData.append("video", videoFile);
    } else {
      formData.append("video", form.video);
    }

    try {
        const res = await fetch(`/api/websites/${id}`, {
          method: "PUT",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/websites");
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
            href="/admin/websites" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Listings
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Edit <span className="text-blue-600">Website</span>
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

            {/* IMAGE SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 pb-6 border-b border-gray-50 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <FiImage size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Project Cover</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="relative group w-full sm:w-64 aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center">
                  {(preview || existingImage) ? (
                    <img 
                      src={preview || existingImage} 
                      className="w-full h-full object-cover" 
                      onLoad={() => preview && URL.revokeObjectURL(preview)} 
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                        <FiImage size={32} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 w-full">
                   <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <div className="flex gap-2 text-blue-600 mb-1">
                         <FiInfo size={14} className="mt-0.5" />
                         <span className="text-xs font-bold uppercase tracking-wider">Upload New</span>
                      </div>
                      <p className="text-[10px] text-blue-400 leading-relaxed font-medium">Selecting a new file will replace the current cover image on Cloudinary.</p>
                   </div>

                   <label className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition group">
                      <FiUploadCloud size={20} className="text-gray-300 group-hover:text-blue-500 transition" />
                      <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 transition">Browse Files</span>
                      <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                   </label>
                </div>
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
                <h2 className="font-bold text-gray-800">Project Video</h2>
              </div>

              <div className="space-y-4">
                {(videoFile || form.video) ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                         <FiVideo size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-gray-800 truncate">{videoFile ? videoFile.name : "Current Video"}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold">
                           {videoFile ? `${(videoFile.size / (1024 * 1024)).toFixed(2)} MB` : "Cloudinary Link"}
                        </p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setVideoFile(null); if(!videoFile) setForm({...form, video: ""}); }}
                        className="ml-auto w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-4 py-8 border-2 border-dashed border-gray-200 rounded-2xl hover:border-orange-400 hover:bg-orange-50/50 cursor-pointer transition group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-orange-100 group-hover:text-orange-600 transition">
                       <FiVideo size={24} />
                    </div>
                    <div className="text-center text-gray-400">
                      <p className="text-[10px] font-bold uppercase tracking-widest">Update Video</p>
                    </div>
                    <input type="file" accept="video/*" onChange={handleVideoFile} className="hidden" />
                  </label>
                )}
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
                        <span>Update Website</span>
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