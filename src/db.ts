import { Pool } from "pg";
import { POSTGRES_URL } from "./config/env";

export const pool = new Pool({
  connectionString: POSTGRES_URL
});