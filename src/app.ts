import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import apiPatientsRouter from "./routes/apiPatients.router";
import apiStudiesRouter from "./routes/apiStudies.router";
import apiBillsRouter from "./routes/apiBills.router";
import apiSessionRouter from "./routes/apiSession.router";
import authToken from "./middlewares/authToken";
import { PORT } from "./config/env";

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/patients", authToken, apiPatientsRouter);
app.use("/api/studies", authToken, apiStudiesRouter);
app.use("/api/bills", authToken, apiBillsRouter);
app.use("/api/session", apiSessionRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});