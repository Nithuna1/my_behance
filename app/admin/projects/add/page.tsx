"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProject(){

  const router = useRouter();

  const [form,setForm] = useState({
    title:"",
    author:"",
    year:"",
    category:"",
    image:"",
    description:""
  });

  const change = (e:any)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const submit = async(e:any)=>{
    e.preventDefault();

    await fetch("/api/projects",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify(form)
    });

    router.push("/admin/projects");
  };

  return(

    <div className="max-w-2xl">

      <h1 className="text-2xl font-bold mb-6">
        Add Project
      </h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={change}
          className="border p-2 w-full"
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={change}
          className="border p-2 w-full"
        />

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={change}
          className="border p-2 w-full"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={change}
          className="border p-2 w-full"
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={change}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={change}
          className="border p-2 w-full"
        />

        <div className="space-x-3">

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Project
          </button>

          <button
            type="button"
            onClick={()=>router.push("/admin/projects")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}