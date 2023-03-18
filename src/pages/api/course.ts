import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { departmentMapper } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    try {
      const course = await prisma.course.create({
        data: {
          ...body,
          ...(body.department && {
            department: departmentMapper(body.department),
          }),
          no_week_take: parseInt(body.no_week_take),
          chapter_length: parseInt(body.chapter_length),
          batch: body.batch,
        },
      });
      res.redirect("/depthead");
      res.status(200).json({ detail: "Successfullly created user" });
    } catch (e) {
      console.log(e);
      res.status(403).json({ detail: "Invalid arguments to create user" });
    }
  } else if (req.method === "PUT") {
    const body = JSON.parse(req.body);
    try {
      const updateCourse = await prisma.course.update({
        where: {
          course_code: body.course_code,
        },
        data: {
          ...body,
        },
      });
    } catch (e) {
      return res.status(403).json({ detail: "Course doesn't exist'" });
    }

    return res.status(200).redirect("/");
  }
}
