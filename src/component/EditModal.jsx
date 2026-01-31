import {useState,useEffect,useRef} from 'react'





export function EditModal({setOpenModal,setTodos}) {
    
  const [input,setInput] = useState("");
    
  const [description, setDescription] = useState("");
  
    
  
  
  function addTodo() {
    if (input.trim() === "") return;
        
    setTodos(prev => [
    ...prev,
    {
        id: Date.now(),
        text: input,
        description,
        completed: false,
    },
    ]);
        
    setInput("");
    setDescription("");
    setOpenModal(false);
  }

    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"
                onClick = {()=>setOpenModal(false)}/>

      {/* MODAL BOX */}
      <div className="flex flex-col gap-4 relative bg-white rounded-xl p-8 w-96 shadow-xl">
        <h1 className="font-bold text-xl ">Add Task</h1>
        <input
          type="text"
          className="border rounded-md w-full p-2"
          placeholder="Title"
          value = {input}
          onChange = {(e)=> setInput(e.target.value)}
        />
        <input
          type="text"
          className="border rounded-md w-full p-2"
          placeholder="Description"
          onChange = {(e)=> setDescription(e.target.value)}
        />
        
        <button className="ml-auto w-fit btn1"
                onClick = {addTodo}
                >Add</button>
        
      </div>

    </div>
  );
}