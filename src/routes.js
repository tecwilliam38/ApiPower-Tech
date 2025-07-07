import { Router } from "express";
import jwt from "./token.js";
import controllerTecnico from "./controllers/controllerTecnico.js";

const router = Router();

// Tecnicos
router.get("/tecnicos/listar", jwt.ValidateToken, controllerTecnico.Listar);

// Adm

// Clients

// Agendamentos


export default router;