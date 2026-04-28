import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateNote from "../components/CreateNote";
import NoteCard from "../components/NoteCard";
import toast, { ToastIcon } from "react-hot-toast";

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

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

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

  const handleCreateNote = async (title, content) => {
    if (!title.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      // ✅ Update UI instantly
      setNotes((prev) => [data.data, ...prev]);

      toast.success("Note created");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8000/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      // ✅ Remove from UI instantly
      setNotes((prev) => prev.filter((note) => note.id !== id));

      toast.success("Note deleted");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUpdateNote = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8000/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      // ✅ Update UI instantly
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? data.data : note)),
      );

      toast.success("Note updated");
    } catch (error) {
      ToastIcon.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <CreateNote onCreate={handleCreateNote} />

        <h2 className="mb-4 text-lg font-medium text-slate-100">Your Notes</h2>

        {notes.length === 0 ? (
          <p className="text-slate-400">No notes yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
