import bcrypt from "bcrypt";

import jwt from "../token.js";
import repoClient from "../repositories/repository.client.js";

async function Inserir(name, email, phone_number, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repoClient.Inserir(name, email, phone_number, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;
}

async function InserirAdmin(name, email, phone_number, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await repoClient.InserirAdmin(name, email, phone_number, hashPassword);

    admin.token = jwt.CreateToken(admin.id_admin);

    return admin;
}

async function Login(email, password) {

    const user = await repoClient.ListarByEmail(email);

    if (user.length == 0)
        return [];
    else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;

            user.token = jwt.CreateToken(user.id_user);

            return user;
        } else
            return [];
    }
}

async function LoginAdmin(email, password) {

    const admin = await repoUser.ListarByEmailAdmin(email);

    if (!admin)
        return null;
    else {
        if (await bcrypt.compare(password, admin.password)) {
            delete admin.password;

            admin.token = jwt.CreateToken(admin.id_admin);

            return admin;
        } else
            return [];
    }
}

async function Profile(id_user) {

    const user = await repoUser.Profile(id_user);

    return user;
}

async function ProfileAdmin(id_admin) {

    const admin = await repoUser.ProfileAdmin(id_admin);

    return admin;
}

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

export default { Inserir, Login, Profile, 
    InserirAdmin, LoginAdmin, Listar, ProfileAdmin, Editar, Excluir }