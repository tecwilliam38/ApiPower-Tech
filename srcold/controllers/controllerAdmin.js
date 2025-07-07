import serviceAdmin from "../services/serviceAdmin.js";


async function InserirAdmin(req, res) {

    const { name, email, phone_number, password } = req.body;

    const user = await serviceAdmin.InserirAdmin(name, email, phone_number, password);

    res.status(201).json(user);
}

async function LoginAdmin(req, res) {

    const { email, password } = req.body;
    const user = await serviceAdmin.LoginAdmin(email, password);
    if (!user)
        res.status(401).json({ error: "E-mail ou senha inválida" });
    else
        res.status(200).json(user);
}
async function ProfileAdmin(req, res) {

    const id_user = req.id_user;
    console.log(id_user);
    const admin = await serviceAdmin.ProfileAdmin(id_user);

    res.status(200).json(admin);
}

async function ListarAdmin(req, res) {

    const userAdmin = await serviceAdmin.Listar();

    res.status(200).json(userAdmin);
}
async function EditarAdmin(req, res) {

    const id_admin = req.params.id_admin;
    const { name, email, phone_number } = req.body;

    const admin = await serviceAdmin.EditarAdmin(id_admin, name, email, phone_number);

    res.status(200).json(admin);
}

async function ExcluirAdmin(req, res) {

    const id_admin = req.params.id_admin;

    const admin = await serviceAdmin.ExcluirAdmin(id_admin);

    res.status(200).json(admin);
}

export default { InserirAdmin, LoginAdmin, ProfileAdmin, ListarAdmin, EditarAdmin, ExcluirAdmin };