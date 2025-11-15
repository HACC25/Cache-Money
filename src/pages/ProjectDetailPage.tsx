import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetail";
import { ProjectData, ProjectReport } from "../components/SampleData";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { Timestamp } from "firebase/firestore";

// Type to handle both Firestore and sample data reports
type ReportData = ProjectReport & {
  createdAt?: Timestamp;
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirestoreProject, setIsFirestoreProject] = useState(false);
  const { isETSEmployee, isVendor, currentUser } = useAuth();

  useEffect(() => {
    if (!projectId) return;

    const loadProject = async () => {
      console.log("Looking for project with ID:", projectId);

      // First, try to load from Firestore
      try {
        const projectRef = doc(db, "projects", projectId);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          const data = projectSnap.data();
          console.log("Found project in Firestore:", data.name);
          setIsFirestoreProject(true);

          setProject({
            id: projectId,
            name: data.name || "Unnamed Project",
            description: data.description || "",
            status: data.status || "Active",
            statusColor: data.statusColor || "#28a745",
            metric1: data.metric1 || "",
            metric2: data.metric2 || "",
            startDate: data.startDate || "",
            endDate: data.endDate || "",
            department: data.department || "",
            budget: data.budget || "",
            spent: data.spent || "",
            vendor: data.vendor || "",
            vendorId: data.vendorId || "",
            reports: [],
          } as ProjectData);

          // Set up real-time listener for reports
          const reportsRef = collection(db, "projects", projectId, "reports");
          const unsubscribe = onSnapshot(reportsRef, (snapshot) => {
            const reportsList = snapshot.docs.map(
              (doc) =>
                ({
                  id: doc.id,
                  ...doc.data(),
                  date: doc.data().createdAt?.toDate?.() || new Date(),
                } as ReportData)
            );
            console.log("Loaded reports from Firestore:", reportsList.length);
            setReports(reportsList);
          });

          setIsLoading(false);
          return unsubscribe;
        }
      } catch (error) {
        console.error("Error loading from Firestore:", error);
      }

      setIsLoading(false);
    };

    const unsubscribe = loadProject();
    return () => {
      if (unsubscribe instanceof Promise) {
        unsubscribe.then((unsub) => unsub?.());
      }
    };
  }, [projectId]);

  if (isLoading) {
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

  if (!project) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Project not found. Please check the URL or return to the projects
          page.
        </div>
      </div>
    );
  }

  // Check if the current vendor is assigned to this project after project is loaded
  const isVendorAssignedToProject =
    isVendor && project.vendorId === currentUser?.uid;

  return (
    <div className="container mt-5">
      <div style={{ paddingBottom: "20px" }}>
        <Link
          to={
            isVendor
              ? "/vendor/dashboard"
              : isETSEmployee
              ? "/ets/dashboard"
              : "/projects"
          }
          className="btn btn-secondary me-2 mb-2"
        >
          Back to{" "}
          {isVendor
            ? "Vendor Dashboard"
            : isETSEmployee
            ? "ETS Dashboard"
            : "All Projects"}
        </Link>
      </div>
      <h6>STATE OF HAWAII - Office of Enterprise Technology Services</h6>

      <div className="d-flex justify-content-between align-items-start mb-4">
        <h1 style={{ fontWeight: "800" }}>{project.name}</h1>
        <div>
          {isFirestoreProject && isETSEmployee && (
            <Link
              to={`/project/${projectId}/edit`}
              className="btn btn-secondary me-2"
            >
              Edit Project
            </Link>
          )}
          {isFirestoreProject && isVendorAssignedToProject ? (
            <Link
              to={`/project/${projectId}/report/new`}
              className="btn btn-primary"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Monthly Report
            </Link>
          ) : isFirestoreProject && isVendor && !isVendorAssignedToProject ? (
            <span
              className="badge bg-warning text-white py-2 mt-2"
              style={{ borderRadius: "30px" }}
            >
              Not Assigned to Your Vendor Account
            </span>
          ) : null}
        </div>
      </div>

      {/* Project info card */}
      <div className="card mb-4">{/* Project details */}</div>

      <h2 className="mt-5 mb-4">IV&V Monthly Reports</h2>

      {reports && reports.length > 0 ? (
        <div style={{ paddingBottom: "30px" }}>
          {/* Sort reports by date (most recent first) */}
          {[...reports]
            .sort((a, b) => {
              const dateA = a.date || a.createdAt?.toDate?.() || new Date(0);
              const dateB = b.date || b.createdAt?.toDate?.() || new Date(0);
              return new Date(dateB).getTime() - new Date(dateA).getTime();
            })
            .map((report, index) => (
              <div key={report.id} className="mb-4">
                <ProjectDetail
                  report={report}
                  project={project}
                  index={index + 1}
                />
              </div>
            ))}
        </div>
      ) : (
        <div className="alert alert-info">
          No reports available for this project yet.
          {isVendorAssignedToProject &&
            " Click 'Add Report' to create the first report."}
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
