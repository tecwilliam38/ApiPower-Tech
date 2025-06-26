import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
     user: 'postgres.ffmdyodydnwimwrrjobg',
     host: 'aws-0-sa-east-1.pooler.supabase.com',
     database: 'postgres',
     password: 'XQIv1RBbzXV2QIbq',
     port: 6543,
});


export default pool;



