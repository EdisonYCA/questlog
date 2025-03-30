import Navbar from "@/components/landing/Navbar";
import { useState } from "react";
import { signUpUser } from "@/backend/auth";
import { useRouter } from "next/router";

export default function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const validateUserCredentials = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (
      emailRegex.test(email) &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password == confirmPassword
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateUserCredentials()) {
      setError(true);
      return;
    }

    try {
      await signUpUser(email, password);
      router.push("/journal")
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
          <h2 className="text-3xl font-bold text-center text-white">
            Create an Account
          </h2>

          <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#E0D6EB]">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 bg-[#3B0D29] text-white border border-[#711142] rounded-lg focus:ring-2 focus:ring-[#3E5A8E] focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#E0D6EB]">
                Password
              </label>
              <input
                onChange={(p) => {
                  setPassword(p.target.value);
                }}
                type="password"
                placeholder="Create a password"
                className="w-full mt-1 px-4 py-2 bg-[#3B0D29] text-white border border-[#711142] rounded-lg focus:ring-2 focus:ring-[#3E5A8E] focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#E0D6EB]">
                Confirm Password
              </label>
              <input
                onChange={(p) => {
                  setConfirmPassword(p.target.value);
                }}
                type="password"
                placeholder="Re-enter your password"
                className="w-full mt-1 px-4 py-2 bg-[#3B0D29] text-white border border-[#711142] rounded-lg focus:ring-2 focus:ring-[#3E5A8E] focus:outline-none"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#711142] text-white font-bold py-2 rounded-lg hover:bg-[#3B0D29] transition-all"
            >
              Sign Up
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

          {/* Sign Up with Google */}
          <button className="w-full flex items-center justify-center gap-2 bg-[#3B0D29] text-white py-2 rounded-lg hover:bg-[#711142] transition-all">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>

          {/* Already Have an Account */}
          <p className="mt-4 text-center text-[#E0D6EB] text-sm">
            Already have an account?{" "}
            <a href="#" className="text-[#3E5A8E] font-medium hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
