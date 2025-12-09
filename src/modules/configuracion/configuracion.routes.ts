import { Router } from "express";

import departamentoRouter from "./departamentos/departamento.routes";
import ciudadRouter from "./ciudades/ciudad.routes"; 

const router = Router();
 router.use("/departamentos", departamentoRouter);
 router.use("/ciudades", ciudadRouter); 

module.exports = router;
