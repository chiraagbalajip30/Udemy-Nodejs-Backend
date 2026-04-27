import { useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Notes App</h1>

          <button className="text-sm text-red-500 hover:underline">
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Create Note */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Create a Note
          </h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              placeholder="Write your note..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Add Note
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-4">Your Notes</h2>

          {notes.length === 0 ? (
            <p className="text-gray-500">No notes yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-800">{note.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{note.content}</p>

                  <div className="flex gap-4 mt-4 text-sm">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
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
