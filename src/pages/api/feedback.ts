import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handleFeedback(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { user_id, course_code, rating, comment, no_chapter_completed } = req.body;
            const feedback = await prisma.feedback.create({
                data: {
                    user_id,
                    course_code,
                    rating,
                    comment,
                    no_chapter_completed,
                },
            });
            res.status(200).json({ detail: " Your feedback Successfullly submitted" });
        } catch (error) {
            res.status(500).json({ error: 'Failed to sent feedback' });
        }
    } else {
        res.status(400).json({ error: 'Invalid request method' });
    }
}
