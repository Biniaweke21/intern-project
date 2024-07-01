import { prisma } from "@server/libs/prisma-client";
import type { Request, Response } from "express";

// Create a new employee detail
const createEmployeeDetail = async (req: Request, res: Response) => {
  try {
    const {
      supervisorName,
      employmentType,
      employmentStatus,
      startDate,
      endDate,
      position,
      department,
      baseSalary,
      salaryFrequency,
      dateOfHire,
      employeeId,
    } = req.body;

    const employeeDetail = await prisma.employeeDetail.create({
      data: {
        supervisorName,
        employmentType,
        employmentStatus,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        position,
        department,
        baseSalary,
        salaryFrequency,
        dateOfHire: new Date(dateOfHire),
        Employee: {
          connect: { id: employeeId },
        },
      },
    });
    console.log(employeeDetail);
    res.status(201).json(employeeDetail);
  } catch (error) {
    res
      .status(400)
      .json({ message: error || "Failed to create employee detail" });
  }
};

// Get an employee detail by ID
const getEmployeeDetailById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const employeeDetail = await prisma.employeeDetail.findUnique({
      where: { id },
      include: {
        Employee: true,
      },
    });

    if (!employeeDetail) {
      return res.status(404).json({ message: "Employee detail not found" });
    }

    res.json(employeeDetail);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an employee detail by ID
const updateEmployeeDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    supervisorName,
    employmentType,
    employmentStatus,
    startDate,
    endDate,
    position,
    department,
    baseSalary,
    salaryFrequency,
    dateOfHire,
  } = req.body;

  try {
    const existingEmployeeDetail = await prisma.employeeDetail.findUnique({
      where: { id },
    });

    if (!existingEmployeeDetail) {
      return res.status(404).json({ message: "Employee detail not found" });
    }

    const updatedEmployeeDetail = await prisma.employeeDetail.update({
      where: { id },
      data: {
        supervisorName,
        employmentType,
        employmentStatus,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        position,
        department,
        baseSalary,
        salaryFrequency,
        dateOfHire: new Date(dateOfHire),
      },
    });

    res.json(updatedEmployeeDetail);
  } catch (error) {
    res
      .status(400)
      .json({ message: error || "Failed to update employee detail" });
  }
};

// Delete an employee detail by ID
const deleteEmployeeDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingEmployeeDetail = await prisma.employeeDetail.findUnique({
      where: { id },
    });

    if (!existingEmployeeDetail) {
      return res.status(404).json({ message: "Employee detail not found" });
    }

    await prisma.employeeDetail.delete({
      where: { id },
    });

    res.json({ message: "Employee detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee detail" });
  }
};

export {
  createEmployeeDetail,
  deleteEmployeeDetail,
  getEmployeeDetailById,
  updateEmployeeDetail,
};
