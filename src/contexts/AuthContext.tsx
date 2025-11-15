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
  isApproved: boolean;
  approvalStatus: "approved" | "pending" | "denied" | null;
  isAdmin: boolean;
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
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<"approved" | "pending" | "denied" | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Function to fetch user role and approval status from Firestore
  const fetchUserRole = async (
    userId: string
  ): Promise<{
    role: "ets" | "vendor" | "public";
    approved: boolean;
    approvalStatus: "approved" | "pending" | "denied";
    isAdmin: boolean;
  }> => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const role = data.role as "ets" | "vendor" | "public" | undefined;
        const approved = data.approved ?? true; // Default to true for backward compatibility
        const approvalStatus = data.approvalStatus ?? "approved";
        
        // Check if user is admin by checking Firestore admins collection
        let isAdmin = false;
        try {
          const adminDocRef = doc(db, "admins", userId);
          const adminSnap = await getDoc(adminDocRef);
          isAdmin = adminSnap.exists();
        } catch (error) {
          console.error("Error checking admin status:", error);
          isAdmin = false;
        }

        if (role === "ets" || role === "vendor" || role === "public") {
          return { role, approved, approvalStatus, isAdmin };
        }
      }

      // Default to public if no role is set
      console.log("No role found in Firestore, defaulting to public");
      return { role: "public", approved: true, approvalStatus: "approved", isAdmin: false };
    } catch (error) {
      console.error("Error fetching user role:", error);
      return { role: "public", approved: true, approvalStatus: "approved", isAdmin: false };
    }
  };

  const refreshUserRole = async () => {
    if (currentUser) {
      const userData = await fetchUserRole(currentUser.uid);
      setUserRole(userData.role);
      setIsETSEmployee(userData.role === "ets");
      setIsVendor(userData.role === "vendor");
      setIsApproved(userData.approved);
      setApprovalStatus(userData.approvalStatus);
      setIsAdmin(userData.isAdmin);
    }
  };

  useEffect(() => {
    // Subscribe to auth state changes and fetch role from Firestore
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch role and approval status from Firestore
        const userData = await fetchUserRole(user.uid);
        setUserRole(userData.role);
        setIsETSEmployee(userData.role === "ets");
        setIsVendor(userData.role === "vendor");
        setIsApproved(userData.approved);
        setApprovalStatus(userData.approvalStatus);
        setIsAdmin(userData.isAdmin);
      } else {
        // User is signed out
        setUserRole(null);
        setIsETSEmployee(false);
        setIsVendor(false);
        setIsApproved(false);
        setApprovalStatus(null);
        setIsAdmin(false);
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
      setIsApproved(false);
      setApprovalStatus(null);
      setIsAdmin(false);
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
    isApproved,
    approvalStatus,
    isAdmin,
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
