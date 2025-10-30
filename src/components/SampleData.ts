export interface ProjectData {
  id: string;
  name: string;
  status: string;
  statusColor: string;
  metric1: string;
  metric2: string;
  description: string;
}

export const sampleProjects: ProjectData[] = [
  {
    id: "1",
    name: "Project 1",
    status: "On Track",
    statusColor: "#2E7D32",
    metric1: "Completion: 92%",
    metric2: "Reports: 10",
    description: "THIS IS THE PROJECT DESCRIPTION",
  },
  {
    id: "2",
    name: "Project 2",
    status: "At Risk",
    statusColor: "#FBC02D",
    metric1: "Completion: 97%",
    metric2: "Reports: 10",
    description: "THIS IS THE PROJECT DESCRIPTION",
  },
  {
    id: "3",
    name: "Project 3",
    status: "On Track",
    statusColor: "#2E7D32",
    metric1: "Completion: 50%",
    metric2: "Reports: 10",
    description: "THIS IS THE PROJECT DESCRIPTION",
  },
  {
    id: "4",
    name: "Project 4",
    status: "At Risk",
    statusColor: "#FBC02D",
    metric1: "Completion: 25%",
    metric2: "Reports: 10",
    description: "THIS IS THE PROJECT DESCRIPTION",
  },
];
