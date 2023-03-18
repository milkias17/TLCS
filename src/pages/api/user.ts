import { UserCreate } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { roleMapper } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: UserCreate = JSON.parse(req.body);
    try {
      const user = await prisma.user.create({
        data: {
          ...body,
          role: roleMapper(body.role),
        },
      });
      res.redirect("/admin");
      res.status(200).json({ detail: "Successfullly created user" });
    } catch (e) {
      console.log(e);
      res.status(403).json({ detail: "Invalid arguments to create user" });
    }
  }
}
