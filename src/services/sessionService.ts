import { pool } from "../db";

class SessionService {
  async registeUser(username: string, email: string, password: string) {
    try {
      const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(userId: string) {
    try {
      const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new SessionService();