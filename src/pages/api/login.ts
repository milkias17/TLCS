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
  if (req.cookies.sessionId) {
    console.log("Already logged in");
    return res.redirect("/");
  }

  const body: LoginBody = JSON.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return res.status(401).json({
      detail: "Email hasn't been registered",
    });
  }

  if (user.role !== roleMapper(body.role)) {
    return res.status(401).json({
      detail: "Trying to access unauthorized role",
    });
  }

  if (!(await checkPassword(body.password, user.password))) {
    return res.status(401).json({
      detail: "Invalid Password",
    });
  }

  let session = await prisma.session.findUnique({
    where: {
      user_id: user.user_id,
    },
  });

  if (!session) {
    session = await prisma.session.create({
      data: {
        user_id: user.user_id,
        uuid: uuid4(),
      },
    });
  }

  const cookie = serialize("sessionId", session.uuid, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
  res.setHeader("Set-Cookie", cookie).status(200);
  res.redirect("/");
}
