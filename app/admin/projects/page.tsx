"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsAdmin() {

  const [projects,setProjects] = useState<any[]>([]);

 const load = async () => {
  const res = await fetch("/api/projects");
  const data = await res.json();

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

      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-blue-900 text-white">

            <tr>
              <th className="p-3">Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {Array.isArray(projects) && projects.map((p)=>(
              <tr key={p._id} className="border-t">

                <td className="p-3">
                  <img
                    src={p.image}
                    className="h-10"
                  />
                </td>

                <td>{p.title}</td>

                <td>{p.author}</td>

                <td>{p.year}</td>

                <td>{p.category}</td>

                <td className="space-x-2">

                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>remove(p._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
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