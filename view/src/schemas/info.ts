export interface EmployeeDetail {
  id: string;
  supervisorName?: string;
  employmentType?: EmploymentType;
  employmentStatus: EmploymentStatus;
  startDate: string;
  endDate?: string;
  position: string;
  department: string;
  baseSalary: number;
  salaryFrequency: number;
  dateOfHire: string;
  createdAt: string;
  updatedAt: string;
  employeeId: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  jobDetailId?: string | null;
  createdAt: string;
  updatedAt: string;
  employeeDetail: EmployeeDetail[];
}

export interface ApiResponse {
  employee: Employee;
}

enum EmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERN = "INTERN",
}

enum EmploymentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  TERMINATED = "TERMINATED",
  RETIRED = "RETIRED",
}
