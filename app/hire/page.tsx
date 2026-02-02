"use client";

import { useRouter } from "next/navigation";

export default function HirePage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-md rounded-2xl p-8">

        {/* Close */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-black/40 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">
          Sign in to message
        </h2>

        {/* SOCIAL LOGIN */}
        <div className="space-y-3">
          <button className="w-full border rounded-full py-2.5 flex items-center justify-center gap-2 hover:bg-black/5 transition">
            Continue with Google
          </button>

          <button className="w-full border rounded-full py-2.5 flex items-center justify-center gap-2 hover:bg-black/5 transition">
            Continue with Facebook
          </button>

          <button className="w-full border rounded-full py-2.5 flex items-center justify-center gap-2 hover:bg-black/5 transition">
            Continue with Apple
          </button>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-sm text-black/40">Or</span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        {/* EMAIL */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Continue with email</label>

          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button className="w-full bg-black text-white py-2.5 rounded-full font-medium hover:bg-black/90 transition">
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}
