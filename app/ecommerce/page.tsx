"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiShoppingBag } from "react-icons/fi";

export default function EcommercePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch("/api/services?category=ecommerce");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to load ecommerce items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black selection:bg-blue-100">
      
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm mb-6 animate-fadeIn">
            <FiShoppingBag className="text-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-black/60">Our Expertise</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fadeUp">
            E-Commerce <span className="text-blue-600">Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed animate-fadeUp delay-150">
            We build high-converting online stores that blend stunning aesthetics with seamless functionality. From Shopify to custom platforms, we scale your business.
          </p>
        </div>
      </section>

      {/* ITEMS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-black/40 font-medium">Curating projects...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/5 shadow-sm">
            <p className="text-black/40 text-lg">No ecommerce solutions featured yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {items.map((item, i) => {
              const image = item.images?.[0];
              const video = item.videos?.[0];
              const website = item.websites?.[0];

              return (
                <div
                  key={item._id || i}
                  className="group premium-card bg-white border border-black/5 shadow-sm rounded-[2rem] overflow-hidden flex flex-col h-full animate-reveal"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* MEDIA CONTAINER */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* IMAGE */}
                    {image && (
                      <img
                        src={image}
                        alt={item.title || "Ecommerce Project"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* VIDEO HOVER */}
                    {video && (
                      <video
                        src={video}
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}

                    {/* OVERLAY ON HOVER */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* TAG */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                      {item.category || "Project"}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title || "Premium Store Design"}
                    </h3>
                    <p className="text-sm text-black/50 leading-relaxed mb-6 line-clamp-2">
                      {item.description || "Comprehensive e-commerce strategy, design and development for modern retail brands."}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                      {website ? (
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 group/link"
                        >
                          Explore Project
                          <FiExternalLink className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </a>
                      ) : (
                        <span className="text-xs font-medium text-black/30 italic">Details coming soon</span>
                      )}
                      
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((s) => (
                          <div key={s} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white shadow-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER CTA / BACK BUTTON */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-white border border-black/5 shadow-xl text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
          
          <div className="relative">
            <h2 className="text-3xl font-bold mb-4">Ready to start your project?</h2>
            <p className="text-black/60 mb-10 max-w-lg mx-auto">
              Our team is ready to help you build the next big thing in e-commerce.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-bold transition hover:bg-blue-600 hover:shadow-lg active:scale-95"
              >
                <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
              
              <Link
                href="/hire"
                className="px-8 py-4 rounded-full border border-black/10 font-bold hover:bg-white hover:border-black/20 hover:shadow-md transition active:scale-95"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}