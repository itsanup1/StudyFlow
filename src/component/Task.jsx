import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {DragHandleIcon} from '../assets/DragHandleIcon'

export function Task({ todo, toggleComplete, deleteTodo, openEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="mt-4 flex items-start w-full touch-none select-none"
    >
      {/* DRAG HANDLE */}
      <DragHandleIcon
        {...attributes}
        {...listeners}
        className="mr-4 text-[rgb(var(--sectext))] hover:text-gray-700 cursor-grab outline-none"
        aria-label="Drag to reorder"
        title="Drag to reorder"
      />
        

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
          className={`text-xl text-[rgb(var(--pritext))] truncate ${todo.completed && "line-through text-[rgb(var(--sectext))]/60"}`}
        >
          {todo.text}
        </span>

        <span
          className={`text-[rgb(var(--sectext))]/60 truncate ${todo.completed && "invisible"}`}
        >
          {todo.description}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 items-center">
        <button
          disabled={todo.completed}
          className="btn1 text-[rgb(var(--pritext))] border-[rgb(var(--pritext))] disabled:opacity-40"
          onClick={() => openEdit(todo)}
        >
          Edit
        </button>

        <button
          className="btn1 text-[rgb(var(--pritext))] "
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}