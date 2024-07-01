import { z } from "zod";

const employeeDetailSchemaStep1 = z.object({
    supervisorName: z.string().optional(),
    employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"]).optional(),
    employmentStatus: z.enum(["ACTIVE", "INACTIVE", "TERMINATED", "RETIRED"]),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
});

const employeeDetailSchemaStep2 = z.object({
    position: z.string().min(1, "Position is required"),
    department: z.string().min(1, "Department is required"),
    baseSalary: z.number().positive("Base Salary must be positive"),
    salaryFrequency: z.number().positive("Salary Frequency must be positive"),
});

export const employeeDetailSchema = employeeDetailSchemaStep1.merge(employeeDetailSchemaStep2);

export type EmployeeDetailFormData = z.infer<typeof employeeDetailSchema>;
