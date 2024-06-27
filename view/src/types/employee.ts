export type EmployeeType = {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  jobDetailId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "HMR" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
};
