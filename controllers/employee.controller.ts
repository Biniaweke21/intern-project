import { prisma } from "@server/libs/prisma-client";
import type { Request, Response } from "express";
import { z } from "zod";

// Define the Zod schema for employee data
const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

export const getEmployees = async (req: Request, res: Response) => {
  const employees = await prisma.employee.findMany();
  res.json({ employees: employees });
};

export const getEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { employeeDetail: true },
  });
  res.json({ employee: employee });
};

export const createEmployee = async (req: Request, res: Response) => {
  console.log(req.body);
  const validation = employeeSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ message: "validation errors" });
  }

  const { firstName, lastName, country, city, phone, email } = req.body;

  // Check if email already exists
  const existingEmployee = await prisma.employee.findUnique({
    where: { email },
  });

  if (existingEmployee) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const employee = await prisma.employee.create({
    data: { firstName, lastName, country, city, phone, email },
  });
  res.json({ employee: employee });
};

export const updateEmployee = async (req: Request, res: Response) => {
  const validation = employeeSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ message: "validation errors " });
  }

  const { id } = req.params;
  const { firstName, lastName, country, city, phone, email } = req.body;

  const employee = await prisma.employee.update({
    where: { id },
    data: { firstName, lastName, country, city, phone, email },
  });
  res.json(employee);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await prisma.employee.delete({ where: { id } });
  res.json(employee);
};
