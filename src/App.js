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
    "https://recipe-mern-app-server.herokuapp.com/details"
  );
  const json = await response.json();
  console.log(json);
};

export default App;
