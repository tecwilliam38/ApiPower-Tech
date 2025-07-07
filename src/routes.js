import { Router } from "express";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";
import jwt from "./token.js";
import controllerTecnico from "./controllers/controllerTecnico.js";
import controllerClient from "./controllers/controller.client.js";
import controllerAdmin from "./controllers/controllerAdmin.js";

const router = Router();

// Doctors...
// router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
// router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
// router.put("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Editar);
// router.delete("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Excluir);
// router.get("/doctors/:id_doctor/services", jwt.ValidateToken, controllerDoctor.ListarServicos);
// Tecnicos...
router.get("/tecnicos/listar", jwt.ValidateToken, controllerTecnico.Listar);
router.post("/tecnicos/inserir", jwt.ValidateToken, controllerTecnico.Inserir);
// router.put("/tecnicos/:id_tecnico", jwt.ValidateToken, controllerTecnico.Editar);
// router.delete("/tecnicos/:id_tecnico", jwt.ValidateToken, controllerTecnico.Excluir);
router.get("/tecnicos/:id_tecnico", jwt.ValidateToken, controllerTecnico.ListarServicos);

// Users/Clientes...
router.get("/client/listar", jwt.ValidateToken, controllerClient.Listar);
router.post("/client/register", controllerClient.Inserir);
// router.post("/users/login", controllerClient.Login);
// router.get("/users/profile", jwt.ValidateToken, controllerUser.ProfileAdmin);
// router.put("/users/:id_user", jwt.ValidateToken, controllerUser.Editar);
// router.delete("/users/:id_user", jwt.ValidateToken, controllerUser.Excluir);


// Reservas (appointments)...
// router.get("/appointments", jwt.ValidateToken, controllerAppointment.ListarByUser);
// router.post("/appointments", jwt.ValidateToken, controllerAppointment.Inserir);
// router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);


// Rotas do Admin...
router.post("/admin/inserir", controllerAdmin.InserirAdmin);
router.post("/admin/login", controllerUser.LoginAdmin);
router.get("/admin/listar", jwt.ValidateToken, controllerAdmin.ListarAdmin);
// router.get("/admin/profile", jwt.ValidateToken, controllerUser.ProfileAdmin);
// router.get("/admin/appointments", jwt.ValidateToken, controllerAppointment.Listar);
// router.get("/admin/users", jwt.ValidateToken, controllerUser.Listar);
// router.get("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.ListarId);
// router.post("/admin/appointments", jwt.ValidateToken, controllerAppointment.InserirAdmin);
// router.put("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.EditarAdmin);
// router.post("/admin/register", controllerUser.InserirAdmin);
// router.post("/admin/login", controllerUser.LoginAdmin);
// router.get("/admin/agenda",jwt.ValidateToken, controllerAppointment.Listar);
// router.put("/admin/agenta/:id_appointment", jwt.ValidateToken, controllerAppointment.EditarAdmin);
// router.get("/admin/users", jwt.ValidateToken, controllerUser.Listar);
// router.get("/admin/agenda/:id_appointment", jwt.ValidateToken, controllerAppointment.ListarId);
// router.post("/admin/agenda", jwt.ValidateToken, controllerAppointment.InserirAgendaAdmin);
// router.put("/admin/agenda/:id_appointment", jwt.ValidateToken, controllerAppointment.EditarAgenda);
// router.get("/admin/profile", jwt.ValidateToken, controllerUser.ProfileAdmin);


export default router;