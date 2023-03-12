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
  const body: LoginBody = req.body;
  console.log(body);
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
      error: "Trying to access invalid role",
    });
  }

  // if (await checkPassword(body.password, user.password)) {
  //   prisma.session.create({
  //     data: {
  //       user_id: user.user_id,
  //       // uid: uuid4(),
  //     },
  //   });
  // } else {
  //   res.status(401).json({
  //     error: "Invalid Password",
  //   });
  // }
}
