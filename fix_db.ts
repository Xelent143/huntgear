import { getDb } from "./server/db";
import { sql } from "drizzle-orm";

async function run() {
    const db = await getDb();
    if (!db) {
        console.error("No database connection available.");
        process.exit(1);
    }
    console.log("Connected to database. Attempting to add new columns to users table...");

    try {
        await db.execute(sql`
            ALTER TABLE \`users\`
            ADD COLUMN \`savedModelImageBase64\` LONGTEXT,
            ADD COLUMN \`savedModelImageMimeType\` VARCHAR(255);
        `);
        console.log("✅ Successfully added columns to users table.");
    } catch (err: any) {
        // Handle case where they might already exist
        if (err.message && err.message.includes("Duplicate column name")) {
            console.log("ℹ️ Columns already exist in the database.");
        } else {
            console.error("❌ Failed to alter table:", err);
            process.exit(1);
        }
    }

    process.exit(0);
}

run();
