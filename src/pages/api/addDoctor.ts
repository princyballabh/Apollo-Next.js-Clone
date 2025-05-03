import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, specialization, experience, location, fee } = req.body;

        try {
            const db = await connectToDatabase();
            const collection = db.collection('doctors');

            const doctor = {
                name,
                specialization,
                experience: parseInt(experience, 10),
                location,
                fee: parseInt(fee, 10),
            };

            await collection.insertOne(doctor);
            res.status(201).json({ message: 'Doctor added successfully' });
        } catch (error) {
            console.error('Error adding doctor:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}