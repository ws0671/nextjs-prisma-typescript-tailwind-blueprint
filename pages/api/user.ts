import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/db";
import { withApiSession } from "../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  req.session.user = { id: user.id, email: user.email };
  await req.session.save();

  res.status(200).json({ user });
}

export default withApiSession(handler);
