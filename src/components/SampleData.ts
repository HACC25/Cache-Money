export interface ProjectDeliverable {
  id: string;
  name: string;
  status: "Not Started" | "In Progress" | "Completed";
  description: string;
}

export interface ProjectAssessment {
  sprintPlanning: {
    rating: "Low" | "Medium" | "High";
    description: string;
  };
  userStoryValidation: {
    rating: "Low" | "Medium" | "High";
    description: string;
  };
  testPracticeValidation: {
    rating: "Low" | "Medium" | "High";
    description: string;
  };
}

export interface ProjectIssue {
  id: string;
  name: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  likelihood: "High" | "Medium" | "Low";
  riskRating: number;
  dateRaised: string;
  recommendation: string;
  status: "Open" | "Closed";
  age?: number;
}

export interface ProjectReport {
  id: string;
  projectId: string;
  month: string;
  date: string;
  background: string;
  assessment: {
    sprintPlanning: {
      rating: string;
      description: string;
    };
    userStoryValidation?: {
      rating: string;
      description: string;
    };
    testPracticeValidation?: {
      rating: string;
      description: string;
    };
  };

  issues: ProjectIssue[];
  scheduleStatus: {
    status: "Ahead" | "OnTime" | "Late";
    description: string;
  };
  scheduleData?: {
    baseline?: {
      expectedDate: string;
    };
    current: {
      projectedDate: string;
    };
  };

  varianceDays?: number;
  financials: {
    originalAmount: number;
    paidToDate: number;
    description?: string;
  };
  scopeStatus: {
    completedDeliverables: number;
    totalDeliverables: number;
    deliverables: ProjectDeliverable[];
  };
}

export interface ProjectData {
  id: string;
  name: string;
  status: "On Track" | "At Risk" | "Critical" | "Active" | "Completed";
  statusColor: string;
  metric1: string;
  metric2: string;
  description: string;
  department: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  vendor: string;
  vendorId?: string;
  createdAt?: string | { seconds: number };
  reports: ProjectReport[];
}

export interface Vendor {
  vendor_id: string;
  vendor_name: string;
  vendor_projects: ProjectData[];
}

/*
export const sampleProjects: Array<ProjectData> = [
  {
    id: "1",
    name: "BHA System Modernization",
    status: "At Risk",
    statusColor: "#FBC02D",
    metric1: "Completion: 65%",
    metric2: "Reports: 2",
    description:
      "Modernization of behavioral health management systems to improve service delivery and patient outcomes across Hawaii.",
    department: "Department of Health - Behavioral Health Administration",
    startDate: "2023-06-15",
    budget: 10000000,
    spent: 3000000,
    vendor: "Health Systems Technology Partners",
    vendorId: "vendor1",
    reports: [
      {
        id: "report-1-1",
        projectId: "1",
        month: "October 2025",
        date: "2025-10-31",
        background:
          "The project continues to make progress with the next system release scheduled for 10/1/2025. The project continues to analyze and document the root cause of high-priority defects to identify common development problem areas and reduce recurring defects. BHA continues to actively recruit for a supervisory role for the project team. This may help alleviate the workload of team members and enhance overall productivity on project tasks.",
        assessment: {
          sprintPlanning: {
            rating: "Low",
            description:
              "BHA has initiated a redistribution of development responsibilities across the team to reduce workload concentration and maintain project momentum. The team has addressed the bottleneck, and access provisioning for additional members is in progress to support this transition.",
          },
          userStoryValidation: {
            rating: "Low",
            description:
              "There are no active findings in the User Story (US) Validation category, which remains Green (low criticality) for this reporting period. IV&V will continue to monitor the US development and validation process in upcoming reporting periods.",
          },
          testPracticeValidation: {
            rating: "Medium",
            description:
              "The project continues to strengthen regression testing by enhancing automated scripts and supporting DDD's transition to owning test script maintenance. Now that BHA's Tosca license has been renewed, the Tosca SME has resumed automation efforts.",
          },
        },
        issues: [
          {
            id: "issue-1-1-1",
            description:
              "The lack of comprehensive automated regression testing has likely led to post production defects, causing user frustration.",
            impact: "Low",
            likelihood: "Low",
            riskRating: 2,
            dateRaised: "2025-10-24",
            recommendation:
              "To ensure effective Tosca testing, it is crucial for both divisions to align on a unified resource allocation strategy. Given the limited availability of resources, open communication and consensus-building are essential for optimizing tester utilization.",
            status: "Open",
          },
          {
            id: "issue-1-1-2",
            description:
              "The lack of comprehensive automated regression testing has likely led to post production defects, causing user frustration.",
            impact: "Medium",
            likelihood: "High",
            riskRating: 5,
            dateRaised: "2023-01-19",
            recommendation:
              "To ensure effective Tosca testing, it is crucial for both divisions to align on a unified resource allocation strategy. Given the limited availability of resources, open communication and consensus-building are essential for optimizing tester utilization.",
            status: "Closed",
          },
        ],
        scheduleStatus: {
          baselineEndDate: "2026-06-30",
          currentEndDate: "2026-07-15",
        },
        financials: {
          originalAmount: 10000000,
          paidToDate: 3000000,
        },
        scopeStatus: {
          completedDeliverables: 2,
          totalDeliverables: 4,
          deliverables: [
            {
              id: "del-1-1",
              name: "Deliverable 1",
              status: "In Progress",
              description: "Thing",
            },
            {
              id: "del-1-2",
              name: "Deliverable 2",
              status: "In Progress",
              description: "Thing",
            },
            {
              id: "del-1-3",
              name: "Deliverable 3",
              status: "Completed",
              description: "Thing",
            },
            {
              id: "del-1-4",
              name: "Deliverable 4",
              status: "Completed",
              description: "Thing",
            },
          ],
        },
      },
      {
        id: "report-1-2",
        projectId: "1",
        month: "September 2025",
        date: "2025-09-30",
        background:
          "The BHA System Modernization project is progressing with the implementation of key system features. The team has been focused on resolving high-priority defects and strengthening regression testing capabilities.",
        assessment: {
          sprintPlanning: {
            rating: "Medium",
            description:
              "Team capacity concerns persist as workload remains concentrated among a few key team members. Project leadership is working on addressing this bottleneck.",
          },
          userStoryValidation: {
            rating: "Low",
            description:
              "User story validation processes are working effectively, with stakeholder reviews resulting in well-defined acceptance criteria.",
          },
          testPracticeValidation: {
            rating: "Medium",
            description:
              "Automation efforts have been temporarily impacted due to Tosca license renewal issues. Manual testing efforts have been increased to compensate.",
          },
        },
        issues: [
          {
            id: "issue-1-2-1",
            description:
              "Tosca license renewal delays impacting automated regression testing capabilities.",
            impact: "Medium",
            likelihood: "High",
            riskRating: 5,
            dateRaised: "2025-09-15",
            recommendation:
              "BHA should prioritize the resolution of Tosca license renewal to avoid further disruption to testing activities.",
            status: "Open",
          },
        ],
        scheduleStatus: {
          baselineEndDate: "2026-06-30",
          currentEndDate: "2026-07-30",
        },
        financials: {
          originalAmount: 10000000,
          paidToDate: 2700000,
        },
        scopeStatus: {
          completedDeliverables: 1,
          totalDeliverables: 4,
          deliverables: [
            {
              id: "del-1-1",
              name: "Deliverable 1",
              status: "In Progress",
              description: "Thing",
            },
            {
              id: "del-1-2",
              name: "Deliverable 2",
              status: "Not Started",
              description: "Thing",
            },
            {
              id: "del-1-3",
              name: "Deliverable 3",
              status: "Completed",
              description: "Thing",
            },
            {
              id: "del-1-4",
              name: "Deliverable 4",
              status: "In Progress",
              description: "Thing",
            },
          ],
        },
      },
    ],
  },
  {
    id: "2",
    name: "Tax System Modernization",
    status: "On Track",
    statusColor: "#2E7D32",
    metric1: "Completion: 75%",
    metric2: "Reports: 2",
    description:
      "Comprehensive upgrade of tax filing and processing systems for the Department of Taxation.",
    department: "Department of Taxation",
    startDate: "2024-03-01",
    budget: 8700000,
    spent: 3450000,
    vendor: "Hawaiian Systems Integration",
    vendorId: "vendor1",
    reports: [
      {
        id: "report-2-1",
        projectId: "2",
        month: "October 2025",
        date: "2025-10-31",
        background:
          "The Tax System Modernization project continues to make steady progress. The team has successfully completed the integration of the payment processing module and is now focused on implementing the audit selection algorithm.",
        assessment: {
          sprintPlanning: {
            rating: "Low",
            description:
              "Sprint planning processes are effective, with clear prioritization and resource allocation. Team velocity remains stable and predictable.",
          },
          userStoryValidation: {
            rating: "Low",
            description:
              "User stories are well-defined and validated with stakeholders before development begins. Acceptance criteria are clear and testable.",
          },
          testPracticeValidation: {
            rating: "Low",
            description:
              "Automated testing coverage exceeds 85% for core system components. Manual testing is focused on user experience and integration points.",
          },
        },
        issues: [
          {
            id: "issue-2-1-1",
            description:
              "Security assessment identified potential vulnerabilities in the authentication module.",
            impact: "High",
            likelihood: "Low",
            riskRating: 4,
            dateRaised: "2025-10-05",
            recommendation:
              "Implement recommended security controls and perform a follow-up assessment before the next major release.",
            status: "Open",
          },
        ],
        scheduleStatus: {
          baselineEndDate: "2026-03-31",
          currentEndDate: "2026-04-15",
        },
        financials: {
          originalAmount: 8700000,
          paidToDate: 3450000,
        },
        scopeStatus: {
          completedDeliverables: 3,
          totalDeliverables: 4,
          deliverables: [
            {
              id: "del-2-1",
              name: "Tax Filing Module",
              status: "Completed",
              description:
                "Online tax filing system for individual and business taxpayers.",
            },
            {
              id: "del-2-2",
              name: "Payment Processing",
              status: "Completed",
              description:
                "Electronic payment processing and reconciliation system.",
            },
            {
              id: "del-2-3",
              name: "Audit Selection",
              status: "In Progress",
              description:
                "Algorithmic audit case selection and management system.",
            },
            {
              id: "del-2-4",
              name: "Taxpayer Portal",
              status: "Completed",
              description:
                "Self-service portal for taxpayers to manage accounts and communications.",
            },
          ],
        },
      },
      {
        id: "report-2-2",
        projectId: "2",
        month: "September 2025",
        date: "2025-09-30",
        background:
          "The Tax System Modernization project is progressing well, with the recent successful launch of the taxpayer portal. User adoption has been strong, with over 5,000 accounts created in the first two weeks.",
        assessment: {
          sprintPlanning: {
            rating: "Low",
            description:
              "Sprint planning processes remain effective. The team has demonstrated agility in addressing user feedback from the portal launch.",
          },
          userStoryValidation: {
            rating: "Low",
            description:
              "User stories continue to be well-defined and validated with stakeholders.",
          },
          testPracticeValidation: {
            rating: "Medium",
            description:
              "While automated testing coverage is high, performance testing for peak tax season loads needs strengthening.",
          },
        },
        issues: [
          {
            id: "issue-2-2-1",
            description:
              "Performance testing for peak tax season loads shows potential bottlenecks in the database layer.",
            impact: "Medium",
            likelihood: "Medium",
            riskRating: 4,
            dateRaised: "2025-09-20",
            recommendation:
              "Implement database optimizations and conduct additional load testing before the next tax season.",
            status: "Open",
          },
        ],
        scheduleStatus: {
          baselineEndDate: "2026-03-31",
          currentEndDate: "2026-03-31",
        },
        financials: {
          originalAmount: 8700000,
          paidToDate: 3200000,
        },
        scopeStatus: {
          completedDeliverables: 2,
          totalDeliverables: 4,
          deliverables: [
            {
              id: "del-2-1",
              name: "Tax Filing Module",
              status: "Completed",
              description:
                "Online tax filing system for individual and business taxpayers.",
            },
            {
              id: "del-2-2",
              name: "Payment Processing",
              status: "Completed",
              description:
                "Electronic payment processing and reconciliation system.",
            },
            {
              id: "del-2-3",
              name: "Audit Selection",
              status: "In Progress",
              description:
                "Algorithmic audit case selection and management system.",
            },
            {
              id: "del-2-4",
              name: "Taxpayer Portal",
              status: "In Progress",
              description:
                "Self-service portal for taxpayers to manage accounts and communications.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "3",
    name: "Health Management System",
    status: "On Track",
    statusColor: "#2E7D32",
    metric1: "Completion: 50%",
    metric2: "Reports: 1",
    description:
      "Implementation of a new case management system for the Department of Health.",
    department: "Department of Health",
    startDate: "2024-08-10",
    budget: 3800000,
    spent: 1900000,
    vendor: "Health Systems Inc.",
    reports: [
      {
        id: "report-3-1",
        projectId: "3",
        month: "October 2025",
        date: "2025-10-31",
        background:
          "The Health Management System project is proceeding according to the baseline schedule. The data migration from legacy systems has been completed successfully, and the team is now focusing on implementing the case management workflow.",
        assessment: {
          sprintPlanning: {
            rating: "Low",
            description:
              "Sprint planning is effective, with good stakeholder involvement in prioritization decisions.",
          },
          userStoryValidation: {
            rating: "Low",
            description:
              "User stories are well-defined and validated with front-line staff to ensure they meet operational needs.",
          },
          testPracticeValidation: {
            rating: "Low",
            description:
              "Test practices are robust, with good coverage of critical paths and integration points.",
          },
        },
        issues: [],
        scheduleStatus: {
          baselineEndDate: "2025-06-30",
          currentEndDate: "2025-06-30",
        },
        financials: {
          originalAmount: 3800000,
          paidToDate: 1900000,
        },
        scopeStatus: {
          completedDeliverables: 2,
          totalDeliverables: 4,
          deliverables: [
            {
              id: "del-3-1",
              name: "Data Migration",
              status: "Completed",
              description: "Migration of patient data from legacy systems.",
            },
            {
              id: "del-3-2",
              name: "Case Management Module",
              status: "In Progress",
              description:
                "Workflow management for patient cases and care coordination.",
            },
            {
              id: "del-3-3",
              name: "Reporting Dashboard",
              status: "Completed",
              description:
                "Analytics and reporting dashboard for health metrics.",
            },
            {
              id: "del-3-4",
              name: "Mobile Access",
              status: "Not Started",
              description:
                "Mobile application for field staff to access and update patient information.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "4",
    name: "Transportation Portal",
    status: "Critical",
    statusColor: "#D32F2F",
    metric1: "Completion: 25%",
    metric2: "Reports: 1",
    description:
      "Development of a new public-facing portal for the Department of Transportation.",
    department: "Department of Transportation",
    startDate: "2024-09-01",
    budget: 4500000,
    spent: 1350000,
    vendor: "Pacific Digital Solutions",
    reports: [
      {
        id: "report-4-1",
        projectId: "4",
        month: "October 2025",
        date: "2025-10-31",
        background:
          "The Transportation Portal project has encountered significant challenges with vendor performance and technical architecture. The project is currently behind schedule and facing scope concerns.",
        assessment: {
          sprintPlanning: {
            rating: "High",
            description:
              "Sprint planning is ineffective, with frequent scope changes and unclear priorities. Team velocity is inconsistent and declining.",
          },
          userStoryValidation: {
            rating: "Medium",
            description:
              "User stories lack sufficient detail and acceptance criteria, leading to development rework and stakeholder dissatisfaction.",
          },
          testPracticeValidation: {
            rating: "High",
            description:
              "Test coverage is inadequate, with no automated regression testing in place. Defect rates are increasing with each sprint.",
          },
        },
        issues: [
          {
            id: "issue-4-1-1",
            description:
              "Vendor performance is not meeting contractual expectations, with frequent missed deliverables and quality issues.",
            impact: "High",
            likelihood: "High",
            riskRating: 6,
            dateRaised: "2025-10-10",
            recommendation:
              "DOT should conduct a formal vendor performance review and implement a remediation plan with clear milestones and accountability measures.",
            status: "Open",
          },
          {
            id: "issue-4-1-2",
            description:
              "The technical architecture has scalability limitations that may prevent the system from handling peak traffic loads.",
            impact: "High",
            likelihood: "Medium",
            riskRating: 5,
            dateRaised: "2025-10-15",
            recommendation:
              "Engage an independent technical architect to review the design and recommend improvements before further development.",
            status: "Open",
          },
        ],
        scheduleStatus: {
          baselineEndDate: "2025-12-31",
          currentEndDate: "2026-03-31",
        },
        financials: {
          originalAmount: 4500000,
          paidToDate: 1350000,
        },
        scopeStatus: {
          completedDeliverables: 1,
          totalDeliverables: 4,
          deliverables: [
            {
              id: "del-4-1",
              name: "User Registration & Authentication",
              status: "Completed",
              description:
                "Secure user registration and authentication system.",
            },
            {
              id: "del-4-2",
              name: "Public Information Module",
              status: "In Progress",
              description:
                "Public information display including traffic, construction, and transit data.",
            },
            {
              id: "del-4-3",
              name: "Online Services",
              status: "Not Started",
              description:
                "Online services including license renewals and vehicle registration.",
            },
            {
              id: "del-4-4",
              name: "Payment Processing",
              status: "Not Started",
              description: "Secure payment processing for fees and fines.",
            },
          ],
        },
      },
    ],
  },
];

export const sampleVendors = [
  {
    vendor_id: "vendor1",
    vendor_name: "test1",
    vendor_projects: sampleProjects,
  },
    {
    vendor_id: "vendor2",
    vendor_name: "test2",
    vendor_projects: sampleProjects,
  },
    {
    vendor_id: "vendor3",
    vendor_name: "test3",
    vendor_projects: sampleProjects,
  },
    {
    vendor_id: "vendor4",
    vendor_name: "test4",
    vendor_projects: sampleProjects,
  }
]
*/
