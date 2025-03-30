import { useState } from "react";
import { signUpUser, signInWithGoogle } from "@/backend/auth";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import Navbar from "@/components/landing/Navbar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const {setUser} = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const result = await signUpUser(email, password);
    if (result.success) {
      router.push('/dashboard/journal');
    } else {
      setError(result.error);
    }
  };


  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      router.push('/dashboard/journal');
    } else {
      setError(result.error);
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <div className="min-h-screen bg-[#150A18]">
      <Navbar navLinks={navigation} />
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-md w-full space-y-8 p-8 bg-[#1F1225] rounded-lg border border-[#FF2E63]/20 shadow-[0_0_15px_rgba(255,46,99,0.1)]">
          {/* Neon border effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF2E63] via-[#FF2E63]/50 to-[#FF2E63] opacity-20 blur-xl"></div>
          
          <div className="relative">
            <h2 className="text-center text-3xl font-extrabold text-white font-mono">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-[#FF2E63] font-mono">
              Join QuestLog and start your journey
            </p>
          </div>

          <form className="mt-8 space-y-6 relative" onSubmit={handleSubmit}>
            {error && (
              <div className="text-[#FF2E63] text-sm text-center font-mono">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#FF2E63] font-mono">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 bg-[#150A18] border border-[#FF2E63]/20 rounded-md text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#FF2E63] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#FF2E63] font-mono">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 bg-[#150A18] border border-[#FF2E63]/20 rounded-md text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#FF2E63] focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#FF2E63] font-mono">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 bg-[#150A18] border border-[#FF2E63]/20 rounded-md text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#FF2E63] focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF2E63] hover:bg-[#FF2E63]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF2E63] font-mono transition-all duration-200"
              >
                Create Account
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#FF2E63]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1F1225] text-[#FF2E63] font-mono">Or continue with</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-[#FF2E63]/20 rounded-md text-sm font-medium text-white bg-[#150A18] hover:bg-[#150A18]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF2E63] font-mono transition-all duration-200"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-[#FF2E63] font-mono">
            Already have an account?{" "}
            <a href="/login" className="font-medium hover:text-[#FF2E63]/90 transition-colors duration-200">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
