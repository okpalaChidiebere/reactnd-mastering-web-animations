import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import EvolvingWriteButton from "./components/EvolvingWriteButton";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/evolvingWriteButton" />} />
          <Route path="home" element={<Home />} />
          <Route
            path="/evolvingWriteButton"
            element={<EvolvingWriteButton />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
