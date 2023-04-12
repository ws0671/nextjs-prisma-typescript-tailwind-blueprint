import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/withSession";
import prisma from "../../../lib/db";
import withHandler, { ResponseType } from "../../../lib/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { title, description },
    session: { user },
  } = req;

  if (req.method === "GET") {
    const tweets = await prisma.tweet.findMany({});
    res.json({
      ok: true,
      tweets,
    });
  }

  if (req.method === "POST") {
    const tweet = await prisma.tweet.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({ ok: true, tweet });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
