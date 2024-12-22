import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "@components/UserContext";

export const About = () => {
  const { user } = useContext(UserContext);

  const date = new Date(user.createdAt);

  return (
    <div className="mt-8 h-full flex  wrapper flex-col items-center">
      <h1 className="text-4xl font-bold">About me</h1>
      <div className="my-8" />
      <p className="text-xl">
        <b>Email:</b> {user.email}
      </p>
      <p className="text-xl">
        <b>Date sign up:</b> {date.toUTCString()}
      </p>
      <Link
        to="/notes"
        className="text-center mt-16 border-2 border-zinc block px-6
              py-3 text-xl w-72 bg-zinc-200  transition focus:outline-none focus:border-zinc-500 hover:bg-zinc-300">
        Go to notes
      </Link>
    </div>
  );
};
