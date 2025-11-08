import { auth, db } from "../services/firebase-config";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import './SignIn.css'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  
  const navigate = useNavigate();
  const { refreshUserRole } = useAuth();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user.uid);

      // 2. Directly fetch role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      // 3. Refresh role in AuthContext to ensure consistency
      await refreshUserRole();

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userRole = userData.role;
        console.log("User role fetched:", userRole);

        // 4. Navigate based on role
        if (userRole === "vendor") {
          navigate("/vendor/dashboard");
        } else if (userRole === "ets") {
          navigate("/ets/dashboard");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }

  alert("Sign in successful!");
    } catch (error: FirebaseError | unknown) {
      console.error("Error signing in:", error);
      alert(`Error: ${(error as FirebaseError).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e?: React.MouseEvent) => {
    e?.preventDefault();

    // Prevent duplicate sends while a request is in-flight
    if (isSendingReset) return;

    if (!email) {
      alert("Please enter your email address above to receive a reset link.");
      return;
    }

    setIsSendingReset(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
    } catch (err: unknown) {
      console.error("Reset error:", err);
      const msg = (err as FirebaseError)?.message ?? "Unable to send reset email.";
      alert(`Error sending reset email: ${msg}`);
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <div className="signin-root flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="/public/favicon.png"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSignIn}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  id="forgotpasswordlink"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword(e as React.MouseEvent);
                  }}
                  className={`font-semibold text-indigo-600 hover:text-indigo-500 ${isSendingReset ? 'pointer-events-none opacity-60' : ''}`}
                  aria-disabled={isSendingReset}
                >
                  {isSendingReset ? 'Sending…' : 'Forgot password?'}
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don't have an account?
          <a
            href="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
