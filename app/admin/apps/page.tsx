"use client";

import { useEffect,useState } from "react";

export default function AppsAdmin(){

  const [data,setData] = useState<any[]>([]);
  const [form,setForm] = useState({
    title:"",
    image:"",
    fullDescription:"",
    bestFor:""
  });

  const [editId,setEditId] = useState<string|null>(null);

  const load = async()=>{
    const res = await fetch("/api/apps");
    setData(await res.json());
  };

  useEffect(()=>{load();},[]);

  const change = (e:any)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const submit = async()=>{

    if(editId){
      await fetch("/api/apps",{method:"PUT",body:JSON.stringify({id:editId,...form})});
      setEditId(null);
    }else{
      await fetch("/api/apps",{method:"POST",body:JSON.stringify(form)});
    }

    setForm({title:"",image:"",fullDescription:"",bestFor:""});
    load();
  };

  const edit=(item:any)=>{
    setForm(item);
    setEditId(item._id);
  };

  const del=async(id:string)=>{
    await fetch("/api/apps",{method:"DELETE",body:JSON.stringify({id})});
    load();
  };

  return(
    <div className="p-10">

      <h1>Apps</h1>

      <input name="title" placeholder="Title" value={form.title} onChange={change}/>
      <input name="image" placeholder="Image" value={form.image} onChange={change}/>
      <input name="fullDescription" placeholder="Description" value={form.fullDescription} onChange={change}/>
      <input name="bestFor" placeholder="Best For" value={form.bestFor} onChange={change}/>

      <button onClick={submit}>{editId ? "Update":"Add"}</button>

      {data.map((item)=>(
        <div key={item._id}>
          {item.title}
          <button onClick={()=>edit(item)}>Edit</button>
          <button onClick={()=>del(item._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}