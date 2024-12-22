import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "@components/UserContext";
import { useNotion } from "@services/useNotion";
import { toast } from "react-toastify";
import { addNoteSchema } from "@schemas/addNoteSchema";

export const AddNote = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    resolver: zodResolver(addNoteSchema),
  });
  const { addNote, clearError } = useNotion();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const newNote = {
        ...data,
        authorId: user.id,
        id: crypto.randomUUID(),
        createdAt: new Date().getTime(),
      };
      await addNote(newNote);

      toast.success("Note added");
      reset();
      clearError();
      navigate(`/notes/${newNote.id}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="mt-8 h-full flex  wrapper flex-col items-center ">
      <div className="relative w-full">
        <h1 className="text-4xl font-bold text-center">Create new note</h1>
        <Link
          to="/notes"
          className="text-center  border-2 border-zinc block
              text-xl w-16 bg-zinc-200 focus:outline-none focus:border-zinc-500 hover:bg-zinc-300 absolute left-0  top-1/2 -translate-y-1/2">
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  justify-center w-full max-w-[640px] active:">
        <input
          {...register("title")}
          type="text"
          placeholder="Name"
          spellCheck="false"
          className="bg-zinc-200 text-xl mt-4 p-2 w-full focus:outline-none"
        />
        {errors.title && (
          <p className="text-red-500 pt-2">{errors.title.message}</p>
        )}
        <textarea
          {...register("body")}
          placeholder="Note text..."
          spellCheck="false"
          className="bg-zinc-200 text-xl mt-4 p-2 w-full focus:outline-none min-h-[200px]"
        />
        {errors.body && (
          <p className="text-red-500 pt-2">{errors.body.message}</p>
        )}
        <button
          className="m-auto text-center font-bold mt-12 border-2 border-zinc block px-6
              py-3 text-xl w-72 bg-zinc-200  transition focus:outline-none focus:border-zinc-500 hover:bg-zinc-300">
          Create
        </button>
      </form>
    </div>
  );
};
