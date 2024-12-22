import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("userID");

    if (!id) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => {
        if (res.ok) return res.json();

        if (res.status === 404) {
          console.error("User by cashed id not found, remove cashed id");
          localStorage.removeItem("userID");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userID", user.id);
    }
  }, [user?.id]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
