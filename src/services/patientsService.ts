import { pool } from "../db";

class PatientsService {
  async getPatients(page: number, size: number, search: string) {
    try {
      const offset = (page - 1) * size;
      const searchTerm = search.trim() === "" ? "%" : `%${search}%`;
      const patients = await pool.query(
        "SELECT * FROM patients WHERE name ILIKE $1 ORDER BY id ASC LIMIT $2 OFFSET $3",
        [searchTerm, size, offset]
      );
      const count = await pool.query(
        "SELECT COUNT(*) FROM patients WHERE name ILIKE $1",
        [searchTerm]
      );
      return {
        data: patients.rows,
        totalPages: Math.ceil(parseInt(count.rows[0].count) / size),
      };
    } catch (error) {
      throw error;
    }
  }

  async getPatientById(id: number) {
    try {
      const patient = await pool.query("SELECT * FROM patients WHERE id = $1", [
        id,
      ]);
      return patient.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getPatientByDni(dni: string) {
    try {
      const patient = await pool.query(
        "SELECT * FROM patients WHERE dni = $1",
        [dni]
      );
      return patient.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getPatientDetails(id: number) {
    try {
      const patient = await pool.query("SELECT * FROM patients WHERE id = $1", [
        id,
      ]);
      const studies = await pool.query(
        "SELECT * FROM studies WHERE patient_id = $1",
        [id]
      );
      const bills = await pool.query(
        "SELECT * FROM bills WHERE patient_id = $1",
        [id]
      );

      return {
        patient: patient.rows[0],
        studies: studies.rows,
        bills: bills.rows,
      };
    } catch (error) {
      throw error;
    }
  }

  async createPatient(name: string, age: string, dni: string) {
    try {
      const newPatient = await pool.query(
        "INSERT INTO patients (name, age, dni) VALUES ($1, $2, $3) RETURNING *",
        [name, age, dni]
      );
      return newPatient.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updatePatient(id: number, name: string, age: string, dni: string) {
    try {
      const updatedPatient = await pool.query(
        "UPDATE patients SET name = $1, age = $2, dni = $3 WHERE id = $4 RETURNING *",
        [name, age, dni, id]
      );
      return updatedPatient.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deletePatient(id: number) {
    try {
      const deletedPatient = await pool.query(
        "DELETE FROM patients WHERE id = $1 RETURNING *",
        [id]
      );
      return deletedPatient.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default new PatientsService();
