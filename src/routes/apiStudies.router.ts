import { Router } from "express";
import { getStudies, getStudyById, getStudiesByPatientId, getStudiesByPatientDni, createStudy, uploadResult, updateStudy, deleteStudy } from "../controllers/studiesController";
import { upload } from "../utils/multer";

const router = Router();

router.get("/", getStudies);
router.post("/", createStudy);
router.get("/:id", getStudyById);
router.put('/:id', updateStudy);
router.delete('/:id', deleteStudy);
router.post('/:id/upload-result', upload.single('result'), uploadResult);
router.get("/patient/:patient_id", getStudiesByPatientId);
router.get("/patient/dni/:dni", getStudiesByPatientDni);

export default router;