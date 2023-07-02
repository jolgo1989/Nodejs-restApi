import { Router } from "express";
import {
  getEmployes,
  createEmployes,
  updateEmployes,
  deleteEmployes,
  getEmploye,
} from "../controllers/employes.controllers.js";

const router = Router();

router.get("/employes", getEmployes);

router.get("/employes/:id", getEmploye);

router.post("/employes", createEmployes);

router.patch("/employes/:id", updateEmployes); //Si queremos actualizar parcialmente utilizar patch
// router.put("/employes/:id", updateEmployes);Si queremos actualizar todo utilizar put

router.delete("/employes/:id", deleteEmployes);

export default router;
