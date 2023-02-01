import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
