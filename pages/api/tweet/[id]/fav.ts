import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../lib/withSession";
import prisma from "../../../../lib/db";
import withHandler, { ResponseType } from "../../../../lib/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await prisma.fav.findFirst({
    where: {
      tweetId: Number(id),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await prisma.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await prisma.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
