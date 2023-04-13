import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../lib/withSession";
import prisma from "../../../lib/db";
import withHandler, { ResponseType } from "../../lib/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  req.session.destroy();
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
