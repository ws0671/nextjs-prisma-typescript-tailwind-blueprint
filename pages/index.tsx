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

  console.log(data);

  useEffect(() => {
    if (error) {
      router.replace("/log-in");
    }
  }, [router, error]);
  if (!data) {
    return <div />;
  }
  return (
    <div>
      {data?.tweets?.map((tweet) => (
        <div key={tweet.id}>
          <Link href={`/tweet/${tweet.id}`}>
            <div>{tweet.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};
