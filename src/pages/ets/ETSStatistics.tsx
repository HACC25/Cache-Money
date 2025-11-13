import { useEffect, useState } from "react";
import { sampleProjects, ProjectData } from "../../components/SampleData";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase-config";
import ButtonGroup from "../../components/ButtonGroup";
import Metrics from "../../components/Metrics";

const ETSStatistics = () => {
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

  const onTrackCount = projects.filter(
    (project) => project.status === "On Track"
  ).length;

  const atRiskCount = projects.filter(
    (project) => project.status === "At Risk"
  ).length;

  const criticalCount = projects.filter(
    (project) => project.status === "Critical"
  ).length;

  const activeCount = projects.filter(
    (project) => project.status != "Completed"
  ).length;

  const completeCount = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  // How to count number of missing reports

  const reportCount = projects.filter((project) => project.reports).length;

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
      <h1 style={{ fontWeight: "800" }}>ETS DASHBOARD</h1>
      <ButtonGroup
        content={[
          { name: "Projects", link: "/ets/dashboard" },
          { name: "Statistics", link: "/ets/statistics" },
        ]}
      ></ButtonGroup>

      <h1 className="py-1 pb-md-3 pb-lg-4">Project Statistics</h1>
      <div className="container">
        <div className="row justify-content-center gx-3 gx-md-4 gx-lg-5">
          <div className="col-4">
            <Metrics
              type="primary"
              value={activeCount}
              metric="Active Projects"
            ></Metrics>
          </div>
          <div className="col-4">
            <Metrics
              type="primary"
              value={completeCount}
              metric="Completed Projects"
            ></Metrics>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row row justify-content-center gx-3 gx-md-4 gx-lg-5">
          <div className="col-4 gy-0 gy-md-2 gy-lg-4">
            <Metrics
              type="primary"
              value={reportCount}
              metric="Total Reports"
            ></Metrics>
          </div>
          <div className="col-4 gy-0 gy-md-2 gy-lg-4">
            <Metrics
              type="primary"
              value={5}
              metric="Missing Reports"
            ></Metrics>
          </div>
        </div>
      </div>

      <h1 className="py-1 pt-md-4 pb-md-3 py-lg-4">Projects By Status</h1>
      <div className="container">
        <div className="row pb-4 pb-md-5 pb-lg-5">
          <div className="col">
            <Metrics
              type="success"
              value={onTrackCount}
              metric="Status: On Track"
            ></Metrics>
          </div>
          <div className="col">
            <Metrics
              type="warning"
              value={atRiskCount}
              metric="Status: At Risk"
            ></Metrics>
          </div>
          <div className="col">
            <Metrics
              type="danger"
              value={criticalCount}
              metric="Status: Critical"
            ></Metrics>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETSStatistics;
