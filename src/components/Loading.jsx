const Loading = ({ source }) => {
  let message;
  if (source === "recipes") {
    message = <h2>Fetching recipes ... </h2>;
  } else if (source === "collections") {
    message = <h2> Please login to view your collections.</h2>;
  } else if (source === "collectionsEmptyArray") {
    message = (
      <h2>
        There are no recipes in your collections. Add one to see them here.
      </h2>
    );
  }

  return <div className="loadingPage">{message}</div>;
};

export default Loading;
