import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ParallelAnimations from "./components/ParallelAnimations";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/parallelAnimations" />} />
          <Route path="home" element={<Home />} />
          <Route path="parallelAnimations" element={<ParallelAnimations />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
