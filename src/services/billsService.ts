import { pool } from "../db";

class BillsService {
  async getBills(page: number, size: number) {
    try {
      const offset = (page - 1) * size;

      const bills = await pool.query("SELECT * FROM bills LIMIT $1 OFFSET $2", [
        size,
        offset,
      ]);
      const count = await pool.query("SELECT COUNT(*) FROM bills");
      return {
        data: bills.rows,
        totalPages: Math.ceil(parseInt(count.rows[0].count) / size),
      };
    } catch (error) {
      throw error;
    }
  }

  async getBillById(id: number) {
    try {
      const bill = await pool.query("SELECT * FROM bills WHERE id = $1", [id]);
      return bill.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getBillsByPatientId(patient_id: number) {
    try {
      const bill = await pool.query(
        "SELECT * FROM bills WHERE patient_id = $1",
        [patient_id]
      );
      return bill.rows;
    } catch (error) {
      throw error;
    }
  }

  async getBillsByPatientDni(dni: string) {
    try {
      const bill = await pool.query(
        "SELECT * FROM bills WHERE patient_dni = $1",
        [dni]
      );
      return bill.rows;
    } catch (error) {
      throw error;
    }
  }

  async createBill(
    patient_id: number,
    amount: number,
    date: string,
    status: string,
    study_id: number
  ) {
    try {
      const newBill = await pool.query(
        "INSERT INTO bills (patient_id, amount, date, status, study_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [patient_id, amount, date, status, study_id]
      );
      return newBill.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async uploadPayment(id: number, payment_path: string) {
    try {
      const updatedBill = await pool.query(
        "UPDATE bills SET status = 'paid', payment_path = $1 WHERE id = $2 RETURNING *",
        [payment_path, id]
      );
      return updatedBill.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateBill(
    id: number,
    patient_id: number,
    amount: number,
    date: string,
    status: string,
    study_id: number
  ) {
    try {
      const updatedBill = await pool.query(
        "UPDATE bills SET patient_id = $1, amount = $2, date = $3, status = $4, study_id = $5 WHERE id = $6 RETURNING *",
        [patient_id, amount, date, status, study_id, id]
      );
      return updatedBill.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteBill(id: number) {
    try {
      const deletedBill = await pool.query(
        "DELETE FROM bills WHERE id = $1 RETURNING *",
        [id]
      );
      return deletedBill.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default new BillsService();
