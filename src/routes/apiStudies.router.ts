import { Router } from "express";
import { getStudies, getStudyById, getStudiesByPatientId, getStudiesByPatientDni, createStudy, uploadResult, updateStudy, deleteStudy } from "../controllers/studiesController";
import { upload } from "../utils/multer";

const router = Router();

router.get("/", getStudies);
router.get("/:id", getStudyById);
router.get("/patient/:patient_id", getStudiesByPatientId);
router.get("/patient/dni/:dni", getStudiesByPatientDni);
router.post("/", createStudy);
router.post('/:id/upload-result', upload.single('result'), uploadResult);
router.put('/:id', updateStudy);
router.delete('/:id', deleteStudy);

export default router;