import { Link, useLocation } from "react-router-dom";

import NAVLINKS from "@constants/navlinks";

export const Nav = () => {
  const location = useLocation();

  return (
    <nav className="relative h-full flex">
      <ul className="absolute right-0 flex gap-7 items-center h-full ">
        {NAVLINKS.map(({ path, name }, i) => {
          const isActive = location.pathname.includes(path);
          const linkClass = `font-bold text-medium transition duration-100 ease-in-out ${
            isActive ? "text-active-color" : "text-inactive-color"
          }`;

          return (
            <li key={i}>
              <Link to={path} className={linkClass}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
