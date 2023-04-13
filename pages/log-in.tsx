import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
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
    <div className="mt-20">
      <img
        className="m-auto"
        src="https://upload.wikimedia.org/wikipedia/ko/thumb/9/9e/%ED%8A%B8%EC%9C%84%ED%84%B0_%EB%A1%9C%EA%B3%A0_%282012%29.svg/258px-%ED%8A%B8%EC%9C%84%ED%84%B0_%EB%A1%9C%EA%B3%A0_%282012%29.svg.png?20151031083522"
        alt=""
      />
      <form className="mt-20 flex flex-col" onSubmit={handleSubmit(onValid)}>
        <input
          className="py-4 focus:outline-none"
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
        />
        <input
          className="py-4 focus:outline-none"
          {...register("password", { required: true })}
          type="password"
          placeholder="password"
        />
        <input
          className="bg-orange-400 py-4 rounded-xl text-white text-lg cursor-pointer"
          type="submit"
          value="Login"
        />
      </form>
      <div className="mt-3 relative">
        <div className="absolute right-0">
          <Link href="/create-account">
            <span className="text-blue-500 cursor-pointer font-bold">
              SignUp
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
