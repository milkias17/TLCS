import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { user_id, course_code, rating, comment, no_chapter_completed } =
        JSON.parse(req.body);
      const feedback = await prisma.feedback.create({
        data: {
          user_id,
          course_code,
          rating: parseInt(rating),
          comment,
          no_chapter_completed: parseInt(no_chapter_completed),
        },
      });
      res.status(200).redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to sent feedback" });
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
