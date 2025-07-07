import { Router } from "express";
import controllerUser from "./controllers/controller.user.js";
import jwt from "./token.js";
import controllerClient from "./controllers/controller.client.js";

// New Routes
import controllerAdmin from "./controllers/controllerAdmin.js";
import controllerTecnico from "./controllers/controllerTecnico.js";
import controllerAppointment from "./controllers/controllerAppointment.js";

const router = Router();
// Rotas do Admin...
router.post("/admin/register", controllerAdmin.InserirAdmin);
router.post("/admin/login", controllerUser.LoginAdmin);
router.get("/admin/listar", jwt.ValidateToken, controllerAdmin.ListarAdmin);
router.get("/admin/appointments", jwt.ValidateToken, controllerAppointment.Listar);

// Tecnicos...
router.get("/tecnicos/listar", jwt.ValidateToken, controllerTecnico.Listar);
router.post("/tecnicos/registrar", jwt.ValidateToken, controllerTecnico.Inserir);
router.get("/tecnicos/:id_tecnico", jwt.ValidateToken, controllerTecnico.ListarServicos);

// Clientes...
router.get("/client/listar", jwt.ValidateToken, controllerClient.Listar);
router.post("/client/register", controllerClient.Inserir);

// Appointments
router.post("/appointments/insert", jwt.ValidateToken, controllerAppointment.Inserir);
router.get("/appointments/listar", jwt.ValidateToken, controllerAppointment.ListarByUser);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);


// Doctors...
// router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
// router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
// router.put("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Editar);
// router.delete("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Excluir);
// router.get("/doctors/:id_doctor/services", jwt.ValidateToken, controllerDoctor.ListarServicos);
// router.put("/tecnicos/:id_tecnico", jwt.ValidateToken, controllerTecnico.Editar);
// router.delete("/tecnicos/:id_tecnico", jwt.ValidateToken, controllerTecnico.Excluir);

// router.post("/users/login", controllerClient.Login);
// router.get("/users/profile", jwt.ValidateToken, controllerUser.ProfileAdmin);
// router.put("/users/:id_user", jwt.ValidateToken, controllerUser.Editar);
// router.delete("/users/:id_user", jwt.ValidateToken, controllerUser.Excluir);


// Reservas (appointments)...


// router.get("/admin/profile", jwt.ValidateToken, controllerUser.ProfileAdmin);
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