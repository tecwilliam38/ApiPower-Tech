

async function InserirAdmin(name, email, phone_number, password, created_at, updated_at) {

    async function verificaEmailExistente(email) {
        try {
            const query = 'SELECT count(*) FROM powertech_admin WHERE email = $1';
            const result = await pool.query(query, [email]);

            return result.rows[0].count > 0; // Retorna true se o email já existe
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    }

    const emailJaExiste = await verificaEmailExistente(email);
    if (emailJaExiste) {
        console.log('Email já cadastrado.');
        return [];
    } else {        
        let sql = `insert into powertech_admin(name, email, phone_number, password, created_at, updated_at) 
        values($1, $2, $3, $4, current_timestamp, current_timestamp)
        returning id_admin`;

        try {
            const results = await pool.query(`
                SELECT *
                FROM powertech_admin
                WHERE email = ${email};
                `);
            console.log(results);

            return results.rows;
        } catch (e) {
            const admin = await pool.query(sql, [name, email, phone_number, password]);
            return admin.rows[0];
        }
    }
}
async function ListarByEmailAdmin(email) {
    let sql = `select * from powertech_admin where email = $1`;
    try {
        const user = await pool.query(sql, [email]);
        if (user.length == 0)
            return [];
        else
            return user.rows[0];
    } catch (err) {
        console.log(err);
    }
}
async function ListarAdmin() {

    let sql = `select id_admin, name, email from powertech_admin order by name`;

    const admins = await pool.query(sql, []);
    return admins.rows;
}

export default { InserirAdmin, ListarAdmin, ListarByEmailAdmin };