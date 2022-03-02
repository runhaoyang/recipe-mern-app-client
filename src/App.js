import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={callApi}>Call API</button>
      </header>
    </div>
  );
}

function callApi() {
  fetch("http://localhost:5000/details", { method: "GET" })
    .then((data) => data.json())
    .then((json) => console.log(json));
}

export default App;
