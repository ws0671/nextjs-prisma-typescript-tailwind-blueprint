import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface SignupForm {
  username: string;
  password: string;
  email: string;
}

export default function CreateAccount() {
  const { register, handleSubmit } = useForm<SignupForm>();
  const router = useRouter();

  const onValid = async (data: SignupForm) => {
    const { username, email, password } = data;
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (res.ok) {
      const { user } = await res.json();
      router.push("/log-in");
    } else {
      alert("Failed to create user");
    }
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: true, minLength: 5 })}
        type="password"
        placeholder="password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
