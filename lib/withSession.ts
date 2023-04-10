import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      email: string;
    };
  }
}

const cookieOptions = {
  cookieName: "twittersession",
  password: "ThisShouldBeAVeryLongText12345!!!",
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
