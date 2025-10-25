import './App.css';
import GridDistortion from './GridDistortion.tsx';
import RollingGallery from './RollingGallery.tsx';
import Carousel from './Carousel.tsx';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <section className="relative w-full h-screen overflow-hidden">
        <GridDistortion
          imageSrc="/public/shapes.jpg"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="absolute inset-0"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-1 pointer-events-none" 
             aria-hidden="true"></div>

        <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none px-4">
          <div className="text-center max-w-5xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl [text-shadow:_0_4px_16px_rgb(0_0_0_/_90%)] leading-tight">
              IV&V Project Management
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-10 drop-shadow-lg [text-shadow:_0_2px_12px_rgb(0_0_0_/_80%)] leading-relaxed font-medium max-w-4xl mx-auto">
              A comprehensive web application for managing and displaying project review reports and dashboards – 
              provided by the state's Independent Verification and Validation (IV&V) vendors.
            </p>
            
            <a href="#main-content" 
               className="pointer-events-auto inline-block px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg shadow-xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all text-lg"
               aria-label="Skip to main dashboard content">
              Access Dashboard
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-5 pointer-events-none animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 text-white opacity-75" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Main Content Area */}
      <main id="main-content" className="relative bg-gray-50 overflow-x-hidden" role="main">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-16 md:py-20">
          
          {/* Primary Section - Two Column Layout */}
          <section className="mb-20" aria-labelledby="primary-heading">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Column - IV&V Reports Card */}
              <article className="flex items-stretch order-2 lg:order-1">
                <div className="w-full bg-white rounded-xl shadow-lg p-8 lg:p-10 hover:shadow-xl transition-shadow border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-12 bg-blue-600 rounded-full" aria-hidden="true"></div>
                    <span className="text-sm font-bold tracking-wide text-blue-700 uppercase">
                      Office of Enterprise Technology Services
                    </span>
                  </div>
                  <h2 id="primary-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    Independent Verification and Validation Reports
                  </h2>
                  <p className="text-base lg:text-lg text-gray-700 mb-8 leading-relaxed">
                    Manage project review reports effectively. Access comprehensive IV&V reports to ensure your projects meet quality and compliance standards.
                  </p>
                  <a href="#reports" 
                     className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors"
                     aria-label="View all IV&V reports">
                    View Reports
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </article>

              <div className="flex items-center justify-center order-1 lg:order-2">
                    <RollingGallery autoplay={true} pauseOnHover={true} />
              </div>

            </div>
          </section>

          {/* Secondary Section - Feature Cards */}
          <section className="mb-20" aria-labelledby="features-heading">
            <header className="text-center mb-12">
              <h2 id="features-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Key Features
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive dashboard capabilities designed for efficient project management
              </p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature Card 1 */}
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-300">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors" aria-hidden="true">
                  <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Report Management</h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  Access and manage all IV&V reports in one centralized location with advanced search and filtering.
                </p>
                <a href="#reports" 
                   className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 focus:outline-none focus:underline"
                   aria-label="Learn more about report management">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </article>

              {/* Feature Card 2 */}
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-300">
                <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors" aria-hidden="true">
                  <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Analytics</h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  View comprehensive analytics and insights from your project data with real-time visualizations.
                </p>
                <a href="#analytics" 
                   className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 focus:outline-none focus:underline"
                   aria-label="Learn more about dashboard analytics">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </article>

              {/* Feature Card 3 */}
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-300">
                <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-200 transition-colors" aria-hidden="true">
                  <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vendor Integration</h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  Seamlessly integrate with state IV&V vendor systems and workflows for streamlined operations.
                </p>
                <a href="#integration" 
                   className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 focus:outline-none focus:underline"
                   aria-label="Learn more about vendor integration">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </article>
            </div>
          </section>

          {/* Tertiary Section - Recent Updates Carousel */}
          <section className="mb-16" aria-labelledby="updates-heading">
            <header className="text-center mb-12">
              <h2 id="updates-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Recent Updates
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Stay informed with the latest project developments and system enhancements
              </p>
            </header>
            
            <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg border border-gray-200">
              <Carousel
                baseWidth={300}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                loop={true}
                round={false}
              />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;