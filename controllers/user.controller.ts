import { prisma } from "@server/libs/prisma-client";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Define Zod schemas
const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const updateUserSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  name: z.string().min(1, "Name is required").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
});

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  res.json({ user });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { email, name, password } = createUserSchema.parse(req.body);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    res.json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { email, name, password } = updateUserSchema.parse(req.body);

    // Check if email already exists (if updating email)
    if (email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== req.params.id) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    // Hash the password if it is provided
    const hashedPassword = password
      ? await bcrypt.hash(password, 12)
      : undefined;

    // Update user
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { email, name, password: hashedPassword },
    });

    res.json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({ where: { id } });
  res.json({ user });
};
