import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useNotion } from "@services/useNotion";
import { toast } from "react-toastify";
import { JSONWrapper } from "@components/JSONWrapper";

export const Note = () => {
  const [data, setData] = useState(null);
  const { getNoteByID, deleteNote, loading, error } = useNotion();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNoteByID(id).then(setData);
  }, [id]);

  const handleDeleteNote = (id) => {
    deleteNote(id)
      .then(({ title }) => {
        toast.success(`Note ${title} deleted`);
        navigate("/notes");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const { title, body } = data || { title: "", body: "" };

  return (
    <JSONWrapper loading={loading} error={error}>
      <div className="mt-8 h-full flex  wrapper flex-col items-center ">
        <div className="relative w-full">
          <h1 className="text-4xl font-bold text-center">{title}</h1>
          <Link
            to="/notes"
            className="text-center  border-2 border-zinc block
              text-xl w-16 bg-zinc-200 focus:outline-none focus:border-zinc-500 hover:bg-zinc-300 absolute left-0  top-1/2 -translate-y-1/2">
            Back
          </Link>
          <div
            className="text-center  
              text-xl w-16  focus:outline-none  absolute right-0  top-1/2 -translate-y-1/2 flex flex-row gap-2 ">
            <Link to="edit">✍🏻</Link>
            <button className="px-2" onClick={() => handleDeleteNote(id)}>
              🗑️
            </button>
          </div>
        </div>
        <p className="bg-zinc-200 mt-8 p-2 w-full focus:outline-none min-h-[200px] text-xl">
          {body}
        </p>
      </div>
    </JSONWrapper>
  );
};
