import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import UserContext from "@components/UserContext";
import { loginSchema } from "@schemas/loginSchema";
import { JSONWrapper } from "@components/JSONWrapper";
import { useNotion } from "@services/useNotion";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const INPUTS = [
  {
    id: 1,
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    id: 2,
    type: "text",
    name: "password",
    placeholder: "Password",
  },
];

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { setUser } = useContext(UserContext);

  const { getUsers, loading, error, clearError } = useNotion();

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      const params = new URLSearchParams();
      params.append("email", email);

      const data = await getUsers(params.toString());

      if (!data.length) {
        toast.error("There is no user with this email");
        return;
      }

      const gettedUser = data[0];

      if (gettedUser.password !== password) {
        toast.error("Wrong password");
        return;
      }

      setUser(gettedUser);
      toast.success("Login succesfully!");
      reset();
      clearError();

      navigate("/about");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <JSONWrapper loading={loading} error={error}>
      <div className="h-full flex justify-center items-center wrapper">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Log In</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center flex-col">
            {INPUTS.map(({ id, type, name, placeholder }) => (
              <li
                key={id}
                className="list-none flex justify-center items-center flex-col">
                <input
                  {...register(name)}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  className="mt-5 border-2 border-zinc block px-6
              py-1 text-xl bg-zinc-200  transition focus:outline-none focus:border-zinc-500"
                />
                {errors[name] && (
                  <p className="text-red-500 pt-2">{errors[name].message}</p>
                )}
              </li>
            ))}

            <button
              className="mt-8 border-2 border-zinc block px-6
              py-1 text-xl w-56 bg-zinc-200  transition focus:outline-none focus:border-zinc-500 hover:bg-zinc-300">
              Log In
            </button>
          </form>
          <p className="mt-4">
            or{" "}
            <Link
              to="/signup"
              className="hover:text-active-color underline transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </JSONWrapper>
  );
};
