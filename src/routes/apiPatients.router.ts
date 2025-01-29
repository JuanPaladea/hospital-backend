import { Router } from "express";
import { createPatient, deletePatient, getPatientById, getPatientDetails, getPatients, updatePatient } from "../controllers/patientsController";

const router = Router();

router.get("/", getPatients);
router.post('/', createPatient);
router.get("/:id", getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get("/:id/details", getPatientDetails);

export default router;