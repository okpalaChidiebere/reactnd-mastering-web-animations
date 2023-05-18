import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import StaggerAnimations from "./components/StaggerAnimations";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/staggerAnimations" />} />
          <Route path="home" element={<Home />} />
          <Route path="staggerAnimations" element={<StaggerAnimations />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
