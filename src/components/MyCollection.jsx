const MyCollection = ({ userInfo, userToken, isLoggedIn }) => {
  let username;
  let password;
  let id;
  if (isLoggedIn) {
    const userObject = JSON.parse(localStorage.getItem("userInfo"));
    username = userObject.username;
    password = userObject.password;
    id = userObject._id;
  }

  return (
    <>
      <div>
        <div>
          {isLoggedIn ? (
            <>
              <h2>User token: {userToken}</h2>
              <p>ID: {userInfo._id}</p>
              <p>Username: {userInfo.username}</p>
              <p>Password: {userInfo.password}</p>
              <h4>User's info from local storage:</h4>
              <h3>User's token{localStorage.getItem("userToken")}</h3>
              <h3>Username: {username}</h3>
              <h3>Password: {password}</h3>
              <h3>ID: {id}</h3>{" "}
            </>
          ) : (
            <h3> No user logged in. </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCollection;
