import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateNote from "../components/CreateNote";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data.error);
          return;
        }

        setNotes(data.data); // 🔥 store notes
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <CreateNote />

        <h2 className="mb-4 text-lg font-medium text-slate-100">Your Notes</h2>

        {notes.length === 0 ? (
          <p className="text-slate-400">No notes yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
