"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FiUser, FiGlobe, FiImage, FiLayers, FiArrowLeft, FiUploadCloud, FiTrash2, FiSave, FiInfo } from "react-icons/fi";

export default function EditClient() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    website: "",
    showOnHome: false,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const getId = () => {
    if (!params?.id) return null;
    return Array.isArray(params.id) ? params.id[0] : params.id;
  };

  const loadClient = async () => {
    try {
      const id = getId();
      if (!id) return;

      const res = await fetch(`/api/clients/${id}`);
      const data = await res.json();

      if (!res.ok || data.success === false) throw new Error("Failed to load");

      const client = data.client;
      setForm({
        name: client?.name || "",
        website: client?.website || "",
        showOnHome: client?.showOnHome || false,
      });

      setExistingImage(client?.image || "");
    } catch (err) {
      console.error(err);
      alert("Error loading client data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClient();
  }, []);

  const change = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
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
    formData.append("name", form.name);
    formData.append("website", form.website);
    formData.append("showOnHome", form.showOnHome.toString());

    if (image) {
      formData.append("image", image);
    }

    try {
        const res = await fetch(`/api/clients/${id}`, {
          method: "PUT",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/clients");
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
            href="/admin/clients" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-2"
          >
            <FiArrowLeft /> Back to Clients
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Edit <span className="text-blue-600">Client</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT: IDENTITY, WEBSITE & LOGO */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* CORE INFO */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                   <FiUser size={20} />
                </div>
                <h2 className="font-bold text-gray-800">Client Information</h2>
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
                  placeholder="Client Name"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
              </div>

              {/* WEBSITE */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Website URL
                </label>
                <input
                  name="website"
                  value={form.website}
                  onChange={change}
                  placeholder="https://client-link.com"
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
                <h2 className="font-bold text-gray-800">Company Logo</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* PREVIEW */}
                <div className="relative group w-full sm:w-48 aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center">
                  {(preview || existingImage) ? (
                    <img 
                      src={preview || existingImage} 
                      className="w-full h-full object-contain p-4 transition duration-500 group-hover:scale-105" 
                      onLoad={() => preview && URL.revokeObjectURL(preview)} 
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                        <FiImage size={40} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">No Logo</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 w-full">
                   <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <div className="flex gap-2 text-blue-600 mb-1">
                         <FiInfo size={14} className="mt-0.5" />
                         <span className="text-xs font-bold uppercase tracking-wider">Asset Management</span>
                      </div>
                      <p className="text-[10px] text-blue-400 leading-relaxed font-medium">Uploading a new logo will replace the current company asset on Cloudinary.</p>
                   </div>

                   <label className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition group">
                      <FiUploadCloud size={20} className="text-gray-300 group-hover:text-blue-500 transition" />
                      <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 transition">Replace Logo</span>
                      <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                   </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: PLACEMENT & ACTIONS */}
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
                disabled={updating}
                className="w-full bg-[#1e293b] text-white font-bold py-4 rounded-2xl shadow-lg shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {updating ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <FiSave />
                        <span>Update Client</span>
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