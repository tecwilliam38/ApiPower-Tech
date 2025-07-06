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

// async function Profile(id_user) {
//     let sql = `select id_user, name as tecnico, email, 
//     phone_number as celular from powertech_users where id_user = $1`;

//     const user = await pool.query(sql, [id_user]);
//     return user.rows[0];
// }
async function Listar() {

    let sql = `select id_client, name, doc_id as cne, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, phone_contato, email from powertech_client order by name`;
    const clients = await pool.query(sql, []);
    return clients.rows;
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



export default { Inserir, Listar, Editar, Excluir }