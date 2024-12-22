import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import UserContext from "@components/UserContext";
import { signupSchema } from "@schemas/signupSchema";
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
  {
    id: 3,
    type: "text",
    name: "passwordRepeat",
    placeholder: "Repeat password",
  },
];

export const Signup = () => {
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
    resolver: zodResolver(signupSchema),
  });

  const { setUser } = useContext(UserContext);

  const { addUser, getUsers, loading, error, clearError } = useNotion();

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      const params = new URLSearchParams();
      params.append("email", email);

      const checkCollision = await getUsers(params.toString());
      if (checkCollision.length) {
        toast.error("User with this email already exists");
        return;
      }
      const id = crypto.randomUUID();
      const newUser = {
        id,
        email,
        password,
        createdAt: new Date().getTime(),
      };

      const added = await addUser(newUser);
      setUser(added);
      toast.success("Successfully registered!");
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
          <h1 className="text-4xl font-bold">Sign Up</h1>
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
              py-1 text-xl bg-zinc-200  transition focus:outline-none focus:border-zinc-500 "
                />
                {errors[name] && (
                  <p className="text-red-500 pt-2">{errors[name].message}</p>
                )}
              </li>
            ))}
            <button
              className="mt-8 border-2 border-zinc block px-6
              py-1 text-xl w-56 bg-zinc-200  transition focus:outline-none focus:border-zinc-500 hover:bg-zinc-300">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-inactive-color">
            or{" "}
            <Link
              to="/login"
              className="hover:text-active-color underline transition">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </JSONWrapper>
  );
};
