import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
     user: 'postgres.xiixmtxqzqhydfrfwoql',
     host: 'aws-0-sa-east-1.pooler.supabase.com',
     database: 'postgres',
     password: 'Estacio091@@',
     port: 6543,
});
// user: 'postgres.ffmdyodydnwimwrrjobg',
// postgres.xiixmtxqzqhydfrfwoql
// aws-0-sa-east-1.pooler.supabase.com
// password: 'XQIv1RBbzXV2QIbq',


export default pool;



