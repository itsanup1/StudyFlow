import {useState,useRef,useEffect} from 'react'

export function ToDo(){
    const [todos, setTodos] = useState(() => {
        try{
            const savedTodos = localStorage.getItem("todos");
            return savedTodos
                ? JSON.parse(savedTodos)
                : [
                    {
                        id: 1,
                        text: "Hello",
                        description:"What are you doing",
                        completed: false,
                    },
                ];
        }catch{
            return [];
        }
        
    });
    const [input,setInput] = useState("");
    
    const [editId,setEditId] = useState(null);
    
    const [editText, setEditText] = useState("");
    
    const [description, setDescription] = useState("");

    const inputRef = useRef(null);
    
    useEffect(() => {
        if (editId !== null && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editId]);
    
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    
    {/*Add Todo Function*/}    
    function addTodo() {
        if (input.trim() === "") return;
        
        setTodos([
            ...todos,
            {
            id: Date.now(),
            text: input,
            description: description,
            completed: false,
            },
        ]);
        
        setInput("");
        setDescription("");
    }
    
    function deleteTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    
    
    function saveEdit(id) {
        setTodos(
            todos.map((todo) =>
            todo.id === editId ? { ...todo, text: editText } : todo
            )
        );
        setEditId(null);
        setEditText("");
    }
    {/*Complete Task Toggle Function*/}
    function toggleComplete(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }
    
    return(
        <div className="mt-5 p-4 max-w-200 mx-auto">
            <h1 className="text-3xl font-bold mb-4 w-full ">To-Do List</h1>
            <div className="w-full">
                <div className="flex gap-2 w-full">
                    <div className="flex flex-col gap-2 w-full">
                    
                    {/*Title Input Box*/}
                    <input
                    type="text"
                    placeholder="Enter task"
                    value = {input}
                    onChange = {(e)=> setInput(e.target.value)}
                    className="text-lg w-full px-3 py-2 border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    />
                    
                    {/*Description Input Box*/}
                    <input
                      className = "text-lg w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    </div>
                    
                    {/*Add Todo Button*/}
                    <button className="btn1"
                                     onClick = {()=>addTodo()}
                    >
                        Add
                    </button>
                </div>
                <ul className=" w-full mt-8 text-lg ">
                    {todos.map((todo,)=>
                        <li className=" w-full mt-4 flex " key={todo.id}>
                        {(editId == todo.id) ? 
                            <div className="flex gap-2 w-full">
                                {/*Edit Title Box*/}
                                <input type="text"
                                             value={editText}   
                                             ref = {inputRef}
                                             onChange = {(e)=>setEditText(e.target.value)}
                                             placeholder="Edit Task...."
                                             className=" w-full p-1 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                                {/*Save Edit Button*/}
                                <button className="btn1" onClick = {()=>saveEdit()}>Save</button>
                            </div>:
                        
                        <div className="flex items-start w-full ">    
                            {/*CheckBox*/}
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                className="mr-4 mt-2"
                            />
                            <div className="flex flex-col gap-2 w-full">
                                
                                {/*Title Output*/}
                                <span
                                    className={`
                                        truncate text-xl font-700 w-full text-zinc
                                        ${todo.completed ? "line-through text-gray-400" : ""}
                                    `}
                                    >
                                    {todo.text}
                                </span>
                                
                                {/*Description Output*/}
                                <span
                                    className={`
                                        truncate text-lg font-300 w-full text-zinc-500
                                        ${todo.completed ? "invisible " : ""}
                                    `}
                                    >
                                    {todo.description}
                                </span>
                            </div>    
                            
                            {/*Edit & Delete Button*/}
                            <div className =" flex gap-2 items-center ">
                                <button disabled = {todo.completed} className = "btn1 disabled:opacity-40"  onClick = {()=>{setEditId(todo.id); setEditText(todo.text)}}>Edit</button>
                                <button className="btn1" onClick = {()=>deleteTodo(todo.id)}>Delete</button>
                            </div>  
                        </div>    
                        }
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}