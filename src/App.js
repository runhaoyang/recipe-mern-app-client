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

const callApi = () => {
  fetch("https://recipe-mern-app-server.herokuapp.com/", {
    headers: {
      accept: "Accept: application/json",
    },
  })
    .then((data) => data.json())
    .then((json) => console.log(json));
};

export default App;
