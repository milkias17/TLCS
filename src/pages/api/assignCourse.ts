import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

type AssignCourse = {
  instructor_id: string;
  user_id: string;
  course_code: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json(`${req.method} not allowed`);
  }

  const body: AssignCourse = JSON.parse(req.body);
  console.log(body);

  try {
    const assignedCourse = await prisma.assign_course.create({
      data: {
        ...body
      },
    });
    return res.status(200).redirect("/");
  } catch (e) {
    return res
      .status(403)
      .json({ detail: "Invalid input for course assignment" });
  }
}
