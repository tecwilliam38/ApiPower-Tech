import pool from "../database/pool.index.js";

async function Listar(id_client, dt_start, dt_end, id_tecnico) {

    let filtro = [];

    let sql = `select pa.id_appointment, ps.description as service, 
    pt.name as tecnico, pt.specialty,
   pa.booking_date, pa.booking_hour, pts.price as preco, pc.name as cliente,
   pa.id_service, pa.id_client
   from powertech_appointments pa
   join powertech_services ps on (ps.id_service = pa.id_service)
   join powertech_tecnicos pt on (pt.id_tecnico = pa.id_tecnico)
   join powertech_client pc on (pc.id_client = pa.id_client)
   left join powertech_tecnicos_services pts
   on pts.id_tecnico = pa.id_tecnico and pts.id_service = pa.id_service
   where pa.id_appointment > 0 `;

    if (id_client) {
        filtro.push(id_client);
        sql += " AND pa.id_client = $" + filtro.length;
    }

    if (dt_start) {
        filtro.push(dt_start);
        sql += " AND pa.booking_date >= $" + filtro.length;
    }

    if (dt_end) {
        filtro.push(dt_end);
        sql += " AND pa.booking_date <= $" + filtro.length;
    }

    if (id_tecnico) {
        filtro.push(id_tecnico);
        sql += " AND pa.id_tecnico = $" + filtro.length;
    }

    sql += " order by pa.booking_date, pa.booking_hour";

    const appointments = await pool.query(sql, filtro);

    return appointments.rows;
}
async function Inserir(id_client, id_tecnico, id_service, booking_date, booking_hour) {

    let sql = `insert into powertech_appointments(id_client,
         id_tecnico, id_service, booking_date, booking_hour) 
         values($1, $2, $3, $4, $5) returning id_appointment`;
    try {
        const appointment = await pool.query(sql, [id_client,
            id_tecnico, id_service, booking_date, booking_hour]);

        return appointment.rows[0];
    } catch (err) {
        console.error("Erro ao inserir agendamento:", err);
        throw err; // ou return { success: false, error: err.message };
    }
}
export default { Listar, Inserir }