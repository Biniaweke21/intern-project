import {
  createEmployeeDetail,
  getEmployeeDetailById,
  updateEmployeeDetail,
  deleteEmployeeDetail,
} from "@server/controllers/detail.controller";
import express from "express";

const EmployeeDetailRouter = express.Router();

EmployeeDetailRouter.post("/", createEmployeeDetail);
EmployeeDetailRouter.get("/:id", getEmployeeDetailById);
EmployeeDetailRouter.put("/:id", updateEmployeeDetail);
EmployeeDetailRouter.delete("/:id", deleteEmployeeDetail);

export default EmployeeDetailRouter;
