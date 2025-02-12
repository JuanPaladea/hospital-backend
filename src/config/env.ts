import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const POSTGRES_URL = process.env.POSTGRES_URL!;
export const FRONTEND_URL = process.env.FRONTEND_URL!;
