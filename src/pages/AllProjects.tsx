import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { sampleProjects, ProjectData } from "../components/SampleData";

const AllProjects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    // Temporary: load from mock data
    setProjects(sampleProjects);

    // 🔥 Future Firestore logic goes here
    /*
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProjectData[];
      setProjects(projectList);
    });
    return () => unsubscribe();
    */
  }, []);

  return (
    <div className="container mt-5">
      <h6>STATE OF HAWAII - Office of Enterprise Technology Services</h6>
      <h1 className="mb-4" style={{ fontWeight: "800" }}>
        CURRENT ETS PROJECTS
      </h1>
      <div className="row">
        {projects.map((project) => (
          <div
            key={project.id}
            className="col-md-6 mb-4"
            style={{ paddingTop: "10px" }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
