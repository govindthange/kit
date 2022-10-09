import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Start writing code using
        </p>
        <a
          className="App-link"
          href="https://github.com/govindthange/dapp-studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ethereum DApp Studio
        </a>
      </header>
    </div>
  );
}

export default App;
