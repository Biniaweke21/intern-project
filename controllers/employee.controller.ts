import { prisma } from "@server/libs/prisma-client";
import type { Request, Response } from "express";

export const getEmployees = async (req: Request, res: Response) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
};

export const getEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await prisma.employee.findUnique({ where: { id } });
  res.json(employee);
};

export const createEmployee = async (req: Request, res: Response) => {
  const { firstName, lastName, country, city, phone, email, jobDetailId } =
    req.body;
  const employee = await prisma.employee.create({
    data: { firstName, lastName, country, city, phone, email, jobDetailId },
  });
  res.json(employee);
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, country, city, phone, email, jobDetailId } =
    req.body;
  const employee = await prisma.employee.update({
    where: { id },
    data: { firstName, lastName, country, city, phone, email, jobDetailId },
  });
  res.json(employee);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await prisma.employee.delete({ where: { id } });
  res.json(employee);
};
