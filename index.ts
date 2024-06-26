import express from "express";
import userRouter from "./routes/user.routes";
import errorMiddleware from "./middlewares/error";
import authRouter from "./routes/auth.routes";
import authMiddleware from "./middlewares/auth";
import protectedRouter from "./routes/protected.routes";
import employeeRouter from "./routes/employee.routes";
import cors from "cors";
const app = express();
const port = 8080;

// register  express middlewares
app.use(express.json());
app.use(cors());

// register  custom middlewares
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// register api routes
app.use("/api/users", userRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/auth", authRouter);
app.use("/api/resources", authMiddleware, protectedRouter);

app.listen(port, () => {
  console.log(`🚀 Server Running on port http://localhost:${port}...`);
});
