import { Router } from "express";
import { createPatient, deletePatient, getPatientById, getPatientDetails, getPatients, updatePatient } from "../controllers/patientsController";

const router = Router();

router.get("/", getPatients);
router.get("/:id", getPatientById);
router.get("/:id/details", getPatientDetails);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;