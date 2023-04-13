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
    <div className="mt-20">
      <form className="flex flex-col" onSubmit={handleSubmit(onValid)}>
        <input
          className="py-4 focus:outline-none"
          {...register("title", { required: true })}
          type="text"
          placeholder="Title"
        />
        <input
          className="py-4 focus:outline-none"
          {...register("description", { required: true })}
          type="text"
          placeholder="Description"
        />
        <input
          className="bg-blue-400 py-4 rounded-xl text-white text-lg cursor-pointer"
          type="submit"
          value="Upload Tweet"
        />
      </form>
    </div>
  );
}
