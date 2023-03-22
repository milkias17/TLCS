import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type Data = {
  detail: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.cookies.sessionId) {
    return res.status(200).json({ detail: "Already logged out" });
  }

  const sessionId = req.cookies.sessionId as string;
  const session = await prisma.session.findUnique({
    where: {
      uuid: sessionId,
    },
  });

  if (!session) {
    return res.status(401).json({ detail: "Invalid session id" });
  }

  await prisma.session.delete({
    where: {
      uuid: sessionId,
    },
  });

  const cookie = serialize("sessionId", sessionId, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  res.redirect("/");

  res.status(200).json({ detail: "Logged out successfully" });
}
