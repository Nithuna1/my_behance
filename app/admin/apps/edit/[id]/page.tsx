"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FiType, FiAlignLeft, FiImage, FiCpu, FiStar, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave, FiPlus, FiX, FiInfo } from "react-icons/fi";

export default function EditApp() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    fullDescription: "",
    features: [""],
    bestFor: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const getId = () => {
    if (!params?.id) return null;
    return Array.isArray(params.id) ? params.id[0] : params.id;
  };

  const loadApp = async () => {
    try {
      const id = getId();
      if (!id) return;

      const res = await fetch(`/api/apps/${id}`);
      const data = await res.json();

      if (!res.ok || data.success === false) throw new Error("Failed to load");

      const app = data.app;
      setForm({
        title: app?.title || "",
        fullDescription: app?.fullDescription || "",
        features: app?.features?.length ? app.features : [""],
        bestFor: app?.bestFor || "",
      });

      setExistingImage(app?.image || "");
    } catch (err) {
      console.error(err);
      alert("Error loading application data.");
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

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const id = getId();
    if (!id) return;

    setUpdating(true);
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("fullDescription", form.fullDescription);
    formData.append("bestFor", form.bestFor);

    const featuresArray = form.features.filter((f) => f.trim() !== "");
    formData.append("features", JSON.stringify(featuresArray));

    if (image) {
      formData.append("image", image);
    }

    try {
        const res = await fetch(`/api/apps/${id}`, {
          method: "PUT",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/apps");
        } else {
          alert(data.message || "Failed to update ❌");
        }
    } catch (err) {
        console.error(err);
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
            href="/admin/apps" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Apps
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Edit <span className="text-blue-600">Application</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT: INFO, FEATURES, ASSET */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* CORE INFO */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                   <FiType size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Application Details</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  App Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="App Title"
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
                  placeholder="App Description"
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
                    <h2 className="font-bold text-gray-800">Feature Roadmap</h2>
                </div>
                <button 
                  type="button" 
                  onClick={addFeature}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition"
                >
                  <FiPlus size={12} /> Add Point
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {form.features.map((feature, i) => (
                  <div key={i} className="group relative">
                    <input
                      value={feature}
                      onChange={(e) => handleFeatureChange(i, e.target.value)}
                      placeholder={`Feature ${i + 1}`}
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

            {/* ASSET SECTION */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 pb-6 border-b border-gray-50 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <FiImage size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Application Mockup</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* PREVIEW */}
                <div className="relative group w-full sm:w-64 aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center">
                  {(preview || existingImage) ? (
                    <img 
                      src={preview || existingImage} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                      onLoad={() => preview && URL.revokeObjectURL(preview)} 
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                        <FiImage size={40} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">No Asset</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 w-full">
                   <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <div className="flex gap-2 text-blue-600 mb-1">
                         <FiInfo size={14} className="mt-0.5" />
                         <span className="text-xs font-bold uppercase tracking-wider">Asset Management</span>
                      </div>
                      <p className="text-[10px] text-blue-400 leading-relaxed font-medium">Choosing a new image will replace the current mockup on Cloudinary.</p>
                   </div>

                   <label className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition group">
                      <FiUploadCloud size={20} className="text-gray-300 group-hover:text-blue-500 transition" />
                      <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 transition">Replace Image</span>
                      <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                   </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: METADATA & ACTIONS */}
          <div className="space-y-6">
            
            {/* CLASSIFICATION CARD */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                   <FiStar size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Target Audience</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Best For
                </label>
                <input
                  name="bestFor"
                  value={form.bestFor}
                  onChange={change}
                  placeholder="e.g. Creative Professionals"
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
                        <span>Update Application</span>
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