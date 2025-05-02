import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, specialization, experience, location, fee } = req.body;

        if (!name || !specialization || !experience || !location || !fee) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const db = await connectToDatabase();
            const collection = db.collection('doctors');
            await collection.insertOne({ name, specialization, experience, location, fee });
            res.status(201).json({ message: 'Doctor added successfully' });
        } catch (error) {
            // Safely handle the error
            if (error instanceof Error) {
                console.error('Error adding doctor:', error.message);
                res.status(500).json({ message: 'Internal Server Error', error: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}