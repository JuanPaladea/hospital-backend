import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import { PORT } from "./config/env";
import { swaggerOptions } from "./utils/swagger";
import authToken from "./middlewares/authToken";

import apiPatientsRouter from "./routes/apiPatients.router";
import apiStudiesRouter from "./routes/apiStudies.router";
import apiBillsRouter from "./routes/apiBills.router";
import apiSessionRouter from "./routes/apiSession.router";

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions)

app.use(cors({
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/', (req, res) => {
  res.redirect('/docs')
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/api/patients", authToken, apiPatientsRouter);
app.use("/api/studies", authToken, apiStudiesRouter);
app.use("/api/bills", authToken, apiBillsRouter);
app.use("/api/session", apiSessionRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});