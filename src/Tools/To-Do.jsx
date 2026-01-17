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
        
    function addTodo() {
        if (input.trim() === "") return;
        
        setTodos([
            ...todos,
            {
            id: Date.now(),
            text: input,
            completed: false,
            },
        ]);
        
        setInput("");
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
            <h1 className="text-3xl font-bold mb-4 ">To-Do List</h1>
            <div>
                <div className="flex gap-2">
                    <input
                    type="text"
                    placeholder="Enter task"
                    value = {input}
                    onChange = {(e)=> setInput(e.target.value)}
                    className="text-lg w-full px-3 py-2 border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    />
                    <button className="btn1"
                                     onClick = {()=>addTodo()}
                    >
                        Add
                    </button>
                </div>
                <ul className=" w-full mt-4 text-lg px-2">
                    {todos.map((todo,)=>
                        <li className="m-2 w-full flex " key={todo.id}>
                        {(editId == todo.id) ? 
                            <div className="flex gap-2 w-full">
                                <input type="text"
                                             value={editText}   
                                             ref = {inputRef}
                                             onChange = {(e)=>setEditText(e.target.value)}
                                             placeholder="Edit Task...."
                                             className=" w-full p-1 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                                <button className="btn1" onClick = {()=>saveEdit()}>Save</button>
                            </div>:
                        
                        <div className="flex items-center w-full ">    
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                className="mr-4 "
                            />
                            <span
                                className={`
                                    truncate w-full
                                    ${todo.completed ? "line-through text-gray-400" : ""}
                                `}
                                >
                                {todo.text}
                            </span>
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