import { useNavigate } from "react-router-dom";

export default function Navbar({ timeLeft, onExtend }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    localStorage.removeItem("maxExpiry");
    navigate("/login");
  };

  // =========================
  // 🔹 FORMAT TIME
  // =========================
  const formatTime = (ms) => {
    if (!ms) return "0:00";

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // =========================
  // 🔹 PROGRESS %
  // =========================
  const expiry = Number(localStorage.getItem("expiry"));
  const maxExpiry = Number(localStorage.getItem("maxExpiry"));

  let progress = 0;

  if (expiry && maxExpiry) {
    const total = maxExpiry - (maxExpiry - 60 * 60 * 1000);
    const remaining = expiry - Date.now();
    progress = Math.max(0, Math.min(100, (remaining / total) * 100));
  }

  // =========================
  // 🔹 COLOR LOGIC
  // =========================
  let barColor = "bg-green-500";

  if (timeLeft < 10 * 60 * 1000) barColor = "bg-red-500";
  else if (timeLeft < 30 * 60 * 1000) barColor = "bg-yellow-400";

  return (
    <header className="border-b border-cyan-200/10 bg-slate-900/85 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* LEFT */}
        <h1 className="text-xl font-semibold text-slate-100">Notes App</h1>

        {/* CENTER - TIMER BLOCK */}
        <div className="flex flex-col items-center w-full max-w-xs">
          {/* Time */}
          <p className="text-xs text-slate-400 mb-1">Session Time</p>

          <p className="text-sm font-semibold text-cyan-300">
            {formatTime(timeLeft)}
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${barColor} transition-all duration-1000 ${
                barColor === "bg-red-500"
                  ? "shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                  : barColor === "bg-yellow-400"
                    ? "shadow-[0_0_10px_rgba(250,204,21,0.7)]"
                    : "shadow-[0_0_10px_rgba(34,211,238,0.7)]"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Extend Button */}
          <button
            onClick={onExtend}
            className="text-xs px-3 py-1 rounded-md bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition"
          >
            Extend
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm text-rose-300 hover:text-rose-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
