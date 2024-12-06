import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { createConnection } from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { NextFunction, Request, Response } from 'express';

export const config = {
  api: {
    bodyParser: false,
  },
};

type NextApiRequestWithFile = NextApiRequest & {
  file?: Express.Multer.File;
};

const upload = multer({
  dest: './public/uploads',
  limits: { fileSize: 10 * 1024 * 1024 },
});

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: Request, res: Response, next: NextFunction) => void
) =>
  new Promise<void>((resolve, reject) => {
    fn(
      req as unknown as Request,
      res as unknown as Response,
      (error?: Error | string | undefined) => {
        if (error && typeof error !== 'undefined') {
          return reject(error);
        }
        resolve();
      }
    );
  });

// 게시글 업로드

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  await runMiddleware(req, res, upload.single('board_img'));

  const connection = await createConnection();

  try {
    const { id, board_title, board_content, board_user_id, createdAt } =
      req.body;
    console.log('req.body', req.body);

    if (!id || !board_title || !board_content || !board_user_id) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }

    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM board WHERE id = ?',
      [id]
    );

    console.log('rows', rows);

    if (rows.length > 0) {
      if (req.file?.filename) {
        const board_img = `/uploads/${req.file?.filename}`;
        const [result] = await connection.execute<ResultSetHeader>(
          'UPDATE board SET board_title = ?, board_content = ?, board_user_id = ?, board_img = ? WHERE id = ?',
          [board_title, board_content, board_user_id, board_img, id]
        );

        if (result.affectedRows > 0) {
          res.status(200).json({
            success: true,
            message: 'Update successful',
            data: {
              id,
              board_title,
              board_content,
              board_user_id,
              board_img,
              createdAt,
            },
          });
        } else {
          res.status(500).json({ success: false, message: 'Server error' });
        }
      } else {
        const [result] = await connection.execute<ResultSetHeader>(
          'UPDATE board SET board_title = ?, board_content = ?, board_user_id = ? WHERE id = ?',
          [board_title, board_content, board_user_id, id]
        );

        if (result.affectedRows > 0) {
          res.status(200).json({
            success: true,
            message: 'Update successful',
            data: rows[0],
          });
        } else {
          res.status(500).json({ success: false, message: 'Server error' });
        }
      }
    } else {
      res.status(404).json({ success: false, message: 'Board not found' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  } finally {
    connection.end();
  }
}
