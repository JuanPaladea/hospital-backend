import { Router } from "express";
import {
  getBills,
  getBillById,
  getBillsByPatientId,
  getBillsByPatientDni,
  createBill,
  uploadPayment,
  updateBill,
  deleteBill,
} from "../controllers/billsController";
import { upload } from "../utils/multer";

const router = Router();

router.get("/", getBills);
router.post("/", createBill);
router.get("/:id", getBillById);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);
router.get("/patient/:patient_id", getBillsByPatientId);
router.get("/patient/dni/:dni", getBillsByPatientDni);
router.post("/:id/upload-payment", upload.single("payment"), uploadPayment);

export default router;
