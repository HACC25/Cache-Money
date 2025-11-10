export interface ProjectReport {
  id: string;
  projectId: string;
  month: string;
  date: string;
  background: string;
  assessment: any;
  issues: any[];
  scheduleStatus: any;
  financials: any;
  scopeStatus: any;
}

export interface ProjectData {
  id: string;
  name: string;
  status: string;
  statusColor: string;
  metric1: string;
  metric2: string;
  description: string;
  department: string;
  startDate: string;
  budget: number;
  spent: number;
  vendor: string;
  vendorId?: string;
  reports: ProjectReport[];
}
