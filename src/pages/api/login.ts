import { roleMapper } from "@/lib/utils";
import { checkPassword } from "@lib/passwordHandlers";
import prisma from "@lib/prisma";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid4 } from "uuid";

interface LoginBody {
  email: string;
  password: string;
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: LoginBody = JSON.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: "Email hasn't been registered",
    });
  }

  if (user.role !== roleMapper(body.role)) {
    return res.status(401).json({
      error: "Trying to access unauthorized role",
    });
  }

  if (!(await checkPassword(body.password, user.password))) {
    return res.status(401).json({
      error: "Invalid Password",
    });
  }

  const session = await prisma.session.create({
    data: {
      user_id: user.user_id,
      uuid: uuid4(),
    },
  });
  const cookie = serialize("sessionId", session.uuid, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7
  });
  res.setHeader("Set-Cookie", cookie).status(200);
}
