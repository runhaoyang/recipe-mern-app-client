const App = () => {
  return (
    <div className="App">
      <input type="text" />
      <button onClick={callApi}>Call API</button>
    </div>
  );
};

const callApi = async () => {
  const response = await fetch(
    "https://recipe-mern-app-server.herokuapp.com/users",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const res = await response.json();
  console.log(res);
};

export default App;
