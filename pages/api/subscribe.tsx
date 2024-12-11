// pages/api/subscribe.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

type ResponseData = {
  message?: string;
  error?: string;
};

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void> {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({ error: 'Invalid email address' });
      return;
    }

    try {
      await client.connect();
      const database = client.db('waitlistEmailCollection'); // Change to your database name
      const collection = database.collection('emails'); // Change to your collection name

      const result = await collection.insertOne({ email, createdAt: new Date() });
      console.log('New email stored:', result.insertedId);

      res.status(200).json({ message: 'Email submitted successfully!' });
    } catch (error) {
      console.error('Error storing email:', error);
      res.status(500).json({ error: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
