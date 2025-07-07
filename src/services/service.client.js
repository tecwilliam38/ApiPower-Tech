import bcrypt from "bcrypt";

import jwt from "../token.js";
import repoClient from "../repositories/repository.client.js";

async function Inserir(name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const client = await repoClient.Inserir(name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, phone_contato, task, email, hashPassword);

    client.token = jwt.CreateToken(client.id_client);

    return client;
}

    // async function Profile(id_user) {

    //     const user = await repoUser.Profile(id_user);

    //     return user;
    // }


async function Listar() {

    const client = await repoClient.Listar();

    return client;
}

async function Editar(id_user, name, email, phone_number) {

    const user = await repoUser.Editar(id_user, name, email, phone_number);

    return user;
}

async function Excluir(id_user) {

    const user = await repoUser.Excluir(id_user);

    return user;
}

export default { Inserir, Listar, Editar, Excluir }