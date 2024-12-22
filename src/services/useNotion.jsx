import useHttp from "@hooks/useHttp";

export const useNotion = () => {
  const _apiBase = "http://localhost:3000";

  const { request, loading, error, clearError } = useHttp();

  const addUser = async (user) => {
    const res = await request(
      `${_apiBase}/users`,
      "POST",
      JSON.stringify(user)
    );
    return res;
  };

  const getUsers = async (params = "") => {
    const res = await request(`${_apiBase}/users?${params}`);
    return res;
  };

  const getUserByID = async (id) => {
    const res = await request(`${_apiBase}/users/${id}`);
    return res;
  };

  const addNote = async (note) => {
    const res = await request(
      `${_apiBase}/notes`,
      "POST",
      JSON.stringify(note)
    );
    return res;
  };

  const editNote = async (id, note) => {
    const res = await request(
      `${_apiBase}/notes/${id}`,
      "PATCH",
      JSON.stringify(note)
    );
    return res;
  };

  const getNotes = async (params = "") => {
    const res = await request(`${_apiBase}/notes?${params}`);
    return res;
  };

  const getNoteByID = async (id) => {
    const res = await request(`${_apiBase}/notes/${id}`);
    return res;
  };

  const deleteNote = async (id) => {
    const res = await request(`${_apiBase}/notes/${id}`, "DELETE");
    return res;
  };

  // const getAlbums = async () => {
  //   const res = await request(`${_apiBase}/albums`);
  //   return res;
  // };

  // const getUserAlbumsByUserID = async (id) => {
  //   const res = await request(`${_apiBase}/albums`);
  //   return res.filter((alb) => alb.userId === +id);
  // };

  // const getAlbumDataByID = async (id) => {
  //   const albumData = await request(`${_apiBase}/albums/${id}`);
  //   const { userId } = albumData;
  //   const { name } = await getUserByID(userId);
  //   const photos = await request(`${_apiBase}/albums/${id}/photos`);
  //   return {
  //     ...albumData,
  //     authorName: name,
  //     photos,
  //   };
  // };

  return {
    loading,
    error,
    clearError,
    addUser,
    getUsers,
    addNote,
    editNote,
    getNotes,
    getNoteByID,
    getUserByID,
    deleteNote,
    // getAlbums,
    // getUserAlbumsByUserID,
    // getAlbumDataByID,
  };
};
