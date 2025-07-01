import pool from "../database/pool.index.js";

async function Inserir(name, cel_phone, endereco, email, specialty, password, created_at, updated_at) {
    async function verificaEmailExistente(email) {
        try {
            const query = 'SELECT count(*) FROM powertech_tecnicos WHERE email = $1';
            const result = await pool.query(query, [email]);

            return result.rows[0].count > 0; // Retorna true se o email já existe
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    }

    const emailJaExiste = await verificaEmailExistente(email);
     if (emailJaExiste) {
        console.log('Email já cadastrado.');
        return [];
    }

    const insertQuery = `
        INSERT INTO powertech_tecnicos (name, cel_phone, endereco, email, specialty, password, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp)
        RETURNING id_tecnico
    `;

    try {
        const result = await pool.query(insertQuery, [name, cel_phone, endereco, email, specialty, password]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir:', error);
        throw error;
    }
}
async function InserirAdmin(name, email, phone_number, password, created_at, updated_at) {

    async function verificaEmailExistente(email) {
        try {
            const query = 'SELECT count(*) FROM powertech_admin WHERE email = $1';
            const result = await pool.query(query, [email]);

            return result.rows[0].count > 0; // Retorna true se o email já existe
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    }

    const emailJaExiste = await verificaEmailExistente(email);
    if (emailJaExiste) {
        console.log('Email já cadastrado.');
        return [];
    } else {
        // console.log('Email disponível para cadastro.'); 
        let sql = `insert into powertech_admin(name, email, phone_number, password, created_at, updated_at) 
        values($1, $2, $3, $4, current_timestamp, current_timestamp)
        returning id_admin`;

        try {
            const results = await pool.query(`
                SELECT *
                FROM powertech_admin
                WHERE email = ${email};
                `);
            console.log(results);

            return results.rows;
        } catch (e) {
            const admin = await pool.query(sql, [name, email, phone_number, password]);
            return admin.rows[0];
        }
    }
}

async function ListarByEmail(email) {
    let sql = `select * from powertech_tecnicos where email = $1`;
    try {
        const user = await pool.query(sql, [email]);
        if (user.length == 0)
            return [];
        else
            return user.rows[0];
    } catch (err) {
        console.log(err);
    }
}
async function ListarByEmailAdmin(email) {
    let sql = `select * from powertech_admin where email = $1`;
    try {
        const user = await pool.query(sql, [email]);
        if (user.length == 0)
            return [];
        else
            return user.rows[0];
    } catch (err) {
        console.log(err);
    }
}

async function Profile(id_user) {
    let sql = `select id_user, name as tecnico, email, 
    phone_number as celular from powertech_users where id_user = $1`;

    const user = await pool.query(sql, [id_user]);
    return user.rows[0];
}

async function ProfileAdmin(id_admin) {
    let sql = `select id_admin, name as tecnico_admin, email, 
    phone_number as celular from powertech_admin where id_admin = $1`;

    const admin = await pool.query(sql, [id_admin]);
    console.log(admin.rows[0]);

    return admin.rows[0];
}

async function Listar() {

    let sql = `select id_tecnico, name, email, endereco, cel_phone, specialty as skill from powertech_tecnicos order by name`;

    const tecnicos = await pool.query(sql, []);
    return tecnicos.rows;
}

async function Editar(id_user, name, email, phone_number) {

    let sql = `update powertech_users set name=$1, email=$2, phone_number=$3
where id_user = $4`;

    await pool.query(sql, [name, email, phone_number, id_user]);
    return { id_user };
}

async function Excluir(id_user) {

    let sql = `delete from powertech_users where id_user=$1`;

    await pool.query(sql, [id_user]);

    return { id_user };
}
async function ListarServicos(id_tecnico) {

    let sql = `select pts.id_service, s.description, pts.price
    from powertech_tecnicos_services pts
    join powertech_services s on (s.id_service = pts.id_service)
    where pts.id_tecnico = $1
    order by s.description`;

    const serv_tecnico = await pool.query(sql, [id_tecnico]);

    return serv_tecnico.rows;
}

export default {
    Inserir, InserirAdmin, Listar, ListarByEmail,ListarServicos,
    Profile, ListarByEmailAdmin, ProfileAdmin, Editar, Excluir
}