import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { departmentMapper } from "@/lib/utils";
import { Course } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ detail: `${req.method} not allowed` });
  }

  const filterBy = req.query.filterBy as string;
  let filterVal = req.query.filterVal;

  if (filterBy === "chapter_length" || filterBy === "no_week_take") {
    //@ts-ignore
    filterVal = parseInt(filterVal);
  }

  const courses = await prisma.course.findMany({
    where: {
      [filterBy]: filterVal,
    },
  });

  res.status(200).json({ courses });
}
