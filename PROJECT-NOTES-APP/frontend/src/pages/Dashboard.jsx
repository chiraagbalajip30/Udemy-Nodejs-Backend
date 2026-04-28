import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateNote from "../components/CreateNote";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";

export default function Dashboard() {
  // =========================
  // 🔹 STATES
  // =========================
  const [notes, setNotes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [warned, setWarned] = useState(false);

  // =========================
  // 🔹 FETCH NOTES
  // =========================
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🔐 Token expired
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("expiry");
          localStorage.removeItem("maxExpiry");

          toast.error("Session expired");
          window.location.href = "/login";
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          console.error(data.error);
          return;
        }

        setNotes(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  // =========================
  // 🔹 SESSION TIMER
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      const expiry = Number(localStorage.getItem("expiry"));

      if (!expiry) return;

      const remaining = expiry - Date.now();

      // ⛔ Expired
      if (remaining <= 0) {
        clearInterval(interval);

        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
        localStorage.removeItem("maxExpiry");

        toast.error("Session expired");
        window.location.href = "/login";
      } else {
        setTimeLeft(remaining);

        // ⚠️ Warning at 2 minutes
        if (remaining <= 2 * 60 * 1000 && !warned) {
          toast("⚠️ Session expiring in 2 minutes");
          setWarned(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [warned]);

  // =========================
  // 🔹 EXTEND SESSION
  // =========================
  const handleExtendSession = () => {
    const expiry = Number(localStorage.getItem("expiry"));
    const maxExpiry = Number(localStorage.getItem("maxExpiry"));

    if (!expiry || !maxExpiry) return;

    const remainingPossible = maxExpiry - expiry;

    // ❌ Already max
    if (remainingPossible <= 0) {
      toast("Max session reached");
      return;
    }

    const newExpiry = expiry + remainingPossible;

    localStorage.setItem("expiry", newExpiry);

    setTimeLeft(newExpiry - Date.now());

    toast.success("Session extended to full time");
  };

  // =========================
  // 🔹 CREATE NOTE
  // =========================
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

      setNotes((prev) => [data.data, ...prev]);

      toast.success("Note created");
    } catch (error) {
      toast.error("Error creating note");
    }
  };

  // =========================
  // 🔹 DELETE NOTE
  // =========================
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

      setNotes((prev) => prev.filter((note) => note.id !== id));

      toast.success("Note deleted");
    } catch (error) {
      toast.error("Error deleting note");
    }
  };

  // =========================
  // 🔹 UPDATE NOTE
  // =========================
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

      setNotes((prev) =>
        prev.map((note) => (note.id === id ? data.data : note))
      );

      toast.success("Note updated");
    } catch (error) {
      toast.error("Error updating note");
    }
  };

  // =========================
  // 🔹 UI
  // =========================
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">

      {/* 🔥 Navbar with Timer + Extend */}
      <Navbar timeLeft={timeLeft} onExtend={handleExtendSession} />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <CreateNote onCreate={handleCreateNote} />

        <h2 className="mb-4 text-lg font-medium text-slate-100">
          Your Notes
        </h2>

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