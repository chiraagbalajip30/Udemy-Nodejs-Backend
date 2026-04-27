import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-cyan-100/15 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-900/20 backdrop-blur">
        
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-slate-100">
            Create Account
          </h1>
          <p className="mt-2 text-slate-300">
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-slate-200">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-slate-200">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}