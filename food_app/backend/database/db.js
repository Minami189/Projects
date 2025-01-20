import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise();
initializeTables();

async function initializeTables() {
    try {
        const [rows] = await pool.query(
            `SELECT COUNT(*) AS count 
             FROM information_schema.tables 
             WHERE table_schema = ? AND table_name = ?`,
            [process.env.DATABASE, "food"]
        ); 

        const [rows2] = await pool.query(
            `SELECT COUNT(*) AS count 
             FROM information_schema.tables 
             WHERE table_schema = ? AND table_name = ?`,
            [process.env.DATABASE, "plan"]
        ); 

        if (rows[0].count > 0) {
            console.log("Table food exists");
        } else {
            await pool.query(`CREATE TABLE food (
                            idfood INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                            lastEaten DATE DEFAULT NULL,
                            meat VARCHAR(25) DEFAULT 'UNKNOWN',
                            name VARCHAR(45) NOT NULL
                            );`
                        );
        }

        if (rows2[0].count > 0) {
            console.log("Table plan exists");
        } else {
            await pool.query(`CREATE TABLE plan (
                            idplan INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                            idfood INT NOT NULL,
                            FOREIGN KEY (idfood) REFERENCES food(idfood)
                            );`
                        );
        }
    } catch (err) {
        console.error("Error checking table existence:", err);
    }
}

async function createPlanTable(){
    
}

export default pool;