import { Router } from "express";
import jwt from "./token.js";
import controllerTecnico from "./controllers/controllerTecnico.js";

const router = Router();

// Tecnicos
router.get("/tecnicos/listar", jwt.ValidateToken, controllerTecnico.Listar);
router.post("/tecnicos/inserir", jwt.ValidateToken, controllerTecnico.Inserir);
// Adm

// Clients

// Agendamentos


export default router;