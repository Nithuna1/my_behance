"use client";

import { useEffect,useState } from "react";

export default function WebsitesAdmin(){

  const [data,setData] = useState<any[]>([]);
  const [form,setForm] = useState({
    name:"",
    url:"",
    image:""
  });

  const [editId,setEditId] = useState<string|null>(null);

  const load = async()=>{
    const res = await fetch("/api/websites");
    setData(await res.json());
  };

  useEffect(()=>{load();},[]);

  const change=(e:any)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const submit=async()=>{

    if(editId){
      await fetch("/api/websites",{method:"PUT",body:JSON.stringify({id:editId,...form})});
      setEditId(null);
    }else{
      await fetch("/api/websites",{method:"POST",body:JSON.stringify(form)});
    }

    setForm({name:"",url:"",image:""});
    load();
  };

  const edit=(item:any)=>{
    setForm(item);
    setEditId(item._id);
  };

  const del=async(id:string)=>{
    await fetch("/api/websites",{method:"DELETE",body:JSON.stringify({id})});
    load();
  };

  return(
    <div className="p-10">

      <h1>Websites</h1>

      <input name="name" placeholder="Name" value={form.name} onChange={change}/>
      <input name="url" placeholder="URL" value={form.url} onChange={change}/>
      <input name="image" placeholder="Image" value={form.image} onChange={change}/>

      <button onClick={submit}>{editId ? "Update":"Add"}</button>

      {data.map((item)=>(
        <div key={item._id}>
          {item.name}
          <button onClick={()=>edit(item)}>Edit</button>
          <button onClick={()=>del(item._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}