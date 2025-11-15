import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"public" | "vendor" | "ets">("public");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create user document in Firestore with selected role
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role,
        createdAt: serverTimestamp(),
      });

      console.log("User created with role:", role);
      alert(
        `Sign up successful! You have been assigned the role: ${role.toUpperCase()}`
      );
      navigate("/login");
    } catch (error: unknown) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;
      console.error("Error signing up:", errorCode, errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="signup-root flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="signup-card">
        <div className="sm:mx-auto sm:w-full">
          <img
            src="/favicon.png"
            alt="Your Company"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-8">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSignUp}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address (required)
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder="example@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password (required)
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Select Your Role
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "public" | "vendor" | "ets")
                }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="public">Public User (Read-only)</option>
                <option value="vendor">
                  IV&V Vendor (Create/Edit Reports)
                </option>
                <option value="ets">ETS Employee (Manage Projects)</option>
              </select>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Choose your role based on your access needs
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderRadius: "30px",
                backgroundColor: "#595959",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#212121ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#595959")
              }
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm/6 text-gray-500">
          Already have an account?
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Sign In
          </a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
