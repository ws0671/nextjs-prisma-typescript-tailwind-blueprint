import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import { Tweet, User } from "@prisma/client";
import useMutation from "../../lib/useMutation";
import { cls } from "../../lib/utils";

interface TweetWithUser extends Tweet {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  tweet: TweetWithUser;
  isLiked: boolean;
}

export default () => {
  const router = useRouter();
  const { data, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/tweet/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/tweet/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
    toggleFav({});
  };

  return (
    <div>
      <h1>Title {data?.tweet?.title}!</h1>
      <h3>Description {data?.tweet?.description}</h3>
      <button
        onClick={onFavClick}
        className={cls(
          "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center ",
          data?.isLiked
            ? "text-red-500  hover:text-red-600"
            : "text-gray-400  hover:text-gray-500"
        )}
      >
        {data?.isLiked ? (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            className="h-6 w-6 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
