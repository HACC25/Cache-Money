import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase-config";
import { EDIT_PROJECT_STATUSES, getStatusColor } from "./EditProjectStatuses";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: string;
  statusColor?: string;
  vendorId?: string;
}

const EditProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vendors, setVendors] = useState<{ id: string; name: string }[]>([]);
  const [vendorId, setVendorId] = useState("");

  useEffect(() => {
    const loadVendors = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "vendor"));
        const querySnapshot = await getDocs(q);
        const vendorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().displayName || doc.data().email || "Unnamed Vendor",
        }));
        setVendors(vendorList);
      } catch (err) {
        console.error("Error loading vendors:", err);
      }
    };

    const loadProject = async () => {
      if (!projectId) return;

      try {
        const docRef = doc(db, "projects", projectId);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const projectData = { id: snap.id, ...snap.data() } as ProjectData;
          setProject(projectData);
          // Set the current vendor ID if it exists
          setVendorId(projectData.vendorId || "");
        } else {
          alert(
            "This is a sample project and cannot be edited. Only Firestore projects can be edited."
          );
          navigate(`/project/${projectId}`);
        }
      } catch (err) {
        console.error("Error loading project:", err);
        alert("Error loading project");
      } finally {
        setLoading(false);
      }
    };

    loadVendors();
    loadProject();
  }, [projectId, navigate]);

  const handleSave = async () => {
    if (!projectId || !project) return;
    setSaving(true);

    try {
      const docRef = doc(db, "projects", projectId);
      await updateDoc(docRef, {
        name: project.name,
        description: project.description,
        status: project.status,
        statusColor: getStatusColor(project.status),
        vendorId: vendorId || null,
        updatedAt: new Date(),
      });

      alert("Project updated successfully!");
      navigate(`/project/${projectId}`);
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Error updating project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectId) return;
    if (
      !window.confirm(
        "Are you sure you want to delete this project? This will also delete all associated reports."
      )
    )
      return;

    try {
      const docRef = doc(db, "projects", projectId);
      await deleteDoc(docRef);
      alert("Project deleted successfully");
      navigate("/projects");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Error deleting project");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="container mt-5 mb-5">
      <h2>Edit Project</h2>
      <p className="text-muted">Project ID: {projectId}</p>

      <div className="card mt-4">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              value={project.name || ""}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={project.description || ""}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              rows={4}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Assign to Vendor</label>
            <select
              className="form-control"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
            >
              <option value="">Select a Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={project.status || "Active"}
              onChange={(e) =>
                setProject({ ...project, status: e.target.value })
              }
            >
              {EDIT_PROJECT_STATUSES.map((statusOption) => (
                <option key={statusOption.value} value={statusOption.value}>
                  {statusOption.label}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Project
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate(`/project/${projectId}`)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
