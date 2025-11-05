/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, db } from "../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  currentUser: User | null;
  userRole: "ets" | "vendor" | "public" | null;
  isETSEmployee: boolean;
  isVendor: boolean;
  vendorId?: string;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"ets" | "vendor" | "public" | null>(
    null
  );
  const [isETSEmployee, setIsETSEmployee] = useState<boolean>(false);
  const [isVendor, setIsVendor] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Function to fetch user role from Firestore
  const fetchUserRole = async (
    userId: string
  ): Promise<"ets" | "vendor" | "public"> => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const role = data.role as "ets" | "vendor" | "public" | undefined;

        if (role === "ets" || role === "vendor" || role === "public") {
          console.log(`User role loaded from Firestore: ${role}`);
          return role;
        }
      }

      // Default to public if no role is set
      console.log("No role found in Firestore, defaulting to public");
      return "public";
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "public";
    }
  };

  const refreshUserRole = async () => {
    if (currentUser) {
      const role = await fetchUserRole(currentUser.uid);
      setUserRole(role);
      setIsETSEmployee(role === "ets");
      setIsVendor(role === "vendor");
    }
  };

  useEffect(() => {
    // Subscribe to auth state changes and fetch role from Firestore
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch role from Firestore
        const role = await fetchUserRole(user.uid);
        setUserRole(role);
        setIsETSEmployee(role === "ets");
        setIsVendor(role === "vendor");
      } else {
        // User is signed out
        setUserRole(null);
        setIsETSEmployee(false);
        setIsVendor(false);
      }

      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserRole(null);
      setIsETSEmployee(false);
      setIsVendor(false);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userRole,
    isETSEmployee,
    isVendor,
    loading,
    signOut,
    refreshUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
