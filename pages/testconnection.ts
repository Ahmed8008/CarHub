import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
        host: 'fdb1030.awardspace.net',
  user: '4516115_registrationdbb',
  password: 'Ahmed12@',
  database: '4516115_registrationdbb',
      });
    console.log('Database connection successful');
    await connection.end();
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

testConnection();
