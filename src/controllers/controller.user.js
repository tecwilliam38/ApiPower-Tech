import serviceUser from "../services/service.user.js";

async function Inserir(req, res) {

    const { name, email, phone_number, password } = req.body;

    const user = await serviceUser.Inserir(name, email, phone_number, password);

    res.status(201).json(user);
}

async function InserirAdmin(req, res) {

    const { name, email, phone_number, password } = req.body;

    const user = await serviceUser.InserirAdmin(name, email, phone_number, password);

    res.status(201).json(user);
}

async function Login(req, res) {

    const { email, password } = req.body;

    const user = await serviceUser.Login(email, password);

    if (user.length == 0)
        res.status(401).json({ error: "E-mail ou senha inválida" });
    else
        res.status(200).json(user);
}

async function LoginAdmin(req, res) {

    const { email, password } = req.body;

    const user = await serviceUser.LoginAdmin(email, password);

    // if (user.length == 0)
    if (!user)
        res.status(401).json({ error: "E-mail ou senha inválida" });
    else
        res.status(200).json(user);
}

async function Profile(req, res) {

    const id_user = req.id_user;
    const user = await serviceUser.Profile(id_user);

    res.status(200).json(user);
}

async function ProfileAdmin(req, res) {

    const id_user = req.id_user;
    console.log(id_user);
    
    const admin = await serviceUser.ProfileAdmin(id_user);

    res.status(200).json(admin);
}


async function Listar(req, res) {

    const users = await serviceUser.Listar();

    res.status(200).json(users);
}

async function Editar(req, res) {

    const id_user = req.params.id_user;
    const { name, email, phone_number } = req.body;

    const user = await serviceUser.Editar(id_user, name, email, phone_number);

    res.status(200).json(user);
}

async function Excluir(req, res) {

    const id_user = req.params.id_user;

    const user = await serviceUser.Excluir(id_user);

    res.status(200).json(user);
}

export default { Inserir, Login, Profile, InserirAdmin, 
    LoginAdmin, Listar, ProfileAdmin, Editar, Excluir }