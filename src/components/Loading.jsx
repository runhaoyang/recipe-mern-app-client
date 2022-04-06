import SearchContainer from "./SearchContainer";

const Loading = ({ source }) => {
  let message;
  if (source === "recipes") {
    message = (
      <div className="loadingPage">
        <h2>Fetching recipes ... </h2>
      </div>
    );
  } else if (source === "collections") {
    message = (
      <div className="loadingPage">
        <h2> Please login to view your collections.</h2>
      </div>
    );
  } else if (source === "collectionsEmptyArray") {
    message = (
      <div className="loadingPage">
        <h2>No results found.</h2>
      </div>
    );
  }

  return <div>{message}</div>;
};

export default Loading;
