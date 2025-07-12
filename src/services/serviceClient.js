import bcrypt from "bcrypt";
import jwt from "../token.js";
import repoClient from "../repositories/repoClient.js";

async function Inserir(name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const client = await repoClient.Inserir(name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, phone_contato, task, email, hashPassword);

    client.token = jwt.CreateToken(client.id_client);

    return client;
}

async function Profile(id_client) {

    const client = await repoClient.Profile(id_client);

    return client;
}


async function Listar() {

    const client = await repoClient.Listar();

    return client;
}

async function Editar(id_client, name, email, phone_number) {

    const client = await repoClient.Editar(id_client, name, email, phone_number);

    return client;
}

async function Excluir(id_client) {

    const client = await repoClient.Excluir(id_client);

    return client;
}
async function Buscar(termo) {
    try {
        const resultado = await repoClient.Buscar(termo);
        return resultado;
    } catch (err) {
        console.error(err);
        throw new Error('Erro ao buscar clientes');
    }
}

export default { Inserir, Listar, Editar, Excluir, Profile, Buscar }