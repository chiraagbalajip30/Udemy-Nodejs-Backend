import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="border-b border-cyan-200/10 bg-slate-900/85 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-100">Notes App</h1>

        <button onClick={handleLogout} className="text-sm text-rose-300">
          Logout
        </button>
      </div>
    </header>
  );
}
