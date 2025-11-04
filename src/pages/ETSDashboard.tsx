import { useEffect, useState } from "react";
import { sampleProjects, ProjectData } from "../components/SampleData";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase-config";

const ETSDashboard = () => {
  // @ts-ignore -- will use projects later
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from Firestore with real-time updates
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
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
            reports: data.reports || [],
          } as ProjectData;
        });

        // Combine Firestore projects with sample projects
        // Firestore projects first, then sample projects
        const allProjects = [...firestoreProjects, ...sampleProjects];
        setProjects(allProjects);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching projects:", error);
        // Fallback to sample projects if Firestore fails
        setProjects(sampleProjects);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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
        ETS DASHBOARD ETS DASHBOARD
      </h1>
      <h1>All Projects</h1>
    </div>
  );
};

export default ETSDashboard;
