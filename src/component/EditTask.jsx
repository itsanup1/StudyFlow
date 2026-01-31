import { useEffect, useRef } from "react";

export function EditTask({
  setOpenModal,
  editId,
  editText,
  setEditText,
  editDescription,
  setEditDescription,
  setTodos,
}) {
  const inputRef = useRef(null);

  // Auto-focus title input when modal opens
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  function saveEdit() {
    if (editText.trim() === "") return;

    setTodos(prev =>
      prev.map(todo =>
        todo.id === editId
          ? {
              ...todo,
              text: editText,
              description: editDescription,
            }
          : todo
      )
    );

    setOpenModal(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* BACKGROUND OVERLAY */}
      <div
        className="absolute inset-0 bg-black/5 backdrop-blur-sm"
        onClick={() => setOpenModal(false)}
      />

      {/* MODAL BOX */}
      <div className="relative bg-white rounded-xl p-8 w-96 shadow-xl flex flex-col gap-4">
        <h1 className="font-bold text-xl">Edit Task</h1>

        {/* TITLE */}
        <input
          ref={inputRef}
          type="text"
          className="border rounded-md w-full p-2"
          placeholder="Title"
          value={editText}
          onChange={e => setEditText(e.target.value)}
        />

        {/* DESCRIPTION */}
        <input
          type="text"
          className="border rounded-md w-full p-2"
          placeholder="Description"
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button
            className="btn1"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>

          <button
            className="btn1"
            onClick={saveEdit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}