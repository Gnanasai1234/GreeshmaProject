const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Greeshma@031006',
    database: process.env.DB_NAME || 'diabetes_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection (non-blocking)
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL Connected Successfully - diabetes_db');
        connection.release();
    } catch (error) {
        console.error('MySQL Connection Failed:', error.message);
        console.error('Check your .env file DB_PASSWORD setting.');
    }
})();

module.exports = pool;
