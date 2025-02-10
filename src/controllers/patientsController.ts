import patientsService from "../services/patientsService";
import { Request, Response } from "express";

export const getPatients = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string || "1");
  const size = parseInt(req.query.size as string || "10");
  const search = req.query.search as string || "";
  try {
    const patients = await patientsService.getPatients(page, size, search);
    res.status(200).send({ status: "success", data: patients.data, totalPages: patients.totalPages });
    return
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const patient = await patientsService.getPatientById(id);
    res.status(200).send({ status: "success", data: patient });
    return
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return
  }
};

export const getPatientDetails = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const patient = await patientsService.getPatientDetails(id);
    res.status(200).send({ status: "success", data: patient });
    return
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return
  }
};

export const createPatient = async (req: Request, res: Response) => {
  const { name, age, dni } = req.body;

  try {
    const newPatient = await patientsService.createPatient(name, age, dni);
    res.status(201).send({ status: "success", data: newPatient });
    return
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, age, dni } = req.body;

  try {
    const updatedPatient = await patientsService.updatePatient(id, name, age, dni);
    res.status(200).send({ status: "success", data: updatedPatient });
    return
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await patientsService.deletePatient(id);
    res.status(200).send({ status: "success", message: "Patient deleted successfully" });
    return
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
    return
  }
};