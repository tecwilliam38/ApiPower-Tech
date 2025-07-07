import repoAppointment from "../repositories/repoAppointment.js";

async function Listar(id_client, dt_start, dt_end, id_tecnico) {

    const appointments = await repoAppointment.Listar(id_client, dt_start, dt_end, id_tecnico);

    return appointments;
}

async function ListarId(id_appointment) {

    const appointments = await repoAppointment.ListarId(id_appointment);

    return appointments;
}

async function Inserir(id_user, id_doctor, id_service,
    booking_date, booking_hour) {

    const appointment = await repoAppointment.Inserir(id_user,
        id_doctor, id_service, booking_date, booking_hour);

    return appointment;
}

async function Excluir(id_user, id_appointment) {

    const appointment = await repoAppointment.Excluir(id_user, id_appointment);

    return appointment;
}

async function Editar(id_appointment, id_user,
    id_doctor, id_service, booking_date, booking_hour) {

    const appointment = await repoAppointment.Editar(id_appointment, id_user,
        id_doctor, id_service, booking_date, booking_hour);

    return appointment;
}

export default { Listar, Inserir, Excluir, ListarId, Editar }