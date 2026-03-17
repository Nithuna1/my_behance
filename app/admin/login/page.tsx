"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const change = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const submit = async (e:any)=>{
  e.preventDefault();

  console.log("CLICKED");

  const res = await fetch("/api/admin/login",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(form)
  });

  const data = await res.json();

  console.log("RESPONSE:", data);

  if(data.success){
    console.log("SUCCESS");
    localStorage.setItem("admin","true");

    alert("Login Success ✅"); // 👈 MUST SHOW

    window.location.href = "/admin";
  }else{
    alert("Invalid login ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">

      <form
        onSubmit={submit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Admin Login
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Sign in to manage the system
        </p>

        {/* Email */}
        <label className="block text-sm font-medium mb-1">
          Username
        </label>

        <input
          name="email"
          value={form.email}
          onChange={change}
          placeholder="admin@gmail.com"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Password */}
        <label className="block text-sm font-medium mb-1">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={change}
          placeholder="******"
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          © 2026 Your Admin Panel
        </p>
      </form>

    </div>
  );
}