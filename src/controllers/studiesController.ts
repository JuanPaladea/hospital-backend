import { Request, Response } from "express";

import StudiesService from "../services/studiesService";

export const getStudies = async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || "1");
  const size = parseInt((req.query.size as string) || "10");

  try {
    const studies = await StudiesService.getStudies(page, size);
    res
      .status(200)
      .send({
        status: "success",
        data: studies.data,
        totalPages: studies.totalPages,
      });
    return;
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return;
  }
};

export const getStudyById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const study = await StudiesService.getStudyById(id);
    res.status(200).send({ status: "success", data: study });
    return;
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return;
  }
};

export const getStudiesByPatientId = async (req: Request, res: Response) => {
  const patient_id = parseInt(req.params.patient_id);

  try {
    const studies = await StudiesService.getStudiesByPatientId(patient_id);
    res.status(200).send({ status: "success", data: studies });
    return;
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return;
  }
};

export const getStudiesByPatientDni = async (req: Request, res: Response) => {
  const dni = req.params.dni;

  try {
    const studies = await StudiesService.getStudiesByPatientDni(dni);
    res.status(200).send({ status: "success", data: studies });
    return;
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return;
  }
};

export const createStudy = async (req: Request, res: Response) => {
  const { patient_id, type, status, date } = req.body;

  try {
    const newStudy = await StudiesService.createStudy(
      patient_id,
      type,
      status,
      date
    );
    res.status(201).send({ status: "success", data: newStudy });
    return;
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return;
  }
};

export const uploadResult = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const result_file_path = req.file?.path as string;

  if (!result_file_path) {
    res
      .status(400)
      .send({ status: "error", message: "Result file path is required" });
    return;
  }

  try {
    const updatedStudy = await StudiesService.uploadStudy(id, result_file_path);
    res.status(200).send({ status: "success", data: updatedStudy });
    return;
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return;
  }
};

export const updateStudy = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { patient_id, type, status, date } = req.body;

  try {
    const updatedStudy = await StudiesService.updateStudy(
      id,
      patient_id,
      type,
      status,
      date
    );
    res.status(200).send({ status: "success", data: updatedStudy });
    return;
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return;
  }
};

export const deleteStudy = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await StudiesService.deleteStudy(id);
    res
      .status(200)
      .send({ status: "success", message: "Study deleted successfully" });
    return;
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return;
  }
};
