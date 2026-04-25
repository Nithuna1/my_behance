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
    <div className="min-h-screen w-full overflow-x-hidden text-black bg-white selection:bg-blue-100">
      
      {/* ================= COVER ================= */}
      <section className="relative">
        <div className="relative sm:h-[280px] md:h-[340px] lg:h-[380px] w-full">
          <Image
            src="/projects/the_profile.jpeg"
            alt="Cover"
            width={1600}
            height={400}
            priority
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ================= PROFILE STRIP ================= */}
      <section className="relative pt-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-8">
          {/* LOGO */}
          <div className="relative -mt-22 md:-mt-30 w-12 h-12 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] md:border-[5px] border-white bg-white">
            <Image
              src="/projects/logo.jpg"
              alt="Matamix"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl font-semibold mt-4">Matamix International</h1>
        </div>
      </section>

      {/* ================= NAVBAR (DESKTOP ONLY) ================= */}
      <section className="hidden md:block border-b border-black/10 bg-transparent mt-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-8 py-6 text-sm">
            <Link href="/" className="text-black/50 hover:text-black pb-2 transition">Work</Link>
            <Link href="/websites" className="font-semibold border-b-2 border-black pb-2">Websites</Link>
            <Link href="/services" className="text-black/50 hover:text-black pb-2 transition">Services</Link>
            <Link href="/projects" className="text-black/50 hover:text-black pb-2 transition">Projects</Link>
            <Link href="/posters" className="text-black/50 hover:text-black pb-2 transition">Posters</Link>
          </div>
        </div>
      </section>

      {/* ================= MOBILE NAVBAR ================= */}
      <section className="md:hidden border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1">
            <span className={`w-6 h-[2px] bg-black transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`w-6 h-[2px] bg-black transition-opacity ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-[2px] bg-black transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </button>
        </div>
        {menuOpen && (
          <div className="flex flex-col px-4 pb-4 gap-3 text-sm animate-fadeIn">
            <Link href="/" onClick={() => setMenuOpen(false)}>Work</Link>
            <Link href="/websites" className="font-semibold" onClick={() => setMenuOpen(false)}>Websites</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
            <Link href="/posters" onClick={() => setMenuOpen(false)}>Posters</Link>
          </div>
        )}
      </section>

      {/* ================= ABOUT WEBSITES ================= */}
      <section className="py-16 bg-[#FAFAFC] border-y border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              Websites That Drive Results
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl mb-4 font-light">
              We design and develop high-performing websites that combine strong visual identity, intuitive user experience, and modern technology. Every website we build is tailored to reflect your brand and engage your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">
            {[
              { title: "Modern UI / UX", desc: "Clean, intuitive, and user-focused interfaces.", icon: <FiGlobe size={20} /> },
              { title: "Performance", desc: "Fast loading, SEO-ready, and scalable builds.", icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
              { title: "Responsive", desc: "Seamless experience across mobile, tablet, and desktop.", icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg> },
              { title: "Business-Driven", desc: "Designed to convert visitors into customers.", icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>
                <p className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</p>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WEBSITES GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h3 className="text-2xl font-semibold mb-8 text-gray-900 tracking-tight">Our Portfolio</h3>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-black/40 font-medium">Curating gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {websites.map((site, i) => (
              <a
                key={site._id || i}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={site.image && site.image.startsWith("http") ? site.image : "/no-image.png"}
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {site.video && (
                    <video
                      src={site.video}
                      muted loop autoPlay playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                    <span className="px-5 py-2 rounded-full bg-white text-blue-600 text-sm font-medium shadow-lg backdrop-blur-md">
                      Explore Site
                    </span>
                  </div>
                </div>
                <div className="p-6 flex justify-between items-center border-t border-black/5">
                  <span className="font-semibold text-gray-900 tracking-tight">{site.name}</span>
                  <FiExternalLink className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#022549] text-white pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl mb-12 max-w-lg w-full text-center">
            <h4 className="text-xl font-bold">Ready to start?</h4>
            <p className="text-white/60 text-sm">Let's build your next digital success story together.</p>
            <div className="flex flex-col gap-3 w-full">
              <a href="tel:+919605000694" className="flex items-center justify-center gap-2 hover:text-blue-400 transition">
                📞 <span className="font-bold">+91 9605 000 694</span>
              </a>
              <a href="mailto:info@matamix.com" className="flex items-center justify-center gap-2 hover:text-blue-400 transition">
                ✉️ <span className="font-bold">info@matamix.com</span>
              </a>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition">
            <FiChevronLeft /> Back to Home
          </Link>
          <p className="mt-8 text-xs text-white/30">© 2026 Matamix International. All rights reserved.</p>
        </div>
      </footer>

      {/* ================= FAB & CONTACT ================= */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 animate-popup">
            <button onClick={() => setContactOpen(false)} className="absolute top-6 right-6 text-black/40 hover:text-black transition">
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <div className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none" />
              <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your requirement..." className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none" />
              <button
                disabled={!name || !email || !phone || !message}
                onClick={() => {
                  const subject = "Contact Inquiry – Matamix";
                  const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
                  window.location.href = `mailto:sales@matamix.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
                className="w-full py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:bg-gray-200"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          {fabOpen && (
            <div className="flex flex-col gap-4 mb-4 items-center animate-fadeIn">
              <button onClick={() => window.open(`https://wa.me/919605000694?text=Hello`, "_blank")} className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition">
                <FaWhatsapp size={24} />
              </button>
              <button onClick={() => window.open("mailto:sales@matamix.com", "_blank")} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition border">
                <FiMail size={24} />
              </button>
              <button onClick={() => setContactOpen(true)} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition border">
                <FiMessageCircle size={24} />
              </button>
            </div>
          )}
          <button onClick={() => setFabOpen(!fabOpen)} className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition">
            <FiPlus size={28} className={`transition-transform duration-300 ${fabOpen ? "rotate-45" : ""}`} />
          </button>
        </div>
      </div>

    </div>
  );
}
