import "./Landing.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase-config";

interface RecentProject {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  status?: string;
}

function Landing() {
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        // Get the 6 most recent projects
        const projectsQuery = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc"),
          limit(6)
        );
        const projectsSnapshot = await getDocs(projectsQuery);
        
        const projects: RecentProject[] = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Unnamed Project",
          description: doc.data().description || "No description available",
          createdAt: doc.data().createdAt,
          status: doc.data().status,
        }));
        
        setRecentProjects(projects);
      } catch (error) {
        console.error("Error fetching recent projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchRecentProjects();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white">

        {/* Wave Pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='1440' height='320' viewBox='0 0 1440 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2318828c' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat'
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 z-5 flex items-center justify-center px-4">
          <div className="text-center max-w-6xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 leading-tight">
              Independent Verification and Validation Dashboard
            </h1>

            <div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              <span className="text-sm font-semibold tracking-wide text-gray-900">
                State of Hawaii • Enterprise Technology Services
              </span>
            </div>

            <div 
              className="max-w-4xl mx-auto mb-12 rounded-2xl p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(30px) saturate(200%)',
                WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)'
              }}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-900 leading-relaxed font-semibold">
                A comprehensive web application for managing and displaying project review reports and dashboards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main
        id="main-content"
        className="relative bg-gray-50 overflow-x-hidden"
        role="main"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-16 md:py-20">

          {/* Section - Feature Cards */}
          <section className="mb-20" aria-labelledby="features-heading">
            <header className="text-center mb-12">
              <h2
                id="features-heading"
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              >
                Key Features
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive dashboard capabilities designed for
                efficient project management
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature Card 1 */}
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-teal-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-teal-300">
                <div
                  className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Report Management
                </h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  Access and manage all IV&V reports in one centralized location
                  with advanced search and filtering.
                </p>
              </article>

              {/* Feature Card 2 */}
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-teal-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-teal-300">
                <div
                  className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Real-time Analytics
                </h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  Monitor project metrics with interactive dashboards
                  providing real-time insights.
                </p>
              </article>

              {/* Feature Card 3 */}
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-teal-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-teal-300">
                <div
                  className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Vendor Collaboration
                </h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  Streamline communication between departments, vendors, and
                  stakeholders with integrated tools.
                </p>
              </article>
            </div>
          </section>

          {/* Projects Section */}
          <section
            className="mb-20"
            id="projects"
            aria-labelledby="projects-heading"
          >
            <header className="text-center mb-12">
              <h2
                id="projects-heading"
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              >
                Recent Projects
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Browse the latest state IT projects undergoing independent verification and validation
              </p>
            </header>

            {loadingProjects ? (
              <div className="flex justify-center py-12">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading projects...</span>
                </div>
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No projects available yet.</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-4">
                {recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/project/${project.id}`}
                    className="project-card flex items-center gap-3 px-5 py-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-teal-300 transition-all group focus:outline-none focus:ring-2 focus:ring-teal-500 no-underline"
                    aria-label={`View details for ${project.name}`}
                  >
                    {/* Folder Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                      <svg
                        className="w-5 h-5 text-teal-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-teal-700 transition-colors truncate">
                          {project.name}
                        </h3>
                        {project.status && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-green-800">
                            {project.status}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mb-1" aria-label={`Created on ${project.createdAt?.toDate?.().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) || 'Recent'}`}>
                        {project.createdAt?.toDate?.().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) || 'Recent'}
                      </div>
                      {project.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            )}

            {/* View All Projects Button */}
            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="view-all-btn inline-flex items-center gap-2 px-8 py-4 bg-teal-700 !text-white font-semibold rounded-lg hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 focus:outline-none transition-all hover:scale-105 shadow-lg"
              >
                View All Projects
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Landing;
