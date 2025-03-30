import Navbar from "@/components/landing/Navbar";
import { useState } from "react";
import { logUserIn } from "@/backend/auth";
import { useRouter } from "next/router";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const validateUserCredentials = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && password.length > 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateUserCredentials()) {
      setError(true);
      return;
    }

    try {
      await logUserIn(email, password);
      router.push("/dashboard")
    } catch (err) {
      setError(true);
      console.log(err)
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex min-h-screen items-center justify-center bg-[#150A18]">
        <div className="w-full max-w-md p-8 bg-[#442A46] rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>

          <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[#E0D6EB]">
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 bg-[#3B0D29] text-white border border-[#711142] rounded-lg focus:ring-2 focus:ring-[#3E5A8E] focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-[#E0D6EB]">
                Password
              </label>
              <input
                onChange={(p) => {
                  setPassword(p.target.value);
                }}
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 bg-[#3B0D29] text-white border border-[#711142] rounded-lg focus:ring-2 focus:ring-[#3E5A8E] focus:outline-none"
              />
            </div>

            {/* Forgot Password & Sign In Button */}
            <div className="flex justify-between items-center text-sm text-[#E0D6EB]">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#711142] text-white font-bold py-2 rounded-lg hover:bg-[#3B0D29] transition-all"
            >
              Sign In
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              Invalid entry. Please check your input.
            </p>
          )}

          {/* Divider */}
          <div className="my-6 flex items-center justify-center">
            <div className="w-full border-t border-[#E0D6EB]"></div>
            <span className="px-4 text-[#E0D6EB]">OR</span>
            <div className="w-full border-t border-[#E0D6EB]"></div>
          </div>

          {/* Sign In with Google */}
          <button className="w-full flex items-center justify-center gap-2 bg-[#3B0D29] text-white py-2 rounded-lg hover:bg-[#711142] transition-all">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          {/* Register Link */}
          <p className="mt-4 text-center text-[#E0D6EB] text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-[#3E5A8E] font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
