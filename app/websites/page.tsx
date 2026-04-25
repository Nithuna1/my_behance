"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMail, FiPlus, FiMessageCircle, FiChevronLeft, FiExternalLink, FiGlobe, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function WebsitePage() {
  const [fabOpen, setFabOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [websites, setWebsites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    try {
      const res = await fetch("/api/websites");
      const data = await res.json();
      if (Array.isArray(data)) {
        setWebsites(data);
      } else if (data.websites) {
        setWebsites(data.websites);
      } else {
        setWebsites([]);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden text-black bg-[#fafafa] selection:bg-blue-100">
      
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm mb-6 animate-fadeIn">
            <FiGlobe className="text-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-black/60">Digital Presence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fadeUp">
            Bespoke <span className="text-blue-600">Websites</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed animate-fadeUp delay-150">
            We design and develop high-performing websites that combine strong visual identity, intuitive user experience, and modern technology.
          </p>
        </div>
      </section>

      {/* NAVBAR */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between py-4 md:py-6">
            <Link href="/" className="text-xl font-bold tracking-tight">Matamix</Link>
            
            {/* Desktop Navbar */}
            <div className="hidden md:flex gap-8 text-sm font-medium">
              <Link href="/" className="text-black/50 hover:text-black transition">Work</Link>
              <Link href="/websites" className="text-blue-600">Websites</Link>
              <Link href="/services" className="text-black/50 hover:text-black transition">Services</Link>
              <Link href="/projects" className="text-black/50 hover:text-black transition">Projects</Link>
              <Link href="/posters" className="text-black/50 hover:text-black transition">Posters</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-black/60"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`w-full h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}></span>
                <span className={`w-full h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-[65px] bg-white z-50 p-6 animate-fadeIn">
            <div className="flex flex-col gap-6 text-xl font-semibold">
              <Link href="/" onClick={() => setMenuOpen(false)}>Work</Link>
              <Link href="/websites" className="text-blue-600" onClick={() => setMenuOpen(false)}>Websites</Link>
              <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
              <Link href="/posters" onClick={() => setMenuOpen(false)}>Posters</Link>
            </div>
          </div>
        )}
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Modern UI / UX", desc: "Clean, intuitive, and user-focused interfaces." },
              { title: "Performance", desc: "Fast loading, SEO-ready, and scalable builds." },
              { title: "Responsive", desc: "Seamless experience across all devices." },
              { title: "Business-Driven", desc: "Designed to convert visitors into customers." }
            ].map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600 font-bold">
                  {i + 1}
                </div>
                <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEBSITES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h3 className="text-2xl font-bold mb-10 text-center md:text-left">Selected Works</h3>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-black/40 font-medium">Loading gallery...</p>
          </div>
        ) : websites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/5 shadow-sm">
            <p className="text-black/40 text-lg">No websites featured yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {websites.map((site, i) => (
              <a
                key={site._id || i}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group premium-card bg-white border border-black/5 shadow-sm rounded-[2rem] overflow-hidden flex flex-col h-full animate-reveal"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={site.image && site.image.startsWith("http") ? site.image : "/no-image.png"}
                    alt={site.name || "Website"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {site.video && (
                    <video
                      src={site.video}
                      muted loop autoPlay playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  {/* EXPLORE OVERLAY */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold shadow-xl">
                      Explore Site →
                    </div>
                  </div>
                </div>

                <div className="p-6 flex justify-between items-center border-t border-black/5">
                  <span className="font-bold tracking-tight">{site.name}</span>
                  <FiExternalLink className="text-black/30 group-hover:text-blue-600 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-black/5 pt-20 pb-10 px-6">
        <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-black text-white text-center relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-blue-900 rounded-full blur-3xl opacity-30" />
          
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Start a project with us</h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto">
              Ready to elevate your digital presence? We're excited to hear about your vision.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:+919605000694" className="flex items-center gap-2 hover:text-blue-400 transition">
                📞 <span className="font-bold">+91 9605 000 694</span>
              </a>
              <a href="mailto:info@matamix.com" className="flex items-center gap-2 hover:text-blue-400 transition">
                ✉️ <span className="font-bold text-sm">info@matamix.com</span>
              </a>
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/10">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition">
                <FiChevronLeft /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* CONTACT MODAL */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden p-8 animate-popup">
            <button onClick={() => setContactOpen(false)} className="absolute top-6 right-6 text-black/40 hover:text-black transition">
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
            <div className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full bg-gray-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" className="w-full bg-gray-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full bg-gray-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none" />
              <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" className="w-full bg-gray-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none" />
              <button
                disabled={!name || !email || !phone || !message}
                onClick={() => {
                  const subject = "Contact Inquiry – Matamix";
                  const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
                  window.location.href = `mailto:sales@matamix.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:bg-gray-200 disabled:text-gray-400"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          {fabOpen && (
            <div className="flex flex-col gap-4 mb-4 items-center animate-fadeIn">
              <button onClick={() => { window.open(`https://wa.me/919605000694?text=Hello Matamix`, "_blank"); }} className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition">
                <FaWhatsapp size={24} />
              </button>
              <button onClick={() => { window.open("mailto:sales@matamix.com", "_blank"); }} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition border border-black/5">
                <FiMail size={24} />
              </button>
              <button onClick={() => setContactOpen(true)} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition border border-black/5">
                <FiMessageCircle size={24} />
              </button>
            </div>
          )}
          <button
            onClick={() => setFabOpen(!fabOpen)}
            className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition"
          >
            <FiPlus size={28} className={`transition-transform duration-300 ${fabOpen ? "rotate-45" : ""}`} />
          </button>
        </div>
      </div>

    </div>
  );
}
