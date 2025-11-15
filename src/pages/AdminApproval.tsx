import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminApproval.css";

interface PendingUser {
  uid: string;
  email: string;
  role: "ets" | "vendor";
  createdAt: { seconds: number; toDate?: () => Date } | undefined;
  approvalStatus: string;
}

const AdminApproval = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);
  const { isAdmin, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not admin, set loading false once we know
    if (!isAdmin && currentUser !== null) {
      navigate("/");
    } else if (isAdmin) {
      setLoading(false);
    }
  }, [isAdmin, currentUser, navigate]);

  useEffect(() => {
    if (currentUser && isAdmin) {
      fetchPendingUsers();
    }
  }, [currentUser, isAdmin]);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("approvalStatus", "==", "pending")
      );
      const querySnapshot = await getDocs(q);

      const users: PendingUser[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Only show ETS and vendor users
        if (data.role === "ets" || data.role === "vendor") {
          users.push({
            uid: doc.id,
            email: data.email,
            role: data.role,
            createdAt: data.createdAt,
            approvalStatus: data.approvalStatus,
          });
        }
      });

      // Sort by creation date (newest first)
      users.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });

      setPendingUsers(users);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      alert("Failed to load pending users");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    if (!confirm("Are you sure you want to approve this user?")) {
      return;
    }

    try {
      setProcessingUserId(userId);
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        approved: true,
        approvalStatus: "approved",
      });

      alert("User approved successfully!");
      // Refresh the list
      await fetchPendingUsers();
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Failed to approve user");
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleDeny = async (userId: string) => {
    if (!confirm("Are you sure you want to deny this user? They will need to contact support.")) {
      return;
    }

    try {
      setProcessingUserId(userId);
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        approved: false,
        approvalStatus: "denied",
      });

      alert("User denied.");
      // Refresh the list
      await fetchPendingUsers();
    } catch (error) {
      console.error("Error denying user:", error);
      alert("Failed to deny user");
    } finally {
      setProcessingUserId(null);
    }
  };

  const formatDate = (timestamp: { seconds: number; toDate?: () => Date } | undefined) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="admin-approval-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-approval-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You do not have permission to view this page.</p>
          <p className="text-muted">Only authorized administrators can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-approval-container">
      <div className="admin-approval-card">
        <div className="header">
          <h1>User Approval Dashboard</h1>
          <p className="subtitle">Review and approve pending ETS and Vendor accounts</p>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="no-pending">
            <p>No pending approvals</p>
            <p className="text-muted">All user accounts have been processed.</p>
          </div>
        ) : (
          <div className="pending-users-list">
            <div className="count-badge">
              {pendingUsers.length} pending {pendingUsers.length === 1 ? "user" : "users"}
            </div>

            {pendingUsers.map((user) => (
              <div key={user.uid} className="user-card">
                <div className="user-info">
                  <div className="user-email">
                    <strong>{user.email}</strong>
                  </div>
                  <div className="user-details">
                    <span className={`role-badge role-${user.role}`}>
                      {user.role.toUpperCase()}
                    </span>
                    <span className="created-date">
                      Requested: {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={() => handleApprove(user.uid)}
                    disabled={processingUserId === user.uid}
                    className="btn-approve"
                  >
                    {processingUserId === user.uid ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleDeny(user.uid)}
                    disabled={processingUserId === user.uid}
                    className="btn-deny"
                  >
                    {processingUserId === user.uid ? "Processing..." : "Deny"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="footer">
          <button onClick={() => navigate("/")} className="btn-back">
            <i className="bi bi-arrow-left"></i> Back to Home
          </button>
          <button onClick={fetchPendingUsers} className="btn-refresh" disabled={loading}>
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminApproval;
