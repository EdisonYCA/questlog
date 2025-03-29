import Navbar from "@/components/landing/Navbar";
export default function signup() {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex min-h-screen items-center justify-center bg-[#150A18]">
        <div className="w-full max-w-md p-8 bg-[#442A46] rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">
            Create an Account
          </h2>

          <form className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#E0D6EB]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-1 px-4 py-2 bg-[#3B0D29] text-white border border-[#711142] rounded-lg focus:ring-2 focus:ring-[#3E5A8E] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#E0D6EB]">
                Email
              </label>
              <input
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
                type="password"
                placeholder="Re-enter your password"
                className="w-full mt-1 px-4 py-2 bg-[#3B0D29] text-white border border-[#711142] rounded-lg focus:ring-2 focus:ring-[#3E5A8E] focus:outline-none"
              />
            </div>

            {/* Sign Up Button */}
            <button className="w-full bg-[#711142] text-white font-bold py-2 rounded-lg hover:bg-[#3B0D29] transition-all">
              Sign Up
            </button>
          </form>

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
