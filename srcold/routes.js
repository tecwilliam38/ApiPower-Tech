import { Router } from "express";
import jwt from "./token.js";
import controllerTecnico from "./controllers/controllerTecnico.js";
import controllerAdmin from "./controllers/controllerAdmin.js";

const router = Router();

// Tecnicos
router.get("/tecnicos/listar", jwt.ValidateToken, controllerTecnico.Listar);
router.post("/tecnicos/inserir", jwt.ValidateToken, controllerTecnico.Inserir);

// Adm
router.post("/admin/inserir", jwt.ValidateToken, controllerAdmin.InserirAdmin);
router.post("/admin/login", controllerAdmin.LoginAdmin);
router.get("/admin/listar", jwt.ValidateToken, controllerAdmin.ListarAdmin);

// Clients

// Agendamentos


export default router;