import { z } from "zod";

export const employeeDetailSchema = z.object({
  supervisorName: z.string().optional(),
  employmentType: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"])
    .optional(),
  employmentStatus: z.enum(["ACTIVE", "INACTIVE", "TERMINATED", "RETIRED"]),
  startDate: z.date(),
  endDate: z.date().optional(),
  position: z.string().min(1, { message: "Position is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  baseSalary: z.number().positive({ message: "Base Salary must be positive" }),
  salaryFrequency: z
    .number()
    .positive({ message: "Salary Frequency must be positive" }),
  dateOfHire: z.date(),
  employeeId: z.string().min(1, { message: "Employee ID is required" }),
});
