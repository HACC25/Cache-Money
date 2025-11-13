import { useEffect, useState } from "react";
import { ProjectData } from "../../components/SampleData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase-config";
import ButtonGroup from "../../components/ButtonGroup";
import AllProjectsTable from "../../components/AllProjectsTable";
import Button from "../../components/Button";
import { fetchProjectsByVendor } from "../../services/firebaseDataService";

interface Vendor {
  vendor_id: string;
  vendor_name: string;
  vendor_projects: ProjectData[];
}

const ETSDashboard = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVendors = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "vendor"));
        const querySnapshot = await getDocs(q);

        const vendorList = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const projects = await fetchProjectsByVendor(doc.id);
            return {
              vendor_id: doc.id,
              vendor_name:
                doc.data().displayName || doc.data().email || "Unnamed Vendor",
              vendor_projects: projects,
            };
          })
        );

        setVendors(vendorList);
      } catch (err) {
        console.error("Error loading vendors:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVendors();
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
      <div className="row py-1">
        <div className="col">
          <h1 className="pt-md-2">Project Management</h1>
        </div>
        <div className="col-md-auto">
          <Button link="/projects/new">Create New Project</Button>
        </div>
      </div>
      <h5>Create, edit, delete, and assign projects to vendors</h5>

      <div className="pb-4 pb-md-5 pb-lg-5">
        <AllProjectsTable vendors={vendors}></AllProjectsTable>
      </div>
    </div>
  );
};

export default ETSDashboard;
