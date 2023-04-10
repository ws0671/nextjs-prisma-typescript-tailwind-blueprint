import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

export default () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/me");
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
      <h1>Welcome {data?.name}!</h1>
      <h3>Your email is: {data?.email}</h3>
    </div>
  );
};
