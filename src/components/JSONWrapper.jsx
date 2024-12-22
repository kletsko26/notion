import { Page404 } from "@pages/Page404";

export const JSONWrapper = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <img src="images/loading.gif" alt="" width={47} height={47} />
      </div>
    );
  }

  if (error) {
    const { status, message } = error;

    return status === 404 ? (
      <Page404 />
    ) : (
      <div className="flex justify-center items-center">
        <p>Error: {message}</p>
      </div>
    );
  }

  return children;
};
