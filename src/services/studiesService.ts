import { pool } from "../db";

class StudiesService {
  async getStudies(page: number, size: number) {
    try {
      const offset = (page - 1) * size;

      const studies = await pool.query("SELECT * FROM studies LIMIT $1 OFFSET $2", [size, offset]);
      return studies.rows;
    } catch (error) {
      throw error
    }
  }

  async getStudyById(id: number) {
    try {
      const study = await pool.query("SELECT * FROM studies WHERE id = $1", [id]);
      return study.rows[0];
    } catch (error) {
      throw error
    }
  }

  async getStudiesByPatientId(patient_id: number) {
    try {
      const studies = await pool.query("SELECT * FROM studies WHERE patient_id = $1", [patient_id]);
      return studies.rows;
    } catch (error) {
      throw error
    }
  }

  async getStudiesByPatientDni(dni: string) {
    try {
      const studies = await pool.query("SELECT * FROM studies WHERE patient_dni = $1", [dni]);
      return studies.rows;
    } catch (error) {
      throw error
    }
  }

  async createStudy(patient_id: number, type: string, status: string, date: string) {
    try {
      const newStudy = await pool.query("INSERT INTO studies (patient_id, type, status, date) VALUES ($1, $2, $3, $4) RETURNING *", [patient_id, type, status, date]);
      return newStudy.rows[0];
    } catch (error) {
      throw error
    }
  }

  async updateStudy(id: number, patient_id: number, type: string, status: string, date: string) {
    try {
      const updatedStudy = await pool.query("UPDATE studies SET patient_id = $1, type = $2, status = $3, date = $4 WHERE id = $5 RETURNING *", [patient_id, type, status, date, id]);
      return updatedStudy.rows[0];
    } catch (error) {
      throw error
    }
  }

  async uploadStudy(id: number, result_file_path: string) {
    try {
      const updatedStudy = await pool.query("UPDATE studies SET result_file_path = $1 WHERE id = $2 RETURNING *", [result_file_path, id]);
      return updatedStudy.rows[0];
    } catch (error) {
      throw error
    }
  }

  async deleteStudy(id: number) {
    try {
      const deletedStudy = await pool.query("DELETE FROM studies WHERE id = $1 RETURNING *", [id]);
      return deletedStudy.rows[0];
    } catch (error) {
      throw error
    }
  }
}

export default new StudiesService();