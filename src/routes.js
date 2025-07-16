import { Router } from "express";
import jwt from "./token.js";


// New Routes
import controllerAdmin from "./controllers/controllerAdmin.js";
import controllerTecnico from "./controllers/controllerTecnico.js";
import controllerAppointment from "./controllers/controllerAppointment.js";
import controllerClient from "./controllers/controllerClient.js";
import pool from "./database/pool.index.js";

const router = Router();
// Rotas do Admin...
router.post("/admin/register", controllerAdmin.InserirAdmin);
router.post("/admin/login", controllerAdmin.LoginAdmin);
router.get("/admin/listar", jwt.ValidateToken, controllerAdmin.ListarAdmin);
router.get("/admin/appointments", jwt.ValidateToken, controllerAppointment.Listar);

// Tecnicos...
router.get("/tecnicos/listar", jwt.ValidateToken, controllerTecnico.Listar);
router.post("/tecnicos/register", jwt.ValidateToken, controllerTecnico.Inserir);
router.get("/tecnicos/:id_tecnico/services", jwt.ValidateToken, controllerTecnico.ListarServicos);

// Clientes...
router.get("/client/listar", jwt.ValidateToken, controllerClient.Listar);
router.post("/client/register", controllerClient.Inserir);
router.put("/client/:id_client", jwt.ValidateToken, controllerClient.Editar);
router.post('/client/buscar', jwt.ValidateToken, controllerClient.Buscar );


// Appointments
router.post("/appointments/insert", jwt.ValidateToken, controllerAppointment.Inserir);
router.get("/appointments/listar", jwt.ValidateToken, controllerAppointment.ListarByUser);
// router.get("/appointments/listar", jwt.ValidateToken, controllerAppointment.Listar);
router.get("/appointments/listar/:id_appointment", jwt.ValidateToken, controllerAppointment.ListarId);
router.put("/appointments/edit/:id_appointment", jwt.ValidateToken, controllerAppointment.EditarAdmin);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);


// Mapa belford roxo
router.get('/amostragem', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM mapa_votacao ORDER BY bairro;');
  res.json(rows);
});


// Doctors...
// router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
// router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
// router.put("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Editar);
// router.delete("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Excluir);
// router.get("/doctors/:id_doctor/services", jwt.ValidateToken, controllerDoctor.ListarServicos);
// router.put("/tecnicos/:id_tecnico", jwt.ValidateToken, controllerTecnico.Editar);
// router.delete("/tecnicos/:id_tecnico", jwt.ValidateToken, controllerTecnico.Excluir);;

// router.delete("/users/:id_user", jwt.ValidateToken, controllerUser.Excluir);


// Reservas (appointments)...


// router.get("/admin/profile", jwt.ValidateToken, controllerUser.ProfileAdmin);
// router.get("/admin/users", jwt.ValidateToken, controllerUser.Listar);
// router.get("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.ListarId);
// router.post("/admin/appointments", jwt.ValidateToken, controllerAppointment.InserirAdmin);
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