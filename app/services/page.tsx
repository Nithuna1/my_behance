"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail, FiX } from "react-icons/fi";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"

/* ================= TYPES ================= */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  description: string;
  websites?: string[];
  videos?: string[]; 
};

export default function ServicePage() {
   const [fabOpen, setFabOpen] = useState(false);
  const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(132215);
const [contactOpen, setContactOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [phone, setPhone] = useState("");


  const [activeService, setActiveService] = useState<Service | null>(null);

  const services: Service[] = [

     {
  title: "E-Commerce Solutions",
  tags: ["Shopify", "Online Store", "Payments"],
  images: [
    "/services/commerce1.webp",
    "/services/commerce.jpeg",
    "/services/commerce2.jpg",
    "/services/commerce4.webp",
    "/services/commerce5.webp",
    "/services/commerce6.png",
  ],
  videos: [
    "/video/alrayyan_video.mp4",
    "/video/flipkart_video.mp4",
    "/video/myntra_video.mp4",
    "/video/amazon_video.mp4",
    "/video/ajio_video.mp4",
    "/video/tac_video.mp4",
  ],
  websites: [
    "https://amg-ecommerce-web.vercel.app/",
    "https://www.flipkart.com",
    "https://www.myntra.com",
    "https://www.amazon.in",
    "https://www.ajio.com",
    "https://www.tatacliq.com",
  ],
      description:
        "Our E-Commerce Solutions are designed to help businesses launch, scale, and optimize high-performing online stores that convert visitors into loyal customers. We specialize in building secure, fast, and user-friendly e-commerce platforms tailored to your business model, whether you are a startup, a growing brand, or an enterprise. From intuitive product catalogs and seamless checkout experiences to secure payment gateway integration and inventory management, we ensure every touchpoint is optimized for performance and usability. With scalable architecture, mobile-first design, SEO optimization, and ongoing performance enhancements, we help businesses grow revenue and improve customer retention.",
    },
    {
  title: "Ui/Ux Design",
  tags: ["Prototyping", "User Flows", "Product UX"],
  images: [
    "/services/web1.avif",
    "/services/web2.avif",
    "/services/web3.jpg",
  ],
  videos: [
    "/video/figma_video.mp4",
    "/video/dribble_video.mp4",
    "/video/awards_video.mp4",
  ],
  websites: [
    "https://www.figma.com/proto/eNSvJGp6L4vK8asm2EPF2z/vishnu2?node-id=618-3502&p=f&t=7SQAgsDcqi6PHJjj-0",
    "https://dribbble.com",
    "https://www.awwwards.com",
  ],
  description:
    "Our UI/UX Design services focus on creating intuitive, engaging, and user-centered digital experiences that align with both business objectives and user needs. Through research, wireframing, interactive prototyping, and usability testing, we design interfaces that are efficient, visually compelling, and conversion-driven. By combining modern design systems and responsive layouts, we deliver scalable UI/UX solutions that enhance usability and strengthen brand perception across web and mobile platforms.",
},
    {
  title: "Digital Marketing",
  tags: ["SEO Strategy", "Social Ads", "Analytics"],
  images: [
    "/services/digital1.avif",
    "/services/digital2.jpg",
    "/services/marketing.jpg",
    "/services/market.avif",
  ],
  videos: [
    "/video/soocher_video.mp4",
    "/video/amalgamate_video.mp4",
    "/video/knot_video.mp4",
    "/video/laundry_video.mp4",
  ],
  websites: [
    "https://www.instagram.com/soocherapp?igsh=cWhibjVrYjBicHVq",
    "https://www.instagram.com/amalgamate_technology?igsh=MWtoOTBhZXltYWgwaQ==",
    "https://www.instagram.com/knot_perfumes?igsh=MTNrazBjcXF4YnN3cg==",
    "https://www.instagram.com/laundryhubkasargod?igsh=dWo2MTJ3a2p6Njg=",
  ],
      description:
        "Our Digital Marketing services help businesses increase visibility, attract the right audience, and convert traffic into measurable growth. We develop data-driven strategies combining SEO, paid advertising, and social media marketing to maximize reach and ROI. Using advanced analytics and continuous optimization, we scale campaigns that generate quality leads and sustainable business growth.",
    },
    {
  title: "Video Production",
  tags: ["Corporate Videos", "Product Shoots", "Brand Films"],
  images: [
    "/services/video1.jpg",
    "/services/video2.jpg",
    "/services/video3.avif",
    "/services/video2.jpg",
    "/services/video1.jpg",
    "/services/video3.avif",
  ],
  videos: [
    "/video/intro_video.mp4",
    "/video/marketing_video.mp4",
    "/video/memory_video.mp4",
    "/video/team_video.mp4",
    "/video/company_video.mp4",
    "/video/title_video.mp4",
  ],
  websites: [
    "https://www.instagram.com/matamix_international/",
    "https://www.instagram.com/matamix_international/",
    "https://www.instagram.com/matamix_international/",
    "https://www.instagram.com/matamix_international/",
    "https://www.instagram.com/matamix_international/",
    "https://www.instagram.com/matamix_international/",
  ],
      description:
        "Our Video Production services bring your brand story to life through high-quality, cinematic visual content. From corporate films and product showcases to promotional campaigns and social media reels, we handle the complete production process — scripting, storyboarding, shooting, editing, and post-production. With professional equipment, creative direction, and strategic storytelling, we create compelling videos that engage audiences, strengthen brand identity, and drive measurable results across digital platforms.",
    },
    
 {
  title: "Mobile App Development",
  tags: ["iOS", "Android", "App UI/UX"],
  images: [
    "/services/app.jpg",
    "/services/mobile1.jpg",
    "/services/mobile2.jpg",
    "/services/mobile3.jpg",
  ],

  videos: [
    "/video/dribble_video.mp4",
    "/video/flipkart_video.mp4",
    "/video/domain_video.mp4",
    "/video/alrayyan_video.mp4",
  ],

  websites: [
    "https://play.google.com/store",
    "https://apps.apple.com",
    "https://flutter.dev/showcase",
    "https://reactnative.dev/showcase",
  ],

  description:
    "We design and develop high-performance mobile applications that deliver seamless, user-centric experiences across iOS and Android platforms. From concept validation and UX design to scalable development and performance optimization, our apps are built for reliability, security, and growth. We focus on intuitive navigation, smooth interactions, and robust architecture to help businesses engage users, drive retention, and scale confidently.",
},
   {
  title: "Web Development",
  tags: ["Frontend", "Backend", "Responsive Design"],
  images: [
    "/services/develop1.jpg",
    "/services/web.avif",
    "/services/develop2.avif",
    "/services/develop3.avif",
  ],

  videos: [
    "/video/awards_video.mp4",
    "/video/business_video.mp4",
    "/video/intro_video.mp4",
    "/video/ads_video.mp4",
  ],

  websites: [
    "https://www.apple.com",
    "https://www.airbnb.com",
    "https://www.spotify.com",
    "https://www.shopify.com",
  ],

  description:
    "We build fast, secure, and scalable websites tailored to your business objectives. Our web development process combines clean code, responsive design, and modern technologies to deliver high-performance websites that work seamlessly across all devices. From custom development and CMS integration to performance optimization and SEO readiness, we create websites that are reliable, easy to manage, and built for long-term growth.",
},

  ];

  return (
   <div
  className="
    min-h-screen
    w-full
    overflow-x-hidden
    text-black
    bg-white
  "
>
   
   
   
       {/* ================= COVER ================= */}
       <section className="relative">
         <div
         className="
           relative 
           sm:h-[280px]
           md:h-[340px]
           lg:h-[380px]
           w-full
           mx-8 md:mx-0
         "
       >
       
           <Image
         src="/projects/the_profile.jpeg"
         alt="Cover"
         width={1600}
         height={400}
         priority
         className="
         max-w-full
         h-full
         object-cover
         scale-110
         -translate-x-6
         md:scale-100
         md:translate-x-0
       "
       />
       
         </div>
       </section>
       
       
       
       
          {/* ================= PROFILE STRIP ================= */}
       <section className="relative pt-16 bg-transparent">
         <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-8">
       
           {/* LOGO */}
           <div
             className="
               relative
               -mt-22 md:-mt-30
               w-12 h-12 md:w-24 md:h-24
               rounded-full overflow-hidden
               border-[3px] md:border-[5px]
               border-white
             "
           >
             <Image
               src="/projects/logo.jpg"
               alt="Matamix"
               fill
               className="object-cover"
               priority
             />
           </div>
       
           <h1 className="text-3xl font-semibold mt-4">
             Matamix International
           </h1>
       
         </div>
       </section>
       
   
    

    {/* ================= NAVBAR (DESKTOP ONLY) ================= */}
<section className="hidden md:block border-b border-black/10 bg-transparent">
  <div className="max-w-7xl mx-auto px-8">
    <div className="flex gap-8 py-6 text-sm">

      <Link
        href="/"
         className="text-black/50 hover:text-black pb-2"
      >
        Work
      </Link>

      <Link
        href="/websites"
        className="text-black/50 hover:text-black pb-2"
      >
        Websites
      </Link>

      <Link
        href="/services"
       className="font-semibold border-b-2 border-black pb-2"
      >
        Services
      </Link>

      <Link
        href="/projects"
        className="text-black/50 hover:text-black pb-2"
      >
        Projects
      </Link>

      <Link
        href="/posters"
        className="text-black/50 hover:text-black pb-2"
      >
        Posters
      </Link>

      <Link
        href="/applications"
        className="text-black/50 hover:text-black pb-2"
      >
        Applications
      </Link>

    </div>
  </div>
</section>


      {/* ================= ABOUT SERVICES ================= */}

<section className="py-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    {/* HEADING */}
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
      Our Services
    </h2>

    {/* DESCRIPTION */}
    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-4">
      We offer comprehensive digital services designed to help businesses grow,
      adapt, and succeed in an ever-evolving digital landscape. Our approach
      combines strategy, creativity, and technology to deliver solutions that
      are not only visually compelling but also highly functional and scalable.
    </p>

    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-6">
      From brand identity and UI/UX design to web development, mobile
      applications, and digital marketing, we focus on building experiences that
      connect with users and drive measurable business results. Every service we
      deliver is guided by research, usability, and performance — ensuring long-term
      value rather than short-term impact.
    </p>

    {/* HIGHLIGHTS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Strategy-Driven</p>
        <p className="text-black/80">
          Every project starts with clear goals, research, and planning.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">User-Centric Design</p>
        <p className="text-black/80">
          Interfaces crafted for clarity, usability, and engagement.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Scalable Development</p>
        <p className="text-black/80">
          Robust solutions built to grow with your business.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Performance Focused</p>
        <p className="text-black/80">
          Optimized for speed, reliability, and measurable results.
        </p>
      </div>

    </div>

  </div>
</section>

 {/* ================= MAIN GRID ================= */}
     <section className="
  max-w-7xl mx-auto
  px-4 md:px-8
  py-6
  grid grid-cols-1
  gap-6
">


        

        {/* ================= RIGHT CONTENT ================= */}
<main className="col-span-12">

  <h3 className="text-lg font-semibold mb-4">Services</h3>

          {/* ===== SERVICE CARDS (3 IMAGES ONLY) ===== */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {services.map((service, i) => (
              <div
                key={i}
                className="border border-black/20 rounded p-4 hover:border-black transition bg-white"
              >
                <div className="grid grid-cols-3 gap-1 mb-4">
                  {service.images.slice(0, 3).map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt=""
                      width={200}
                      height={200}
                      className="h-24 w-full object-cover rounded-md"
                    />
                  ))}
                </div>

                <h4 className="font-medium text-base mb-1">
                  {service.title}
                </h4>

                <p className="text-sm text-black/80 leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

                <button
                  onClick={() => setActiveService(service)}
                  className="w-full py-2 rounded-full bg-black/5 hover:bg-black/10 text-sm font-medium transition"
                >
                  See More
                </button>
              </div>
            ))}
          </div>


 {/* ================= SERVICE POPUP ================= */}
{activeService && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setActiveService(null)}
    />

    {/* MODAL */}
    <div
      className="
        relative
        bg-white
        w-full
        max-w-6xl
        rounded-2xl
        p-8
        max-h-[90vh]
        overflow-y-auto
      "
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setActiveService(null)}
        className="absolute top-5 right-5 text-xl hover:scale-110 transition"
      >
        <FiX />
      </button>

      {/* TITLE */}
      <h2 className="text-2xl font-semibold mb-6">
        {activeService.title}
      </h2>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {activeService.images.map((img, i) => {

          const websiteLink = activeService.websites?.[i];
          const videoSrc = activeService.videos?.[i];

          const Card = (
            <div
              className={`
                relative
                w-full
                rounded-xl
                overflow-hidden
                group
                cursor-pointer
                transition
                ${
                  activeService.title === "Digital Marketing"
                    ? "aspect-[3/4]"   // ✅ Vertical rectangle
                    : "h-[240px]"      // ✅ Normal size
                }
              `}
            >

              {/* IMAGE */}
              <Image
                src={img}
                alt="Service Preview"
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              {/* VIDEO */}
              {videoSrc && (
                <video
                  src={videoSrc}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    opacity-0
                    group-hover:opacity-100
                    transition duration-500
                  "
                />
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500" />

              {/* VISIT BUTTON */}
              {websiteLink && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                 <span className="bg-white text-blue-600 text-sm px-4 py-2 rounded-full font-medium shadow-md hover:bg-gray-800 transition">
  Explore Site
</span>
                </div>
              )}

            </div>
          );

          return (
            <div key={i}>
              {websiteLink ? (
                <a
                  href={websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Card}
                </a>
              ) : (
                Card
              )}
            </div>
          );
        })}

      </div>

    </div>
  </div>
)}

</main>

{contactOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    {/* MODAL */}
    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl">

      {/* CLOSE */}
      <button
        onClick={() => setContactOpen(false)}
        className="absolute top-4 right-4 text-black/40 hover:text-black text-xl"
      >
        ✕
      </button>

      <div className="p-8 space-y-5">

        <h2 className="text-xl font-semibold">
          Contact Matamix International
        </h2>

        {/* NAME */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />

        {/* PHONE */}
<input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="Your phone number"
  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
/>


        {/* MESSAGE */}
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your requirement..."
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />

        {/* SEND MAIL */}
        <button
  disabled={!name || !email || !phone || !message}
  onClick={() => {
    if (!name || !email || !phone || !message) return;

    const subject = "Contact Inquiry – Matamix International";
    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `;

    window.location.href =
      `mailto:sales@matamix.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }}
  className={`
    w-full py-3 rounded-full font-medium transition
    ${
      !name || !email || !phone || !message
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }
  `}
>
  Send Message
</button>

        {/* HELPER TEXT */}
       {(!name || !email || !phone || !message) && (
  <p className="text-xs text-red-500 text-center">
    Please fill all fields to send the message
  </p>
)}


      </div>
    </div>
  </div>
)}


      </section>

      {/* ================= FOOTER ================= */}
<footer className="bg-[#022549] text-white mt-4">
  <div className="max-w-7xl mx-auto px-6 py-8 flex justify-center">

    <div
      className="
        inline-flex flex-col items-center gap-2
        px-7 py-4 rounded-xl
        bg-white/10 backdrop-blur
        border border-white/20
        shadow-md
      "
    >
     {/* PHONE */}
<p className="text-sm font-medium text-white">
  📞{" "}
  <a
    href="tel:+91 9605 000 694"
    className="hover:underline"
  >
    +91 9605 000 694
  </a>
</p>


      {/* EMAIL */}
      <p className="text-sm font-medium">
        ✉️{" "}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=info@matamix.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          info@matamix.com
        </a>
      </p>
    </div>

  </div>
</footer>


{/* ================= FLOATING ACTION BUTTON ================= */}
<div className="fixed bottom-8 right-8 z-50">

  <div className="relative w-16 h-16">

    {/* EXPANDED BUTTONS */}
    {fabOpen && (
  <>
    {/* WhatsApp - Top */}
    <button
      onClick={() => {
        const msg =
          "Hello Matamix International,%0A%0AI would like to know more about your services.";
        window.open(
          `https://wa.me/919605000694?text=${msg}`,
          "_blank"
        );
      }}
      className="
        absolute bottom-24 right-2
        w-12 h-12 rounded-full
        bg-green-500 text-white
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        hover:scale-110
      "
    >
      <FaWhatsapp size={20} />
    </button>

    {/* Email - Middle */}
    <button
      onClick={() => {
        window.open(
          "https://mail.google.com/mail/?view=cm&fs=1&to=sales@matamix.com",
          "_blank"
        );
      }}
      className="
        absolute bottom-18 right-20
        w-12 h-12 rounded-full
        bg-white text-black
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        hover:scale-110
      "
    >
      <FiMail size={20} />
    </button>

    {/* Contact - Lower */}
    <button
      onClick={() => setContactOpen(true)}
      className="
        absolute bottom-4 right-28
        w-12 h-12 rounded-full
        bg-white text-black
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        hover:scale-110
      "
    >
      <FiMessageCircle size={20} />
    </button>
  </>
)}

    {/* MAIN PLUS BUTTON */}
    <button
      onClick={() => setFabOpen(!fabOpen)}
      className="
        w-14 h-14
        rounded-full
        bg-blue-600
        text-white
        flex items-center justify-center
        shadow-xl
        transition-transform duration-300
        hover:scale-110
      "
    >
      <FiPlus
        size={26}
        className={`transition-transform duration-300 ${
          fabOpen ? "rotate-45" : ""
        }`}
      />
    </button>

  </div>
</div>

    </div>
  );
}
