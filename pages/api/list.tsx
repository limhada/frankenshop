import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../util/database';

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectDB;
  const db = client.db('frankenshop');
  let result = await db.collection('list').find().toArray();

  if (req.method === 'GET') {
    // console.log(result);
    return res.status(200).json(result);
  }
}
