import {useState} from 'react'

export function EditModal() {
  const [mode,setMode] = useState("add");  
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"
                onClick = {()=>mode=="add"?setMode("edit"):setMode("add")}/>

      {/* MODAL BOX */}
      <div className="flex flex-col gap-4 relative bg-white rounded-xl p-8 w-96 shadow-xl">
        <h1 className="font-bold text-xl ">{(mode=="add") ?"Add Task"  : "Edit Task"}</h1>
        <input
          type="text"
          className="border rounded-md w-full p-2"
          placeholder="Title"
        />
        <input
          type="text"
          className="border rounded-md w-full p-2"
          placeholder="Description"
        />
        {mode==="edit"&&<button className="ml-auto w-fit btn1  ">Save</button>}
        {mode==="add" && <button className="ml-auto w-fit btn1  ">Add</button>}
        
      </div>

    </div>
  );
}