import { useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-cyan-200/10 bg-slate-900/85 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-100">Notes App</h1>

          <button className="text-sm font-medium text-rose-300 hover:text-rose-200">
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Create Note */}
        <div className="mb-8 rounded-xl border border-cyan-200/10 bg-slate-900/70 p-6 shadow-xl shadow-cyan-950/20">
          <h2 className="mb-4 text-lg font-medium text-slate-100">
            Create a Note
          </h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <textarea
              placeholder="Write your note..."
              rows="3"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400">
              Add Note
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div>
          <h2 className="mb-4 text-lg font-medium text-slate-100">
            Your Notes
          </h2>

          {notes.length === 0 ? (
            <p className="text-slate-400">You haven't created any notes yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-cyan-200/10 bg-slate-900/70 p-4 shadow-lg shadow-cyan-950/10"
                >
                  <h3 className="font-semibold text-slate-100">{note.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{note.content}</p>

                  <div className="flex gap-4 mt-4 text-sm">
                    <button className="font-medium text-cyan-300 hover:text-cyan-200">
                      Edit
                    </button>
                    <button className="font-medium text-rose-300 hover:text-rose-200">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
