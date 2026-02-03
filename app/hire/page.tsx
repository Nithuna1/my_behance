"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HirePage() {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [hireType, setHireType] = useState("Personal Project");

  const sendInquiry = () => {
    const subject = `Hiring Inquiry – ${jobTitle || "New Project"}`;

    const body = `
Job Title: ${jobTitle}
Budget: ${budget}
Hiring For: ${hireType}

Job Description:
${description}

Personal Note:
${note}
    `;

    window.location.href =
      `mailto:info@matamix.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

        {/* CLOSE */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-black/40 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* CONTENT */}
        <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">

          <h2 className="text-xl font-semibold">
            Invite Matamix International
          </h2>

          {/* JOB TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              What are you hiring for?
            </label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Website redesign, Mobile app, Branding, etc."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            {!jobTitle && (
              <p className="text-xs text-red-500 mt-1">
                Job title is required
              </p>
            )}
          </div>

         {/* BUDGET */}
<div>
  <label className="block text-sm font-medium mb-2">
    What is your budget?
  </label>

  <div className="grid grid-cols-2 gap-3 text-sm">
    {[
      "Under ₹10,000",
      "₹10,000 – ₹25,000",
      "₹25,000 – ₹50,000",
      "₹50,000 – ₹1,00,000",
      "₹1,00,000 – ₹2,50,000",
      "₹2,50,000 – ₹5,00,000",
    ].map((item) => (
      <label
        key={item}
        className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${
          budget === item
            ? "border-blue-600 bg-blue-50"
            : "border-black/20"
        }`}
      >
        <input
          type="radio"
          checked={budget === item}
          onChange={() => setBudget(item)}
        />
        {item}
      </label>
    ))}
  </div>
</div>


          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Job description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`• Overview of your project
• Key deliverables
• Timeline`}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* PERSONAL NOTE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Add a personal note
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Hi, I think you're a great match for this project."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* HIRING TYPE */}
          <div>
            <label className="block text-sm font-medium mb-2">
              I'm hiring for:
            </label>

            <div className="flex gap-3">
              {["Personal Project", "Company"].map((type) => (
                <button
                  key={type}
                  onClick={() => setHireType(type)}
                  className={`flex-1 py-2 rounded-lg border text-sm transition ${
                    hireType === type
                      ? "border-blue-600 bg-blue-50"
                      : "border-black/20"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={sendInquiry}
            disabled={!jobTitle}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            Create Job & Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
