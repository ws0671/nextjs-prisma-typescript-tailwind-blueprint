import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, email, password } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  res.status(200).json({ user });
}
