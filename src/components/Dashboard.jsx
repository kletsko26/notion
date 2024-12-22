import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";

import "react-toastify/dist/ReactToastify.css";

export const Dashboard = () => {
  return (
    <div className="grid min-h-screen w-full grid-rows-[70px,1fr,70px]">
      <header className="row-start-1">
        <Header />
      </header>
      <main className="row-start-2 overflow-y-auto min-h-[100px] py-2.5">
        <div className="mx-auto w-full max-w-[1100px] h-full px-5">
          <Outlet />
        </div>
      </main>
      <footer className="row-start-3">
        <Footer />
      </footer>
      <ToastContainer position="bottom-right" autoClose={3000} draggable />
    </div>
  );
};
