import "./Landing.css";
import React from "react";
import { Link } from "react-router-dom";
import GridDistortion from "../components/GridDistortion";
import RollingGallery from "../components/RollingGallery";

function Landing() {
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

        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-900/50 to-blue-900/60 z-1 pointer-events-none"
          aria-hidden="true"
        />

        <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none px-4">
          <div className="text-center max-w-6xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-8 leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                IV&V
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent drop-shadow-2xl">
                Project Management
              </span>
            </h1>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <span className="text-sm font-semibold text-white/90 tracking-wide">
                State of Hawaii • Enterprise Technology Services
              </span>
            </div>

            <div className="max-w-4xl mx-auto mb-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-medium">
                A comprehensive web application for managing and displaying
                project review reports and dashboards – provided by the state's
                Independent Verification and Validation (IV&V) vendors.
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-5 pointer-events-none"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <svg
              className="w-6 h-6 text-white/80"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
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
          {/* Primary Section*/}
          <section className="mb-20" aria-labelledby="primary-heading">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - IV&V Reports Card */}
              <article className="flex items-stretch order-2 lg:order-1">
                <div className="w-full bg-white rounded-xl shadow-lg p-8 lg:p-10 hover:shadow-xl transition-shadow border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-1 h-12 bg-blue-600 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold tracking-wide text-blue-700 uppercase">
                      Office of Enterprise Technology Services
                    </span>
                  </div>

                  <h2
                    id="primary-heading"
                    className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                  >
                    Independent Verification and Validation Reports
                  </h2>

                  <p className="text-base lg:text-lg text-gray-700 mb-8 leading-relaxed">
                    Manage project review reports effectively. Access
                    comprehensive IV&V reports to ensure your projects meet
                    quality and compliance standards.
                  </p>

                  <a
                    href="#reports"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 !text-white font-semibold rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors"
                    aria-label="View all IV&V reports"
                  >
                    View Reports
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
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
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-300">
                <div
                  className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7 text-blue-700"
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
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-300">
                <div
                  className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7 text-blue-700"
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
                  Monitor project metrics and KPIs with interactive dashboards
                  providing real-time insights.
                </p>
              </article>

              {/* Feature Card 3 */}
              <article className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all focus-within:ring-4 focus-within:ring-blue-300">
                <div
                  className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-7 text-blue-700"
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

          {/* Reports Section */}
          <section
            className="mb-20"
            id="reports"
            aria-labelledby="reports-heading"
          >
            <header className="text-center mb-12">
              <h2
                id="reports-heading"
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              >
                Recent IV&V Reports
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Browse the latest independent verification and validation
                reports for ongoing state IT projects
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Report Card 1 */}
              <a
                href="#"
                className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  Tax Modernization System - Phase II Review
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Comprehensive review of the second phase implementation of the
                  state's tax system modernization project, including system
                  integration and security assessments.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>October 15, 2025</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </a>

              {/* Report Card 2 */}
              <a
                href="#"
                className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  Healthcare Portal Security Assessment
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Independent security validation of the state healthcare
                  portal, evaluating compliance with HIPAA standards and
                  cybersecurity best practices.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>October 12, 2025</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </a>

              {/* Report Card 3 */}
              <a
                href="#"
                className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  DMV Digital Transformation Milestone Report
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Progress review of the Department of Motor Vehicles digital
                  transformation initiative, examining online services rollout
                  and user adoption metrics.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>October 8, 2025</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </a>

              {/* Report Card 4 */}
              <a
                href="#"
                className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  Public Records Management System Update
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Quarterly validation of the statewide public records
                  management system, assessing data integrity, accessibility
                  compliance, and storage optimization.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>October 5, 2025</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </a>

              {/* Report Card 5 */}
              <a
                href="#"
                className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  E-Permitting System Implementation Review
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Review of the electronic permitting system implementation,
                  assessing workflow efficiency, user interface design, and
                  regulatory compliance.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>September 28, 2025</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </a>

              {/* Report Card 6 */}
              <a
                href="#"
                className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg
                        className="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  Disaster Recovery System - Annual Validation
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Annual validation of the state disaster recovery and business
                  continuity systems, testing failover procedures and data
                  backup integrity.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>September 22, 2025</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </a>
            </div>

            {/* View All Reports Button */}
            <div className="text-center mt-12">
              <Link
                to="/reports"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 !text-white font-semibold rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all hover:scale-105 shadow-lg"
              >
                View All Reports
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Landing;
