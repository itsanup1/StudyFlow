import { useState, useEffect } from "react";
import { AddModal } from "../component/AddModal";
import { EditModal } from "../component/EditModal";
import { Task } from "../component/Task";
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";


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

  
  function handleDragEnd(event) {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
        setTodos(items => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
        });
    }
  }
  
  
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
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
        <AddModal
          setOpenModal={setOpenAddModal}
          setTodos={setTodos}
        />
      )}

      {/* EDIT MODAL */}
      {openEditModal && (
        <EditModal
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
      <DndContext collisionDetection = {closestCorners} sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
        items={todos.map(t => t.id)}
        strategy={verticalListSortingStrategy}
        >
            <ul className="mt-8 text-lg">
                {todos.map(todo => (
                
                <Task
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                openEdit={(todo) => {
                    setEditId(todo.id);
                    setEditText(todo.text);
                    setEditDescription(todo.description);
                    setOpenEditModal(true);
                }}
                />
            ))}
            </ul>
        </SortableContext>    
      </DndContext>  
    </div>
  );
}