export const EDIT_PROJECT_STATUSES = [
  { value: 'Active', label: 'Active', color: '#007bff' },
  { value: 'On Track', label: 'On Track', color: '#28a745' },
  { value: 'At Risk', label: 'At Risk', color: '#ffc107' },
  { value: 'Critical', label: 'Critical', color: '#dc3545' }, 
  { value: 'Completed', label: 'Completed', color: '#6c757d' }, 
];

export const getStatusColor = (status: string): string => {
  const statusObj = EDIT_PROJECT_STATUSES.find(s => s.value === status);
  return statusObj?.color || '#6c757d'; // Default gray if not found
};