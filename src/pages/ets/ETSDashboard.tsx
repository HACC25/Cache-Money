import { useEffect, useState } from "react";
import { sampleProjects, ProjectData } from "../../components/SampleData";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase-config";
import ButtonGroup from "../../components/ButtonGroup";
import AllProjectsTable from "../../components/AllProjectsTable";

const sample_data = [
  {
    vendor_name: "Health Systems Technology Partners",
    vendor_projects: [
      {
        name: "BHA System Modernization",
        calculated_risk: "Low",
        schedule: 50,
        total_reports: 10,
        description:
          "Modernization of behavioral health management systems to improve service delivery and patient outcomes across Hawaii.",
        startDate: "2023-06-15",
        endDate: "Ongoing",
        budget: 10000000,
        spent: 3000000,
      },
      {
        name: "Test 2",
        calculated_risk: "High",
        schedule: 10,
        total_reports: 2,
        description: "blah blah blah blah bleh bleh bleh",
        startDate: "2023-06-15",
        endDate: "2024-08-09",
        budget: 95000000,
        spent: 83888111,
      },
    ],
  },
  {
    vendor_name: "Test Vendor",
    vendor_projects: [
      {
        name: "BHA System Modernization",
        calculated_risk: "Low",
        schedule: 50,
        total_reports: 10,
        description:
          "Modernization of behavioral health management systems to improve service delivery and patient outcomes across Hawaii.",
        startDate: "2023-06-15",
        endDate: "Ongoing",
        budget: 10000000,
        spent: 3000000,
      },
      {
        name: "Test 2",
        calculated_risk: "High",
        schedule: 10,
        total_reports: 2,
        description: "blah blah blah blah bleh bleh bleh",
        startDate: "2023-06-15",
        endDate: "2024-08-09",
        budget: 95000000,
        spent: 238881,
      },
    ],
  },
];

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
      <h1 style={{ fontWeight: "800" }}>ETS DASHBOARD</h1>
      <div className="row">
        <ButtonGroup
          content={[
            { name: "Projects", link: "/ets/dashboard" },
            { name: "Statistics", link: "/ets/statistics" },
          ]}
        ></ButtonGroup>
      </div>
      <h1 className="py-1 pb-md-3 pb-lg-4">Project Management</h1>
      <h5>Create, edit, delete, and assign projects to vendors</h5>
      <div className="pb-4 pb-md-5 pb-lg-5">
        <AllProjectsTable vendors={sample_data}></AllProjectsTable>
      </div>
    </div>
  );
};

export default ETSDashboard;
