import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "PUT") {
    return res.status(405).json({ detail: `${req.method} not allowed` });
  }

  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const outline = await prisma.course_outline.create({
        data: {
          course_code: body.courseCode,
          course_objectives: body.course_objectives,
          topics: body.topics,
          no_chapterperweek: parseInt(body.chapterPerWeek),
        },
      });
      return res.status(200).redirect("/");
    } catch (e) {
      console.log(e);
      return res
        .status(403)
        .json({ detail: "Invalid body arguments to create a course outline" });
    }
  } else if (req.method === "PUT") {
    try {
      const body = JSON.parse(req.body);
      const outline = await prisma.course_outline.update({
        where: {
          course_code: body.courseCode,
        },
        data: {
          course_objectives: body.course_objectives,
          topics: body.topics,
          no_chapterperweek: parseInt(body.chapterPerWeek),
        },
      });
      return res.status(200).redirect("/");
    } catch (e) {
      console.log(e);
      return res
        .status(403)
        .json({ detail: "Invalid body arguments to update a course outline" });
    }
  }
}
