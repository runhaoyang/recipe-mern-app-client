import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={callApi}>Call API</button>
      </header>
    </div>
  );
};

const callApi = async () => {
  const response = await fetch(
    "https://recipe-mern-app-server.herokuapp.com/details",
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
