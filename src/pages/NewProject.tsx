import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase-config';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';


const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [saving, setSaving] = useState(false);
  const [vendors, setVendors] = useState<{ id: string; name: string }[]>([]);
  const [vendorId, setVendorId] = useState('');

  useEffect(() => {
    const loadVendors = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'vendor'));
      const querySnapshot = await getDocs(q);
      const vendorList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().displayName || doc.data().email || 'Unnamed Vendor',
      }));
      setVendors(vendorList);
    };

    loadVendors();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const projectsRef = collection(db, 'projects');
      const docRef = await addDoc(projectsRef, {
        name,
        description,
        status,
        statusColor: status === 'Active' ? '#28a745' : '#6c757d',
        createdBy: currentUser ? currentUser.uid : null,
        createdByEmail: currentUser ? currentUser.email : null,
        vendorId: vendorId || null,
        createdAt: serverTimestamp(),
      });
      
      alert('Project created successfully!');
      navigate(`/project/${docRef.id}`);
    } catch (err) {
      console.error('Error creating project:', err);
      alert('Error creating project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Project</h2>
      <p className="text-muted">Add a new State of Hawaii IT project for IV&V tracking</p>
      
      <div className="card mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Project Name</label>
              <input 
                type="text"
                className="form-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Tax System Modernization"
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea 
                className="form-control" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={4}
                placeholder="Brief description of the project..."
                required
              />
            </div>
                        
            <div className="mb-3">
              <label className="form-label">Assign to Vendor</label>
              <select 
                className="form-control" 
                value={vendorId} 
                onChange={(e) => setVendorId(e.target.value)}
                required
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
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Planning">Planning</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={saving}
              >
                {saving ? 'Creating...' : 'Create Project'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/projects')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
