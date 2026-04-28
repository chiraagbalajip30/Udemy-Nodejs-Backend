import { useState, useEffect } from "react";

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onCreate(title, content); // 🔥 send to parent

    setTitle("");
    setContent("");
  };

  return (
    <div className="mb-8 rounded-xl border border-cyan-200/10 bg-slate-900/70 p-6 shadow-xl shadow-cyan-950/20">
      <h2 className="mb-4 text-lg font-medium text-slate-100">Create a Note</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <textarea
          placeholder="Write your note..."
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          onClick={handleSubmit}
          className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
