import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      {...attributes}
      {...listeners}
      className="mt-4 flex items-start w-full touch-none select-none"
    >
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
          onClick={() => openEdit(todo)}
        >
          Edit
        </button>

        <button className="btn1" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}