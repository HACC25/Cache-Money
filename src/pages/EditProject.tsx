import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase-config';

interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: string;
  statusColor?: string;
}

const EditProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return;
      
      try {
        const docRef = doc(db, 'projects', projectId);
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          setProject({ id: snap.id, ...snap.data() } as ProjectData);
        } else {
          alert('This is a sample project and cannot be edited. Only Firestore projects can be edited.');
          navigate(`/project/${projectId}`);
        }
      } catch (err) {
        console.error('Error loading project:', err);
        alert('Error loading project');
      } finally {
        setLoading(false);
      }
    };
    
    loadProject();
  }, [projectId, navigate]);

  const handleSave = async () => {
    if (!projectId || !project) return;
    setSaving(true);
    
    try {
      const docRef = doc(db, 'projects', projectId);
      await updateDoc(docRef, {
        name: project.name,
        description: project.description,
        status: project.status,
        statusColor: project.status === 'Active' ? '#28a745' : '#6c757d',
        updatedAt: new Date(),
      });
      
      alert('Project updated successfully!');
      navigate(`/project/${projectId}`);
    } catch (err) {
      console.error('Error updating project:', err);
      alert('Error updating project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectId) return;
    if (!window.confirm('Are you sure you want to delete this project? This will also delete all associated reports.')) return;
    
    try {
      const docRef = doc(db, 'projects', projectId);
      await deleteDoc(docRef);
      alert('Project deleted successfully');
      navigate('/projects');
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Error deleting project');
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
              value={project.name || ''} 
              onChange={(e) => setProject({ ...project, name: e.target.value })} 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              value={project.description || ''} 
              onChange={(e) => setProject({ ...project, description: e.target.value })} 
              rows={4}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select 
              className="form-control" 
              value={project.status || 'Active'} 
              onChange={(e) => setProject({ ...project, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Planning">Planning</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="d-flex gap-2">
            <button 
              className="btn btn-primary" 
              onClick={handleSave} 
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              className="btn btn-danger" 
              onClick={handleDelete}
            >
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
