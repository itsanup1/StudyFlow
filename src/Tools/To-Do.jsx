import { useState, useEffect } from "react";
import { EditModal } from "../component/EditModal";
import { EditTask } from "../component/EditTask";

export function ToDo() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* DELETE */
  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  {/* TOGGLE COMPLETE */}
  function toggleComplete(id) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  return (
    <div className="mt-5 p-4 max-w-200 mx-auto">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>

      {/* ADD BUTTON */}
      <div className="flex justify-end">
        <button
          className="apply px-6 py-2 bg-gray-700 text-white rounded-md tracking-wider"
          onClick={() => setOpenAddModal(true)}
        >
          + Add
        </button>
      </div>

      {/* ADD MODAL */}
      {openAddModal && (
        <EditModal
          setOpenModal={setOpenAddModal}
          setTodos={setTodos}
        />
      )}

      {/* EDIT MODAL */}
      {openEditModal && (
        <EditTask
          setOpenModal={setOpenEditModal}
          editId={editId}
          editText={editText}
          setEditText={setEditText}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          setTodos={setTodos}
        />
      )}

      {/* TODO LIST */}
      <ul className="mt-8 text-lg">
        {todos.map(todo => (
          <li key={todo.id} className="mt-4 flex items-start w-full">
            
            {/* CHECKBOX */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="mr-6 mt-2 scale-150"
            />

            {/* TEXT */}
            <div className="flex flex-col gap-2 w-full">
              <span
                className={`text-xl truncate ${
                  todo.completed && "line-through text-gray-400"
                }`}
              >
                {todo.text}
              </span>

              <span
                className={`text-gray-500 truncate ${
                  todo.completed && "invisible"
                }`}
              >
                {todo.description}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 items-center">
              <button
                disabled={todo.completed}
                className="btn1 disabled:opacity-40"
                onClick={() => {
                  setEditId(todo.id);
                  setEditText(todo.text);
                  setEditDescription(todo.description);
                  setOpenEditModal(true);
                }}
              >
                Edit
              </button>

              <button
                className="btn1"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}