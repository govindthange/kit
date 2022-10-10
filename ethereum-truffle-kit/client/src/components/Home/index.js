import "./index.css";
import logo from "./logo.svg";
import Header from "../Header"

const Home = () => {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Start writing code...
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

export default Home;