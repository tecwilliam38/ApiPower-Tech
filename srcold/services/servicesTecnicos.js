import repoTecnicos from '../repositories/repoTecnicos.js';
import jwt from '../token.js';
import bcrypt from 'bcrypt';

async function Inserir(name, cel_phone, endereco, email, specialty, password) {
    const hashPassword = await bcrypt.hash(password, 10);

    const tecnicos = await repoTecnicos.Inserir(name, cel_phone, endereco, email, specialty, hashPassword);
    tecnicos.token = jwt.CreateToken(tecnicos.id_tecnico);

    return tecnicos;
}

async function Listar(name) {

    const tecnicos = await repoTecnicos.Listar(name);

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

export default { Listar, Inserir, Editar, Excluir };

