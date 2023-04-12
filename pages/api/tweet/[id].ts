import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/withSession";
import prisma from "../../../lib/db";
import withHandler, { ResponseType } from "../../../lib/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  res.json({ ok: true, tweet });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
