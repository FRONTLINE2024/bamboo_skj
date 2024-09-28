import { createConnection } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

// 게시글 유저 아이디로 조회
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();

  try {
    if (req.method === 'GET') {
      const { board_user_id } = req.query;
      const [rows, fields] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM board WHERE board_user_id = ?',
        [board_user_id]
      );
      console.log(rows);

      if (rows.length > 0) {
        res.status(200).json({ sucess: true, data: rows });
      } else {
        res.status(404).json({ sucess: false, message: 'Board Not Exists!' });
      }
    }
  } catch (e) {
    res.status(500).json({ sucess: false, message: e });
  } finally {
    connection.end();
  }
}
