import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface UploadTweetForm {
  title: string;
  description: string;
}

export default function TweetUpload() {
  const { register, handleSubmit } = useForm<UploadTweetForm>();
  const router = useRouter();

  const onValid = async (data: UploadTweetForm) => {
    const { title, description } = data;
    const res = await fetch("/api/tweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) {
      const { tweet } = await res.json();
      router.push(`/tweet/${tweet.id}`);
    } else {
      alert("Failed to upload tweet");
    }
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("title", { required: true })}
        type="text"
        placeholder="Title"
      />
      <input
        {...register("description", { required: true })}
        type="text"
        placeholder="Description"
      />
      <input type="submit" value="Upload Tweet" />
    </form>
  );
}
