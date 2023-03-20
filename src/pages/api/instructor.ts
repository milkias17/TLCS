import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ detail: `${req.method} not allowed` });
  }

  const filterBy = req.query.filterBy as string;
  let filterVal = req.query.filterVal;

  try {
    const instructors = await prisma.user.findMany({
      where: {
        [filterBy]: filterVal,
        role: "INSTRUCTOR",
      },
      select: {
        user_id: true,
        fname: true,
        lname: true,
        email: true,
        department: true
      }
    });

    res.status(200).json({ instructors });
  } catch (e) {
    res.status(403).json({ detail: "No match found" });
  }
}
