import { createConnection } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

// 게시글 조회
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();

  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM board WHERE id = ?',
        [id]
      );

      const [userData] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM user WHERE user_index = ?',
        [rows[0].board_user_id]
      );

      if (rows.length > 0) {
        const data = {
          ...rows[0],
          university: userData[0].university,
          user_nickname: userData[0].user_nickname,
        };
        res.status(200).json({ sucess: true, data });
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
