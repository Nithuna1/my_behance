"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsAdmin() {

  const [projects,setProjects] = useState<any[]>([]);

 const load = async () => {
  const res = await fetch("/api/projects");
  const data = await res.json();

  console.log("PROJECT DATA:", data);

  if (Array.isArray(data)) {
    setProjects(data);
  } else {
    console.error("API did not return array:", data);
    setProjects([]);
  }
};

  useEffect(()=>{
    load();
  },[]);

  const remove = async(id:string)=>{

    await fetch("/api/projects",{
      method:"DELETE",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({id})
    });

    load();
  };

  return(
    <div>

      {/* Header */}
      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-bold">
          Project Listing
        </h1>

        <Link
          href="/admin/projects/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Project
        </Link>

      </div>

      {/* Table */}

      <div className="bg-white shadow rounded overflow-x-auto">

       <table className="w-full">

      <thead className="bg-blue-700 text-black">
  <tr>
    <th className="p-3 w-[80px]">Image</th>
    <th className="p-3">Title</th>
    <th className="p-3">Author</th>
    <th className="p-3 w-[100px]">Year</th>
    <th className="p-3">Category</th>
    <th className="p-3 text-right w-[180px]">Actions</th>
  </tr>
</thead>

          <tbody>

            {projects.length === 0 && (
  <tr>
    <td colSpan={6} className="text-center p-4">
      No projects found
    </td>
  </tr>
)}

            {Array.isArray(projects) && projects.map((p)=>(
              <tr key={p._id} className="border-t">

                <td className="p-3">
                  <img
  src={p.image && p.image !== "" ? p.image : "https://via.placeholder.com/100"}
  className="h-12 w-12 object-cover rounded border"
  onError={(e: any) => {
    e.target.src = "https://via.placeholder.com/100";
  }}
/>
                </td>

                <td>{p.title}</td>

                <td>{p.author}</td>

                <td>{p.year}</td>

                <td>{p.category}</td>

                <td className="space-x-2 whitespace-nowrap text-right">

                 <Link href={`/admin/projects/edit/${p._id}`}>
  <button className="bg-green-600 text-black px-3 py-1 rounded">
    Edit
  </button>
</Link>

<button
  onClick={() => remove(p._id)}
  className="bg-red-500 hover:bg-red-600 text-black px-3 py-1 rounded-md text-sm transition"
>
  Delete
</button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}