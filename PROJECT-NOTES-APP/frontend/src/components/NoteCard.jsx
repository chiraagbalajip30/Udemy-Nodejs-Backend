export default function NoteCard({ note }) {
  return (
    <div className="rounded-xl border border-cyan-200/10 bg-slate-900/70 p-4 shadow-lg">
      <h3 className="font-semibold text-slate-100">{note.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{note.content}</p>

      <div className="flex gap-4 mt-4 text-sm">
        <button className="text-cyan-300">Edit</button>
        <button className="text-rose-300">Delete</button>
      </div>
    </div>
  );
}
