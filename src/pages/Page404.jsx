import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div className="h-full flex justify-center items-center wrapper">
      <div className="text-center">
        <h1 className="text-3xl ">404</h1>
        <h2 className="text-4xl font-bold">Page not found</h2>
        <p className="text-xl leading-10">
          Go{" "}
          <Link to="/about" className="hover:text-active-color underline transition">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};
