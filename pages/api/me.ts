import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../lib/withSession";
import prisma from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;
  if (!user?.id) {
    return res.status(401).end();
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    return res.status(404).end();
  }
  return res.send({ ...dbUser });
}

export default withApiSession(handler);
