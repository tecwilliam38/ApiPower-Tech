import pool from "../database/pool.index.js";


async function verificaEmailExistente(email) {
    try {
        const query = 'SELECT count(*) FROM powertech_client WHERE email = $1';
        const result = await pool.query(query, [email]);
        return parseInt(result.rows[0].count) > 0;
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        throw error;
    }
}

async function Inserir(
    name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, email, password
) {
    try {
        const emailJaExiste = await verificaEmailExistente(email);
        if (emailJaExiste) {
            console.log('Email já cadastrado.');
            return { erro: 'Email já cadastrado' };

        }
        console.log('Email disponível para cadastro.');
        const sqlInsert = `
            INSERT INTO powertech_client (name, doc_id, endereco_rua, endereco_bairro,
                endereco_cidade, phone_contato, task, email, password)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id_client;
        `;

        const result = await pool.query(sqlInsert, [
            name, doc_id, endereco_rua, endereco_bairro,
            endereco_cidade, phone_contato, task, email, password
        ]);

        return result.rows[0]; // Retorna o cliente inserido com id_client
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        throw error;
    }
}
async function Profile(id_client) {
    let sql = `select id_client, name as tecnico, email, 
    phone_number as celular from powertech_client where id_client = $1`;

    const client = await pool.query(sql, [id_client]);
    return client.rows[0];
}
async function Listar() {

    let sql = `select id_client, name, doc_id as inep, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, phone_contato, email from powertech_client order by name`;
    const clients = await pool.query(sql, []);
    return clients.rows;
}

async function Editar(id_client, name, email, phone_number) {

    let sql = `update powertech_client set name=$1, email=$2, phone_number=$3
where id_client = $4`;

    await pool.query(sql, [name, email, phone_number, id_client]);
    return { id_client };
}

async function Excluir(id_client) {

    let sql = `delete from powertech_client where id_client=$1`;

    await pool.query(sql, [id_client]);

    return { id_client };
}

async function Buscar(termo) {
    try {
        const sql = `SELECT id_client, name, doc_id as inep, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, phone_contato, email
                     FROM powertech_client
                     WHERE name ILIKE $1 OR email ILIKE $1`;
        const resultado = await pool.query(sql, [`%${termo}%`]);
        return resultado.rows;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}

export default { Inserir, Listar, Editar, Excluir, Profile, Buscar }