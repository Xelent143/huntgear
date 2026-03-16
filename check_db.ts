import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config";

async function main() {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL!);
        console.log("Connected successfully. Showing columns in products table:");

        const [rows, fields] = await connection.execute('SHOW COLUMNS FROM products');
        console.log(rows);

        await connection.end();
    } catch (err: any) {
        console.error("Failed:", err.message);
    }
}

main();
