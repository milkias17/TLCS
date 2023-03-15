import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!("sessionId" in req.cookies)) {
    return res.status(401).json({ error: "You have not logged in!" });
  }

  const sessionId = req.cookies.sessionId!;
  const session = await prisma.session.findUnique({
    where: {
      uuid: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return res.status(200).json({ error: "Session doesn't exist" });
  }

  res.status(200).json({
    fname: session.user.fname,
    lname: session.user.lname,
    role: session.user.role,
  });
}
