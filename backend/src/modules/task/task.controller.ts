import { prisma } from "../../prisma/client";
import { AuthRequest } from "../../middleware/auth.middleware";
import { Response } from "express";

export const getTasks = async (
  req: AuthRequest,
  res: Response
) => {
  const { page = 1, limit = 10, status, search } =
    req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const whereClause = {
    userId: req.user.id,
    ...(status !== undefined && {
      status: status === "true",
    }),
    ...(search && {
      title: {
        contains: String(search),
        mode: "insensitive",
      },
    }),
  };

  // 1️⃣ Get total count
  const total = await prisma.task.count({
    where: whereClause,
  });

  // 2️⃣ Get paginated data
  const tasks = await prisma.task.findMany({
    where: whereClause,
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalPages = Math.ceil(total / limitNumber);

  res.json({
    data: tasks,
    meta: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages,
    },
  });
};
export const createTask = async (
  req: AuthRequest,
  res : Response
) => {
  const task = await prisma.task.create({
    data: {
      title: req.body.title,
      userId: req.user.id,
    },
  });

  res.status(201).json(task);
};

export const updateTask = async (
  req: AuthRequest,
  res : Response
) => {
  const task = await prisma.task.update({
    where: { id: String(req.params.id) },
    data: { title: req.body.title },
  });

  res.json(task);
};

export const deleteTask = async (
  req: AuthRequest,
  res : Response
) => {
  await prisma.task.delete({
    where: { id: String(req.params.id) },
  });

  res.json({ message: "Deleted" });
};

export const toggleTask = async (
  req: AuthRequest,
  res:Response
) => {
  const task = await prisma.task.findUnique({
    where: { id: String(req.params.id) },
  });

  if (!task)
    return res.status(404).json({
      message: "Task not found",
    });

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: { status: !task.status },
  });

  res.json(updated);
};