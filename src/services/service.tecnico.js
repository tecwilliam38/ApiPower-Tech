import repoTecnicos from "../repositories/repository.tecnico.js";
import jwt from "../token.js";
import bcrypt from "bcrypt";


async function Listar(name) {

    const tecnicos = await repoTecnicos.Listar(name);

    return tecnicos;
}

async function Inserir(name, cel_phone, endereco, email, specialty, password) {
    const hashPassword = await bcrypt.hash(password, 10);
    const tecnicos = await repoTecnicos.Inserir(name, cel_phone, endereco, email, specialty, hashPassword);
    tecnicos.token = jwt.CreateToken(tecnicos.id_tecnico);

    return tecnicos;
}

async function Editar(id_tecnico, name, specialty, icon) {

    const tecnicos = await repoTecnicos.Editar(id_tecnico, name, specialty, icon);

    return tecnicos;
}

async function Excluir(id_tecnico) {

    const tecnicos = await repoTecnicos.Excluir(id_tecnico);

    return tecnicos;
}

async function ListarServicos(id_tecnico) {

    const serv_tecnico = await repoTecnicos.ListarServicos(id_tecnico);

    return serv_tecnico;
}


export default { Listar, Inserir, Editar, Excluir, ListarServicos }