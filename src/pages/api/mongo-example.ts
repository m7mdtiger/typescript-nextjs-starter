import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import logger from '@/lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const client = await clientPromise;
    const db = client!.db('sample_mflix'); // Optional chaining here

    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    console.log('movies', movies);

    res.json({ movies });
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
