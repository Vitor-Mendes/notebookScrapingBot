import pkg from 'pg';
const { Pool } = pkg;

export async function connect() {
    if (global.connection)
        return global.connection.connect();

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });
 
    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    global.connection = pool;
    return pool.connect();
}