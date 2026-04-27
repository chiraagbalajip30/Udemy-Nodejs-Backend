export default function Navbar() {
  return (
    <header className="border-b border-cyan-200/10 bg-slate-900/85 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-100">Notes App</h1>

        <button className="text-sm text-rose-300">Logout</button>
      </div>
    </header>
  );
}
