import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EcommercePage() {

  const [items, setItems] = useState<any[]>([]);

useEffect(() => {
  loadEcommerce();
}, []);

const loadEcommerce = async () => {
  try {
    const res = await fetch("/api/ecommerce");
    const data = await res.json();

    console.log("ECOMMERCE:", data);

    if (Array.isArray(data)) {
      setItems(data);
    } else if (data.items) {
      setItems(data.items);
    } else {
      setItems([]);
    }
  } catch (err) {
    console.log("FETCH ERROR:", err);
  }
};


  return (
    <div className="min-h-screen bg-white py-16 px-6">

    <h1 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-10 text-center text-black">
  E-Commerce Solutions
</h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

       {items.map((item, i) => (
  <div
    key={item._id || i}
    className="relative h-56 rounded-xl overflow-hidden group"
  >

    {/* IMAGE */}
    <Image
      src={item.image || "/placeholder.jpg"}
      alt="Ecommerce"
      fill
      className="object-cover transition duration-500 group-hover:scale-110"
    />

    {/* VIDEO */}
    {item.video && (
      <video
        src={item.video}
        muted
        loop
        autoPlay
        playsInline
        className="
          absolute inset-0 w-full h-full object-cover
          opacity-100
          md:opacity-0 md:group-hover:opacity-100
          transition duration-500
        "
      />
    )}

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500" />

    {/* BUTTON */}
    {item.website && (
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
        <a
          href={item.website}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium shadow-lg hover:bg-black hover:text-white transition"
        >
          Explore Site →
        </a>
      </div>
    )}

  </div>
))}

      </div>

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-10">
        <Link
          href="/"
          className="px-6 py-2 rounded-full border border-gray-400 text-sm font-medium text-black hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
        >
          ← Back to Home
        </Link>
      </div>

    </div>
  );
}