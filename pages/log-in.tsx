import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
interface LoginForm {
  email: string;
  password: string;
}
export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onValid = async (data: LoginForm) => {
    const { email, password } = data;
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const { user } = await res.json();
      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="password"
      />
      <input type="submit" value="Login" />
    </form>
  );
}
