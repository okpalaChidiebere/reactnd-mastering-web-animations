import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Home />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
