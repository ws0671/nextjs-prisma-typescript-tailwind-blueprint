import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

export default () => {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.id ? `/api/tweet/${router.query.id}` : null
  );
  console.log(data);

  return (
    <div>
      <h1>Title {data?.tweet.title}!</h1>
      <h3>Description {data?.tweet.description}</h3>
    </div>
  );
};
