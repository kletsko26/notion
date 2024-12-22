import { Nav } from "@components/Nav";
import { useContext } from "react";
import UserContext from "./UserContext";

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && (
        <div className="mx-auto w-full h-full px-5 pt-6 pb-2.5 max-w-[1420px] flex items-center justify-between flex-row-reverse">
          <Nav />
          <p className="text-medium font-bold">Hello, {user.email}</p>
        </div>
      )}
    </>
  );
};
