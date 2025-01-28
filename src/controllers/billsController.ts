import { Request, Response } from "express";

import BillsService from "../services/billsService";

export const getBills = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const size = parseInt(req.query.size as string);

  try {
    const bills = await BillsService.getBills(page, size);
    res.status(200).send({ status: "success", data: bills });
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const getBillById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const bill = await BillsService.getBillById(id);
    res.status(200).send({ status: "success", data: bill });
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const getBillsByPatientId = async (req: Request, res: Response) => {
  const patient_id = parseInt(req.params.patient_id);

  try {
    const bills = await BillsService.getBillsByPatientId(patient_id);
    res.status(200).send({ status: "success", data: bills });
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const getBillsByPatientDni = async (req: Request, res: Response) => {
  const dni = req.params.dni;

  try {
    const bills = await BillsService.getBillsByPatientDni(dni);
    res.status(200).send({ status: "success", data: bills });
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const createBill = async (req: Request, res: Response) => {
  const { patient_id, amount, date, status, study_id } = req.body;

  try {
    const newBill = await BillsService.createBill(patient_id, amount, date, status, study_id);
    res.status(201).send({ status: "success", data: newBill });
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const uploadPayment = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const payment_path = req.file?.path as string;

  if (!payment_path) {
    res.status(400).send({ status: "error", message: "Payment file is required" });
  }

  try {
    const updatedBill = await BillsService.uploadPayment(id, payment_path);
    res.status(200).send({ status: "success", data: updatedBill });
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const updateBill = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { patient_id, amount, date, status, study_id } = req.body;

  try {
    const updatedBill = await BillsService.updateBill(id, patient_id, amount, date, status, study_id);
    res.status(200).send({ status: "success", data: updatedBill });
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const deleteBill = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const deletedBill = await BillsService.deleteBill(id);
    res.status(200).send({ status: "success", data: deletedBill });
  } catch (error) {
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}