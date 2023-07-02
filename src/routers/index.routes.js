import { Router } from "express";

import { ping } from "../controllers/index.controllers.js";

const router = Router();

router.get("/ping", ping);

//Exportando el modulo
export default router;
