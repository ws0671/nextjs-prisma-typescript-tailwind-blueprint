import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import { Tweet } from "@prisma/client";
import Link from "next/link";

interface TweetsResponse {
  ok: boolean;
  tweets: Tweet[];
}

export default () => {
  const router = useRouter();
  const { data, error } = useSWR<TweetsResponse>("/api/tweet");
  const onLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    router.replace("/log-in");
  };

  useEffect(() => {
    if (error) {
      router.replace("/log-in");
    }
  }, [router, error]);
  if (!data) {
    return <div />;
  }
  return (
    <div className="relative">
      <h1 className="mt-10">
        <span
          className="cursor-pointer font-bold text-red-500"
          onClick={onLogout}
        >
          LOGOUT
        </span>
      </h1>
      <div className="mt-10 space-y-2">
        {data?.tweets?.map((tweet) => (
          <Link href={`/tweet/${tweet.id}`}>
            <div
              key={tweet.id}
              className="cursor-pointer border-black border rounded p-5"
            >
              <div className="font-bold text-xl">{tweet.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <Link href={"/tweet/upload"}>
        <div className="fixed right-60 bottom-10 rounded-full text-white cursor-pointer flex justify-center items-center bg-orange-400 w-12 h-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};
