import { useNavigate } from "react-router-dom";

export default function Navbar({ timeLeft }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    navigate("/login");
  };

  // ✅ Format function here (Navbar can have its own)
  const formatTime = (ms) => {
    if (!ms) return "0:00";

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <header className="border-b border-cyan-200/10 bg-slate-900/85 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left */}
        <h1 className="text-xl font-semibold text-slate-100">Notes App</h1>

        {/* Center (Timer) */}
        <p className="text-sm text-slate-400">
          Session:{" "}
          <span className="text-cyan-300 font-medium">
            {formatTime(timeLeft)}
          </span>
        </p>

        {/* Right */}
        <button
          onClick={handleLogout}
          className="text-sm text-rose-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
