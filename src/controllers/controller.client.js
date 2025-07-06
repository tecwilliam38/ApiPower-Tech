import serviceClient from "../services/service.client.js";


async function Inserir(req, res) {

    const { name, email, phone_number, password } = req.body;

    const user = await serviceClient.Inserir(name, email, phone_number, password);

    res.status(201).json(user);
}

async function Profile(req, res) {

    const id_user = req.id_user;
    const user = await serviceClient.Profile(id_user);

    res.status(200).json(user);
}

async function Listar(req, res) {

    const client = await serviceClient.Listar();

    res.status(200).json(client);
}

async function Editar(req, res) {

    const id_user = req.params.id_user;
    const { name, email, phone_number } = req.body;

    const user = await serviceClient.Editar(id_user, name, email, phone_number);

    res.status(200).json(user);
}

async function Excluir(req, res) {

    const id_user = req.params.id_user;

    const user = await serviceClient.Excluir(id_user);

    res.status(200).json(user);
}

export default { Inserir, Profile, Listar, Editar, Excluir }