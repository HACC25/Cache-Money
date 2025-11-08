import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { sampleProjects, ProjectData } from "../components/SampleData";
import { collection, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { useAuth } from "../contexts/AuthContext";

const AllProjects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    // Step 1: fetch the current user's role from Firestore
    const fetchRole = async () => {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role);
      } else {
        setRole(null);
      }
    };

    fetchRole();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !role) return;

    let projectsQuery;

    if (role === "ets") {
      // ETS employees see all projects
      projectsQuery = collection(db, "projects");
    } else if (role === "vendor") {
      // Vendors only see projects assigned to them
      projectsQuery = query(
        collection(db, "projects"),
        where("vendorId", "==", currentUser.uid)
      );
    } else {
      setProjects([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const firestoreProjects = snapshot.docs.map((doc) => {
          console.log(snapshot.docs.map(doc => doc.data()));
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

        const allProjects = [...firestoreProjects, ...sampleProjects];
        setProjects(allProjects);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching projects:", error);
        setProjects(sampleProjects);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, role]);

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
        CURRENT ETS PROJECTS
      </h1>

      {projects.length === 0 ? (
        <div className="alert alert-info">
          No projects available yet. ETS employees can create new projects.
        </div>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div key={project.id} className="col-md-6 mb-4" style={{ paddingTop: "10px" }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProjects;
