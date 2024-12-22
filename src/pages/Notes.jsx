import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "@components/UserContext";
import { useNotion } from "@services/useNotion";
import { toast } from "react-toastify";

export const Notes = () => {
  const [data, setData] = useState(null);
  const { getNotes, deleteNote } = useNotion();
  const { user } = useContext(UserContext);

  const getData = () => {
    const params = new URLSearchParams();
    params.append("authorId", user.id);

    getNotes(params.toString()).then(setData);
  };

  useEffect(() => {
    getData();
  }, []);

  const sortedData = data?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleDeleteNote = (id) => {
    deleteNote(id)
      .then(({ title }) => {
        toast.success(`Note ${title} deleted`);
        getData();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="mt-8 h-full flex  wrapper flex-col items-center">
      <h1 className="text-4xl font-bold">Notes</h1>

      <Link
        to="/addnote"
        className="text-center font-bold mt-12 border-2 border-zinc block px-6
              py-3 text-xl w-72 bg-zinc-200  transition focus:outline-none focus:border-zinc-500 hover:bg-zinc-300">
        Add new note
      </Link>
      <ul className="mt-6 w-full">
        {data &&
          sortedData.map(({ id, title, createdAt }) => {
            return (
              <NoteItem
                key={id}
                id={id}
                title={title}
                createdAt={createdAt}
                handleDeleteNote={handleDeleteNote}
              />
            );
          })}
      </ul>
    </div>
  );
};

const NoteItem = ({ id, title, createdAt, handleDeleteNote }) => {
  const date = new Date(createdAt);
  return (
    <li className="text-xl flex justify-between gap-2 p-4 bg-zinc-200 w-full my-4">
      <div className="flex gap-2">
        <Link to={`/notes/${id}`} className="font-bold hover:underline ">
          {title}
        </Link>
        <time dateTime={date}>{date.toLocaleDateString()}</time>
      </div>
      <div>
        <Link to={`/notes/${id}/edit`} className="px-2">
          ✍🏻
        </Link>
        <button className="px-2" onClick={() => handleDeleteNote(id)}>
          🗑️
        </button>
      </div>
    </li>
  );
};
