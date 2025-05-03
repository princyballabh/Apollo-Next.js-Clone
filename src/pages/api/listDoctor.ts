// filepath: src/pages/api/listDoctor.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { specialization, experience, fee, page = 1, limit = 10 } = req.query;

        try {
            const db = await connectToDatabase();
            const collection = db.collection('doctors');

            const filters: any = {};
            if (specialization) filters.specialization = specialization;
            if (experience) {
                const [minExperience, maxExperience] = (experience as string).split('-').map(Number);
                if (!isNaN(minExperience) && !isNaN(maxExperience)) {
                    filters.experience = { $gte: minExperience, $lte: maxExperience };
                } else if (!isNaN(minExperience)) {
                    filters.experience = { $gte: minExperience };
                } else if (!isNaN(maxExperience)) {
                    filters.experience = { $lte: maxExperience };
                }
            }
            if (fee) {
                const [minFee, maxFee] = (fee as string).split('-').map(Number);
                if (!isNaN(minFee) && !isNaN(maxFee)) {
                    filters.fee = { $gte: minFee, $lte: maxFee };
                } else if (!isNaN(minFee)) {
                    filters.fee = { $gte: minFee };
                } else if (!isNaN(maxFee)) {
                    filters.fee = { $lte: maxFee };
                }
            }

            const doctors = await collection
                .find(filters)
                .skip((parseInt(page as string) - 1) * parseInt(limit as string))
                .limit(parseInt(limit as string))
                .toArray();

            res.status(200).json({ doctors });
        } catch (error) {
            console.error('Error fetching doctors:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}