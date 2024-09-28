import mysql from 'mysql2/promise';

export async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USER, // 데이터베이스 사용자
    password: process.env.NEXT_PUBLIC_DB_PASSWORD, // 데이터베이스 비밀번호
    database: process.env.NEXT_PUBLIC_DB_NAME, // 데이터베이스 이름
  });

  return connection;
}
