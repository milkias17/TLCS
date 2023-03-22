import { UserCreate } from "../../lib/types";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { departmentMapper, roleMapper } from "../../lib/utils";
import { hashPassword } from "../../lib/passwordHandlers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: UserCreate = JSON.parse(req.body);
    try {
      const user = await prisma.user.create({
        // @ts-ignore
        data: {
          ...body,
          role: roleMapper(body.role),
          ...(body.department && {
            department: departmentMapper(body.department),
          }),
          password: await hashPassword(body.password),
        },
      });
      res.status(200).redirect("/admin");
    } catch (e) {
      console.error(e);
      res.status(403).json({ detail: "Invalid arguments to create user" });
    }
  }
}
