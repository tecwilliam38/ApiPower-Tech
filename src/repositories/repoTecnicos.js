import pool from '../database/poolIndex.js';


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
async function Inserir(name, cel_phone, endereco, email, specialty, password, created_at, updated_at) {


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
        return parseInt(result.rows[0].count, 10) > 0;
    } catch (error) {
        console.error('Erro ao inserir:', error);
        throw error;
    }
}

async function Editar(id_tecnico, name, cel_phone, endereco, email, specialty, password) {

    let sql = `update powertech_tecnicos set name=$1, email=$2, cel_phone=$3, endereco=$4, specialty=$5, password=$6
where id_tecnico = $7`;

    await pool.query(sql, [name, email, cel_phone, endereco, specialty, password, id_tecnico]);
    return { id_tecnico };
}

async function Excluir(id_tecnico) {

    let sql = `delete from powertech_tecnicos where id_tecnico=$1`;

    await pool.query(sql, [id_tecnico]);

    return { id_tecnico };
}

async function Listar() {

    let sql = `select id_tecnico, name, email, endereco, cel_phone, specialty as skill from powertech_tecnicos order by name`;

    const tecnicos = await pool.query(sql, []);
    return tecnicos.rows;
}

export default { Inserir, Listar, Editar, Excluir };


