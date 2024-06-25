import { prisma } from "@server/libs/prisma-client";
import type { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name, password, role } = req.body;
  const user = await prisma.user.create({
    data: { email, name, password, role },
  });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, password, role } = req.body;
  const user = await prisma.user.update({
    where: { id },
    data: { email, name, password, role },
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({ where: { id } });
  res.json(user);
};
