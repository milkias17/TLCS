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
  } else if (req.method === "GET") {
    const user = await prisma.session.findUnique({
      where: {
        uuid: req.cookies.sessionId,
      },
    });
    if (!user) {
      return res.redirect("/");
    }

    // const courses = await pri
  }
}
