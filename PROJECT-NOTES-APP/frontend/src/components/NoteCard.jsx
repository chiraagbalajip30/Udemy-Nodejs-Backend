import { useState } from "react";

export default function NoteCard({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(note.id, { title, content });
    setIsEditing(false);
  };

  return (
    <>
      {/* NOTE CARD */}
      <div className="p-4 border border-cyan-200/10 bg-slate-900/70 rounded-xl shadow-md">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-slate-100">
              {note.title}
            </h3>
            <p className="text-sm text-slate-300 mt-2">{note.content}</p>
          </>
        )}

        <div className="flex gap-3 mt-4 text-sm">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-cyan-300 hover:text-cyan-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-cyan-300 hover:text-cyan-200 cursor-pointer"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => setShowConfirm(true)}
            className="text-rose-300 hover:text-rose-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-slate-900 border border-cyan-200/10 p-6 rounded-xl shadow-xl w-80">
            <h2 className="text-lg font-semibold text-slate-100">
              Delete Note?
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Are you sure you want to delete{" "}
              <span className="text-slate-200 font-medium">"{note.title}"</span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              {/* Cancel */}
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>

              {/* Confirm Delete */}
              <button
                onClick={() => {
                  onDelete(note.id);
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
