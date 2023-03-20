import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

type CourseEvent = {
  course_code: string;
  event_name: string;
  event_type: string;
  event_date: string;
  description?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: `${req.method} not allowed` });
  }

  const body: CourseEvent = JSON.parse(req.body);

  try {
    const courseEvent = await prisma.course_event.create({
      data: {
        ...body,
        event_date: new Date(body.event_date),
      },
      select: {
        event_name: true,
        event_type: true,
        event_date: true,
        description: true,
      },
    });
    return res.status(200).json(courseEvent);
  } catch (e) {
    console.error(e);
    res
      .status(403)
      .json({ detail: "Invalid body arguments to create a course Event" });
  }
}
