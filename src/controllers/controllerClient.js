import serviceClient from "../services/serviceClient.js";

async function Inserir(req, res) {

    const { name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, email, password} = req.body;

    const user = await serviceClient.Inserir(name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, email, password);

    res.status(201).json(user);
}

async function Profile(req, res) {

    const id_client = req.id_client;
    const client = await serviceClient.Profile(id_client);

    res.status(200).json(client);
}

async function Listar(req, res) {

    const client = await serviceClient.Listar();

    res.status(200).json(client);
}

async function Editar(req, res) {

    const id_client = req.params.id_client;
    const { name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, email, password} = req.body;

    // const user = await serviceClient.Editar(id_client, name, email, phone_number);
    const client = await serviceClient.Editar(id_client, name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, email, password);

    res.status(200).json(client);
}

async function Excluir(req, res) {

    const id_client = req.params.id_client;

    const client = await serviceClient.Excluir(id_client);

    res.status(200).json(client);
}

export default { Inserir, Profile, Listar, Editar, Excluir }