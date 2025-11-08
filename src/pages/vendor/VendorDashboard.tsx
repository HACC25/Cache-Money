import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ProjectCard from "../../components/VendorProjectCard";
import { sampleProjects, ProjectData } from "../../components/SampleData";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../services/firebase-config";

const VendorDashboard = () => {
  const [activeTab] = useState("assigned"); // "assigned" or "reports"
  const [assignedProjects, setAssignedProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    // Firestore query: only projects where vendorId == currentUser.uid
    const projectsQuery = query(
      collection(db, "projects"),
      where("vendorId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const firestoreProjects = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Unnamed Project",
            description: data.description || "",
            status: data.status || "Active",
            statusColor: data.statusColor || "#28a745",
            metric1: data.metric1 || "",
            metric2: data.metric2 || "",
            startDate: data.startDate || "",
            department: data.department || "",
            budget: data.budget || "",
            spent: data.spent || "",
            vendor: data.vendor || "",
            vendorId: data.vendorId || "",
            reports: data.reports || [],
          } as ProjectData;
        });

        setAssignedProjects(firestoreProjects);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching assigned projects:", error);

        // Fallback to sample projects if Firestore fails
        const filteredProjects = sampleProjects.filter(
          (project) => project.vendorId === currentUser.uid
        );
        setAssignedProjects(filteredProjects);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h6>STATE OF HAWAII - Office of Enterprise Technology Services</h6>
      <h1 className="mb-4" style={{ fontWeight: "800" }}>
        VENDOR DASHBOARD
      </h1>

      {activeTab === "assigned" && (
        <>
          <h2 className="mb-3">Projects assigned to you</h2>

          {assignedProjects.length === 0 ? (
            <div className="alert alert-info">
              No projects have been assigned to your vendor account yet.
            </div>
          ) : (
            assignedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </>
      )}

      {activeTab === "reports" && (
        <>
          <h2 className="mb-3">My Reports</h2>
          <div className="alert alert-info">
            This tab will show all reports you've created across all projects.
          </div>
        </>
      )}
    </div>
  );
};

export default VendorDashboard;
