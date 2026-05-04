import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  // =========================
  // 🔹 STATES
  // =========================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // 🔹 REDIRECT IF LOGGED IN
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  // =========================
  // 🔹 LOGIN HANDLER
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      // ❌ Login failed
      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      // =========================
      // 🔥 SESSION SETUP (IMPORTANT)
      // =========================
      const now = Date.now();

      // 🔐 Token
      localStorage.setItem("token", data.data.token);

      // ⏱️ Session timing
      localStorage.setItem("expiry", now + 10 * 60 * 1000); // 10 mins
      localStorage.setItem("maxExpiry", now + 60 * 60 * 1000); // 60 mins

      // =========================
      // 🔹 SUCCESS TOAST
      // =========================
      toast.success("Logged in successfully");

      // =========================
      // 🔹 REDIRECT
      // =========================
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  // =========================
  // 🔹 UI
  // =========================
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-100/15 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-900/20 backdrop-blur">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-slate-100">
            Welcome Back
          </h1>
          <p className="mt-2 text-slate-300">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password with Show/Hide Toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 pr-10 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              {/* Eye Icon Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 py-2 font-medium text-slate-950 transition hover:bg-cyan-400 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-cyan-300 hover:text-cyan-200"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
