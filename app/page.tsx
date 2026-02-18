"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiX } from "react-icons/fi";
import FollowButton from "./components/FollowButton";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import PostersSection from "./components/PostersSection";



/* ✅ ADD TYPE (required for popup) */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  description: string;
  websites?: string[];
  videos?: string[]; // ✅ ADD THIS
};


type Project = {
  title: string;
  author: string;
  image: string;
  likes: number;
  views: number;
  year: string;
  category: string;
  description: string;
  gallery: string[];
};

type MobileApp = {
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  bestFor: string;
};



export default function Home() {
  const [fabOpen, setFabOpen] = useState(false);
  const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(132215);
const [contactOpen, setContactOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [phone, setPhone] = useState("");
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);




  /* ✅ ADD STATE */
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeMobileApp, setActiveMobileApp] = useState<MobileApp | null>(null);
  const [activeSet, setActiveSet] = useState<string | null>(null);



   /* ================= PROJECT DATA ================= */
  const projects: Project[] = [
    {
      title: "AMBER",
      author: "Matamix",
      image: "/projects/amb2.jpg",
      likes: 29,
      views: 276,
      year: "2024",
      category: "POS Software Solution",
      description:
        "AMBER POS Software is an advanced point-of-sale solution designed to boost business efficiency and streamline daily operations. It enables seamless sales management and accurate inventory tracking while providing real-time reporting and analytics to help businesses make informed decisions. The system includes robust customer management with integrated loyalty programs, ensuring stronger customer engagement and retention. With secure payment processing, quick billing, and easy invoicing, AMBER simplifies transactions at every touchpoint. Automated daily sales reports further enhance control and visibility, making AMBER a reliable and scalable POS solution for modern businesses looking to optimize performance and growth.",
      gallery: [
        "/projects/machine.jpg",
        "/projects/machine1.jpg",
      ],
    },
    {
      title: "GOZZBE",
      author: "Matamix",
      image: "/projects/gooz.jpg",
      likes: 112,
      views: 1340,
      year: "2023",
      category: "Laundry Management Software",
      description:
        "Gozzbe is a smart, end-to-end digital solution designed to modernize and simplify laundry business operations. Built for laundromats, dry cleaners, and laundry service providers, Gozzbe seamlessly connects customers and businesses through an intuitive mobile app and a powerful web-based management dashboard. Customers can easily place orders, track laundry status, and manage pickups or deliveries, while business owners gain full control over orders, inventory, pricing, and workflow in real time. With automated order tracking, customer management, service categorization, and data-driven insights, Gozzbe reduces manual effort, minimizes errors, and improves turnaround time.",
      gallery: [
        "/projects/laundry.jpg",
        "/projects/laundry1.jpg",
      ],
    },
    {
      title: "ZOOMIE",
      author: "Matamix",
      image: "/projects/zoom.jpg",
      likes: 87,
      views: 980,
      year: "2024",
      category: "Restaurant POS System",
      description:
        "Zoomie is an intelligent, all-in-one restaurant and hospitality POS solution designed to help businesses turn tables faster and operate smarter. Built specifically for cafés, restaurants, and food service environments, Zoomie streamlines order taking, billing, and kitchen coordination with a fast, intuitive interface that reduces wait times and improves service efficiency. Its visually rich menu system, seamless order management, and real-time synchronization between front-of-house and kitchen ensure accuracy and speed at every stage of service. Combined with powerful reporting, inventory control, and flexible payment handling, Zoomie empowers restaurant owners and staff to deliver a smoother dining experience, maximize productivity, and increase revenue — all while maintaining complete operational control.",
      gallery: [
        "/projects/hotel.jpg",
        "/projects/hotel1.jpg",
      ],
    },
    {
      title: "AMALGAMATE",
      author: "Matamix",
      image: "/projects/new _amalgamate.jpg",
      likes: 64,
      views: 720,
      year: "2023",
      category: "Custom Mobile App Solutions",
      description:
        "Amalgamate Technology’s Mobile Application Development services are designed to help businesses transform their digital presence and succeed in today’s mobile-first world. We build high-performance, user-centric mobile applications that combine intuitive design with robust functionality, ensuring seamless experiences across devices and platforms. From concept and UI/UX design to development, testing, and deployment, our solutions are fully customized to meet specific business goals and user needs. By leveraging modern technologies, data-driven insights, and continuous optimization, we create scalable mobile apps that enhance user engagement, streamline operations, and drive measurable growth.",
      gallery: [
        "/projects/new _amalgamate.jpg",
        "/projects/user.png",
      ],
    },
    {
      title: "AMBER",
      author: "Matamix",
      image: "/projects/amb1.jpg",
      likes: 64,
      views: 720,
      year: "2023",
      category: "ERP Inventory Management",
      description:
        "AMBER’s Stock Ageing Reports provide businesses with real-time visibility into inventory movement, helping them manage stock more intelligently and efficiently. By clearly identifying slow-moving and ageing items, the system enables businesses to take timely actions such as replenishment adjustments, promotions, or stock clearance to reduce wastage. With accurate insights into inventory levels, AMBER helps optimize purchasing decisions, prevent overstocking or shortages, and improve overall cash flow. The automated reporting and data-driven analysis empower decision-makers to maintain healthier inventory cycles, minimize losses, and ensure that working capital is used effectively. Designed as part of AMBER’s powerful ERP solution, stock ageing reports transform inventory management from guesswork into a strategic, controlled process.",
      gallery: [
        "/projects/amber_new.jpg",
      ],
    },
    {
      title: "DOSO",
      author: "Matamix",
      image: "/projects/doso.jpg",
      likes: 45,
      views: 560,
      year: "2022",
      category: "Enterprise ERP Software",
      description:
        "DOSO Enterprise ERP Software Solutions are designed to streamline, integrate, and optimize core business operations through a robust and scalable digital platform. Built to support growing and enterprise-level organizations, DOSO centralizes critical functions such as finance, inventory, operations, human resources, and reporting into a single, unified system. With real-time data visibility and intelligent dashboards, businesses gain better control over processes, improve decision-making, and enhance operational efficiency. The flexible, modular architecture allows organizations to customize the ERP according to their unique workflows while ensuring seamless integration across departments. Secure, scalable, and performance-driven, DOSO empowers businesses to reduce complexity, improve productivity, and build a strong foundation for long-term digital transformation.",
      gallery: [
        "/projects/disc2.jpg",
        "/projects/solutions.jpg",
      ],
    },
  ];

  const mobileApps: MobileApp[] = [
  {
    title: "Business ERP App",
    image: "/mobile/home.png",
    shortDescription:
      "A complete ERP mobile solution to manage sales, purchases, expenses, and real-time business analytics.",
    fullDescription:
      "The Business ERP App is an all-in-one mobile platform designed to give business owners complete control over operations from anywhere. It centralizes sales, purchases, expenses, banking, and performance analytics into a single, intuitive dashboard. With real-time updates and clear financial insights, businesses can make faster, data-driven decisions and maintain full operational visibility.",
    features: [
      "Real-time sales, purchase, and expense tracking",
      "Cash and bank balance monitoring",
      "Profit calculation and revenue growth indicators",
      "Date-based reports (Today, Yesterday, Custom)",
      "Multi-shop and branch support",
    ],
    bestFor:
      "Retail stores, distributors, wholesalers, and businesses that need a complete ERP system on mobile.",
  },

  {
    title: "Shop Management App",
    image: "/mobile/shop.png",
    shortDescription:
      "Mobile-first shop management app to track daily revenue, branch performance, and inventory.",
    fullDescription:
      "The Shop Management App simplifies daily shop operations by providing a clear overview of sales, expenses, and purchases. Designed for speed and clarity, it allows shop owners and managers to quickly assess performance, monitor cash flow, and manage multiple branches without complexity.",
    features: [
      "Daily sales and purchase summaries",
      "Expense tracking with profit calculation",
      "Branch-wise and head-office views",
      "Quick shop selection and filtering",
      "Clean UI optimized for fast decisions",
    ],
    bestFor:
      "Single-store and multi-branch shop owners who want fast insights into daily operations.",
  },

  {
    title: "Accounting & Finance App",
    image: "/mobile/analytics.png",
    shortDescription:
      "Smart accounting application with cash book, day book, profit analysis, and balance insights.",
    fullDescription:
      "The Accounting & Finance App is built for accurate financial control and transparency. It provides structured views of cash sales, bank transactions, credit activity, and account balances. With integrated cash book and day book features, users can maintain clean financial records and reduce manual accounting effort.",
    features: [
      "Cash sales, bank sales, and credit sales tracking",
      "Cash book and day book access",
      "Credit purchase and account summaries",
      "Bank account balance monitoring",
      "Clear financial breakdowns in real time",
    ],
    bestFor:
      "Accountants, finance teams, and business owners who need precise financial tracking.",
  },

  {
    title: "Analytics Dashboard App",
    image: "/mobile/trade1.png",
    shortDescription:
      "Advanced analytics dashboard offering business insights, growth tracking, and performance reports.",
    fullDescription:
      "The Analytics Dashboard App transforms raw business data into actionable insights. It provides visual reports on performance, profitability, and growth trends, helping decision-makers understand what’s working and where improvements are needed. The app integrates seamlessly with ERP systems for automated insights.",
    features: [
      "Business and branch performance analysis",
      "Profit and loss insights",
      "Balance sheet and financial reports",
      "Growth comparison with previous periods",
      "ERP automation and reporting highlights",
    ],
    bestFor:
      "Business owners, managers, and decision-makers who rely on data-driven insights.",
  },
];


  return (
  <div
  className="
    min-h-screen
    w-full
    overflow-x-hidden  
    text-black
    bg-gradient-to-br
    from-[#1e293b]
    via-[#e0e7ff]
    to-[#ffffff]
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
        className="font-semibold border-b-2 border-black pb-2"
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
        className="text-black/50 hover:text-black pb-2"
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


      {/* ================= ABOUT ================= */}
<section className="relative py-6 md:py-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-6 md:gap-12 items-center">

    {/* LEFT – TEXT */}
    <div>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
        We build digital products <br />
        that grow businesses
      </h2>

      <p className="text-black/100 leading-relaxed mb-6 max-w-xl">
        Matamix International is a digital-first technology company specializing
        in UI/UX design, web development, mobile applications, ERP solutions,
        and digital marketing. We work with startups, enterprises, and growing
        brands to design and build scalable digital experiences that deliver
        real business impact.
      </p>

      <p className="text-black/100 leading-relaxed mb-8 max-w-xl">
        From strategy and design to development and deployment, our approach is
        focused on clarity, performance, and long-term value. Every solution we
        create is driven by user needs, data insights, and modern technology.
      </p>

      <Link href="/clients"
        className="
          inline-flex items-center gap-2
          px-8 py-3 rounded-full
          bg-blue-600 text-white font-medium
          hover:bg-blue-700
          transition
          shadow-[0_12px_30px_rgba(37,99,235,0.35)]
        "
      >
        Our Happy Customers →
      </Link>
    </div>

    {/* RIGHT – STATS / HIGHLIGHTS */}
    <div className="grid grid-cols-2 gap-6">

      <div className="rounded-2xl bg-white/60 backdrop-blur-md p-6 border border-black/10">
        <h3 className="text-3xl font-semibold mb-1">20+</h3>
        <p className="text-sm text-black/70">Projects Delivered</p>
      </div>

      <div className="rounded-2xl bg-white/60 backdrop-blur-md p-6 border border-black/10">
        <h3 className="text-3xl font-semibold mb-1">5+</h3>
        <p className="text-sm text-black/70">Years Experience</p>
      </div>

      <div className="rounded-2xl bg-white/60 backdrop-blur-md p-6 border border-black/10">
        <h3 className="text-3xl font-semibold mb-1">30+</h3>
        <p className="text-sm text-black/70">Active Clients</p>
      </div>

      <div className="rounded-2xl bg-white/60 backdrop-blur-md p-6 border border-black/10">
        <h3 className="text-3xl font-semibold mb-1">100%</h3>
        <p className="text-sm text-black/70">Client Satisfaction</p>
      </div>

    </div>
  </div>
</section>


      {/* ================= MAIN ================= */}
     <section className="
  max-w-7xl mx-auto
  px-4 md:px-8
 py-4 md:py-6 grid grid-cols-1 gap-6 md:gap-10
">


        {/* ================= RIGHT CONTENT ================= */}
        <main className="col-span-12">

          {/* ================= OUR WEBSITES ================= */}
<section className="mt-4">
  <h3 className="text-lg font-semibold mb-5">Websites</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

    {[
      {
        name: "www.matamix.com",
        url: "https://matamix.com",
        image: "/projects/collage.jpg",
        video: "/video/matamix_video.mp4",
      },
      {
        name: "www.vitara.com",
        url: "https://nithuna1.github.io/vitara/index.html",
        image: "/services/business.jpg",
        video: "/video/vitara_video.mp4",
      },
      {
        name: "www.domain.com",
        url: "https://www.domainnow.com",
        image: "/services/digital2.jpg",
        video: "/video/domain_video.mp4",
      },
    ].map((site, i) => (
      <a
        key={i}
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {/* IMAGE CONTAINER */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-black">

          {/* STATIC IMAGE */}
          <Image
            src={site.image}
            alt={site.name}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />

          {/* VIDEO PREVIEW */}
          {site.video && (
            <video
              src={site.video}
              muted
              loop
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
            />
          )}

        </div>

        {/* TEXT */}
        <div className="mt-3 flex justify-between items-center text-sm px-1">
          <span className="font-medium truncate">
            {site.name}
          </span>
          <span className="text-black/40 group-hover:text-black transition">
            ↗
          </span>
        </div>
      </a>
    ))}

  </div>

  {/* VIEW MORE BUTTON */}
  <div className="flex justify-center mt-6">
    <Link
      href="/websites"
      className="
        px-8 py-3 rounded-full
        border border-black/40
        text-sm font-medium text-black
        hover:bg-blue-600 hover:border-blue-600 hover:text-white
        transition
      "
    >
      View More
    </Link>
  </div>
</section>




 {/* SERVICES */}
<h3 className="text-lg font-semibold mb-6">Services</h3>

<div className="grid md:grid-cols-3 gap-6 mb-8">
  {[
  {
  title: "E-Commerce Solutions",
  tags: ["Shopify", "Online Store", "Payments"],
  images: [
    "/services/commerce1.webp",
    "/services/commerce.jpeg",
    "/services/commerce2.jpg",
    "/services/commerce1.webp",
    "/services/commerce.jpeg",
    "/services/commerce2.jpg",
  ],
  videos: [
    "/video/alrayyan_video.mp4",
    "/video/flipkart_video.mp4",
    "/video/myntra_video.mp4",
    "/video/alrayyan_video.mp4",
    "/video/flipkart_video.mp4",
    "/video/myntra_video.mp4",
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
    "/video/dribble_video.mp4",
    "/video/behance_video.mp4",
    "/video/awards_video.mp4",
  ],
  websites: [
    "https://dribbble.com",
    "https://behance.net",
    "https://www.awwwards.com",
  ],
  description:
    "Our UI/UX Design services focus on creating intuitive, engaging, and user-centered digital experiences that align with both business objectives and user needs. Through research, wireframing, interactive prototyping, and usability testing, we design interfaces that are efficient, visually compelling, and conversion-driven. By combining modern design systems and responsive layouts, we deliver scalable UI/UX solutions that enhance usability and strengthen brand perception across web and mobile platforms.",
}
,
    {
  title: "Digital Marketing",
  tags: ["SEO Strategy", "Social Ads", "Analytics"],
  images: [
    "/services/digital1.avif",
    "/services/digital2.jpg",
    "/services/marketing.jpg",
  ],
  videos: [
    "/video/analyitics_video.mp4",
    "/video/ads_video.mp4",
    "/video/business_video.mp4",
  ],
  websites: [
    "https://analytics.google.com",
    "https://ads.google.com",
    "https://business.instagram.com",
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
  ],
  videos: [
    "/video/intro_video.mp4",
    "/video/marketing_video.mp4",
    "/video/memory_video.mp4",
  ],
  websites: [
    "https://www.instagram.com/matamix_international/",
    "https://www.instagram.com/matamix_international/",
    "https://www.instagram.com/matamix_international/",
  ],
      description:
        "Our Video Production services bring your brand story to life through high-quality, cinematic visual content. From corporate films and product showcases to promotional campaigns and social media reels, we handle the complete production process — scripting, storyboarding, shooting, editing, and post-production. With professional equipment, creative direction, and strategic storytelling, we create compelling videos that engage audiences, strengthen brand identity, and drive measurable results across digital platforms.",
    },
  ].map((service, i) => (
    <div
      key={i}
      onClick={() => setActiveService(service)}
      className="cursor-pointer border border-black/50 rounded-xl p-4 hover:border-black transition"
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

      <h4 className="font-medium mb-2">{service.title}</h4>

      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-1 rounded-full border border-black/20 text-black/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>


{/* ✅ ONE VIEW MORE BUTTON (FOR SERVICES PAGE) */}
<div className="flex justify-center">
  <Link
    href="/services"
    className="
      px-8 py-3
      rounded-full
      border border-black/40
      text-sm font-medium
      text-black
      hover:bg-blue-600
      hover:border-blue-600
      hover:text-white
      transition
    "
  >
    View More
  </Link>
</div>

{/* ================= SERVICE POPUP ================= */}
{activeService && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60"
      onClick={() => setActiveService(null)}
    />

    {/* MODAL */}
    <div
      className="
        relative
        bg-white
        w-full
        max-w-5xl
        rounded-2xl
        p-8
      "
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setActiveService(null)}
        className="absolute top-5 right-5 text-xl"
      >
        <FiX />
      </button>

      {/* IMAGE ROW */}
<div className="grid grid-cols-3 gap-6 mt-6">

  {(activeService.title === "Digital Marketing"
  ? activeService.images.slice(0, 3)
  : activeService.images
).map((img, i) => {

    const websiteLink = activeService.websites?.[i];
    const videoSrc = activeService.videos?.[i];

    return (
      <div key={i} className="flex flex-col items-center">

       <div
  className={`
    relative
    w-full
    rounded-xl
    overflow-hidden
    group
    ${
      activeService.title === "Digital Marketing"
        ? "aspect-[3/4]"   // 👈 Vertical rectangle
        : "h-[220px]"      // 👈 Normal size for others
    }
  `}
>

          {/* IMAGE */}
          <Image
            src={img}
            alt="Service Image"
            fill
            className="object-cover group-hover:opacity-0 transition duration-300"
          />

          {/* VIDEO */}
          {videoSrc && (
            <video
              src={videoSrc}
              muted
              loop
              playsInline
              className="
                absolute inset-0
                w-full h-full
                object-cover
                opacity-0
                group-hover:opacity-100
                transition duration-300
              "
              autoPlay
            />
          )}
        </div>

       {/* WEBSITE LINK */}
{websiteLink && (
  <a
    href={websiteLink}
    target="_blank"
    rel="noopener noreferrer"
    className="
      mt-3
      text-xs sm:text-sm
      text-blue-600
      hover:underline
      break-all
      text-center
      max-w-full
    "
  >
    {websiteLink.replace("https://", "").replace("www.", "")}
  </a>
)}


      </div>
    );
  })}

</div>




    </div>
  </div>
)}




  {/* ================= PROJECT SECTION ================= */}
<h3 className="text-lg font-semibold mb-2">Projects</h3>

<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
  {projects.slice(0, 3).map((project, i) => (
   <div
  key={i}
  onClick={() => setActiveProject(project)}
  className="
    group relative cursor-pointer
    transition-transform duration-300
    hover:scale-[1.02]
  "
>
  {/* IMAGE */}
  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
    <Image
      src={project.image}
      alt={project.title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>

  {/* TEXT OVERLAY */}
  <div
    className="
      absolute inset-x-0 bottom-0
      px-4 py-3
      text-sm
      opacity-0 group-hover:opacity-100
      transition
    "
  >
    <p className="font-semibold text-black drop-shadow-md">
      {project.title}
    </p>
    <p className="text-xs text-black/70 drop-shadow-md">
      {project.author}
    </p>
  </div>
</div>

  ))}
</div><br />
{/* ✅ ONE VIEW MORE BUTTON (FOR SERVICES PAGE) */}
<div className="flex justify-center">
  <Link
    href="/projects"
    className="
      px-8 py-3
      rounded-full
      border border-black/40
      text-sm font-medium
      text-black
      hover:bg-blue-600
      hover:border-blue-600
      hover:text-white
      transition
    "
  >
    View More
  </Link>
</div>



<section className="mt-6">
 

  {/* ✅ POSTERS GRID */}
  <PostersSection />

 {/* VIEW MORE */}
    <div className="flex justify-center mt-5">
      <Link
        href="/posters"
        className="
          px-8 py-3 rounded-full
          border border-black/40
          text-sm font-medium text-black
          transition-all duration-500
          hover:bg-blue-600 hover:border-blue-600 hover:text-white
          hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)]
        "
      >
        View More
      </Link>
    </div>
</section>



{/* ================= MOBILE APPLICATIONS ================= */}
<section className="mt-10">
  <div className="max-w-[1600px] mx-auto px-4 md:px-6">

    {/* HEADING */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold">Mobile Applications</h3>
    </div>

    {/* ================= MOBILE SLIDER ================= */}
    <div className="relative md:hidden">

      {/* LEFT ARROW */}
      <button
        onClick={() =>
          document.getElementById("mobileSlider")?.scrollBy({
            left: -300,
            behavior: "smooth",
          })
        }
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                   bg-white shadow-md w-9 h-9 rounded-full 
                   flex items-center justify-center"
      >
        ←
      </button>

     
{/* SLIDER */}
<div
  id="mobileSlider"
  className="
    flex
    overflow-x-auto
    snap-x snap-mandatory
    pb-6
    no-scrollbar
    px-6
  "
>

  {mobileApps.map((app, i) => (
    <div
      key={i}
      onClick={() => setActiveMobileApp(app)}
      className="
        w-full
        flex
        justify-center
        snap-center
        flex-shrink-0
        cursor-pointer
      "
    >
      <div className="w-[350px]">
        <Image
          src={app.image}
          alt={app.title}
          width={1000}
          height={1900}
          className="
            w-full
            h-auto
            object-contain
            rounded-2xl
          "
        />
      </div>
    </div>
  ))}

</div>


      {/* RIGHT ARROW */}
      <button
        onClick={() =>
          document.getElementById("mobileSlider")?.scrollBy({
            left: 300,
            behavior: "smooth",
          })
        }
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                   bg-white shadow-md w-9 h-9 rounded-full 
                   flex items-center justify-center"
      >
        →
      </button>

    </div>

    {/* ================= DESKTOP GRID ================= */}
    <div className="hidden md:grid md:grid-cols-4 gap-6">
      {mobileApps.map((app, i) => (
        <div
          key={i}
          onClick={() => setActiveMobileApp(app)}
          className="cursor-pointer hover:-translate-y-3 transition"
        >
          <Image
            src={app.image}
            alt={app.title}
            width={900}
            height={1800}
            className="w-full h-auto object-contain"
          />
        </div>
      ))}
    </div>

  </div>
</section>

         
        {/* ================= WHATSAPP INTEREST CTA ================= */}
<section className="mt-2 mb-6">
  <div className="max-w-3xl mx-auto px-6 text-center">

    <h3 className="text-2xl font-semibold tracking-tight mb-2">
      Ready to explore a collaboration?
    </h3>

    <p className="text-black/70 mb-4 max-w-xl mx-auto">
      Let us know your interest and our team will reach out to discuss the next steps.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">

      {/* INTERESTED */}
      <button
        onClick={() => {
          const message =
            "Hello Matamix International,%0A%0AI am interested in your services and would like to connect for more details.";
          window.open(
            `https://wa.me/919605000694?text=${message}`,
            "_blank"
          );
        }}
        className="
          px-8 py-3 rounded-full
          bg-blue-600 text-white font-medium
          hover:bg-blue-800
          transition-all duration-300
          shadow-[0_10px_24px_rgba(37,99,235,0.30)]
        "
      >
        I’m Interested
      </button>

      {/* FOLLOW ON INSTAGRAM */}
      <a
        href="https://www.instagram.com/matamix_international/"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center justify-center
          px-8 py-3 rounded-full
          border border-blue-600
          text-blue-600 font-medium
          hover:bg-blue-600 hover:text-white
          transition-all duration-300
        "
      >
        Follow Us
      </a>

    </div>
  </div>
</section>

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


 {/* ================= PROJECT POPUP ================= */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div
  className="
    relative bg-white
    w-full
    max-w-5xl
    h-[90vh]
    rounded-2xl
    overflow-hidden
    flex
    flex-col md:flex-row
  "


            onClick={(e) => e.stopPropagation()}
          >
           {/* ✅ STRONG MOBILE CLOSE BUTTON */}
      <button
        onClick={() => setActiveProject(null)}
        className="
          absolute top-4 right-4
          z-20
          w-10 h-10
          rounded-full
          bg-white shadow-md
          flex items-center justify-center
          text-black
        "
      >
        <FiX size={22} />
      </button>

            {/* LEFT – GALLERY */}
            <div className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {activeProject.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT – DETAILS */}
            <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l p-4 md:p-6 overflow-y-auto">
  <h2 className="text-xl font-semibold mb-2">
    {activeProject.title}
  </h2>

  <p className="text-sm text-black/60 mb-4">
    {activeProject.category} · {activeProject.year}
  </p>

  <p className="text-sm leading-relaxed text-black/70">
    {activeProject.description}
  </p>
</div>

            </div>
          </div>

      )}

     {/* ================= MOBILE APPLICATION POPUP ================= */}
{activeMobileApp && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/70"
      onClick={() => setActiveMobileApp(null)}
    />

    {/* MODAL */}
    <div
  className="
    relative bg-white
    w-full
    max-w-6xl
    h-[90vh]
    rounded-2xl
    overflow-hidden
    flex
    flex-col md:flex-row
  "


      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE */}
      <button
        onClick={() => setActiveMobileApp(null)}
        className="absolute top-5 right-5 z-10
        text-xl text-black/60 hover:text-black"
      >
        <FiX />
      </button>

      {/* LEFT – APP PREVIEW */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">

        <Image
          src={activeMobileApp.image}
          alt={activeMobileApp.title}
          width={420}
          height={840}
          className="object-contain drop-shadow-xl"
        />
      </div>

      {/* RIGHT – DETAILS */}
     <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-3">
          {activeMobileApp.title}
        </h2>

        {/* SHORT DESCRIPTION */}
        <p className="text-sm text-black/60 mb-4">
          {activeMobileApp.shortDescription}
        </p>

        {/* FULL DESCRIPTION */}
        <p className="text-black/80 leading-relaxed mb-6">
          {activeMobileApp.fullDescription}
        </p>

        {/* FEATURES */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Key Features</h4>
          <ul className="space-y-2 text-sm text-black/80">
            {activeMobileApp.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* BEST FOR */}
        <div className="border-t pt-4">
          <p className="text-sm">
            <span className="font-semibold">Best For:</span>{" "}
            <span className="text-black/70">
              {activeMobileApp.bestFor}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
)}


{/* ================= MOBILE MENU OVERLAY ================= */}
{mobileMenuOpen && (
  <div className="fixed inset-0 z-50 bg-white md:hidden">

    {/* HEADER */}
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <span className="font-semibold text-lg">Menu</span>
      <button onClick={() => setMobileMenuOpen(false)}>
        <FiX size={26} />
      </button>
    </div>

    {/* LINKS */}
    <nav className="flex flex-col gap-6 px-6 py-10 text-lg font-medium">
      <Link href="/" onClick={() => setMobileMenuOpen(false)}>Work</Link>
      <Link href="/websites" onClick={() => setMobileMenuOpen(false)}>Websites</Link>
      <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
      <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
      <Link href="/posters" onClick={() => setMobileMenuOpen(false)}>Posters</Link>
      <Link href="/applications" onClick={() => setMobileMenuOpen(false)}>Applications</Link>
    </nav>

  </div>
)}


      </section>

    {/* ================= FOOTER ================= */}
<footer className="bg-[#022549] text-white mt-8">
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
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

  {/* EXPANDED BUTTONS */}
  {fabOpen && (
    <>
      {/* WhatsApp */}
      <button
        onClick={() => {
          const msg =
            "Hello Matamix International,%0A%0AI would like to know more about your services.";
          window.open(
            `https://wa.me/919605000694?text=${msg}`,
            "_blank"
          );
        }}
        className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <FaWhatsapp size={20} />
      </button>

     {/* Email */}
<button
  onClick={() => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=sales@matamix.com",
      "_blank"
    );
  }}
  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition"
>
  <FiMail size={20} />
</button>


      {/* Contact Modal */}
      <button
        onClick={() => setContactOpen(true)}
        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition"
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
  );
}



