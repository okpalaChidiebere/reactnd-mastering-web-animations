import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimateRotation from "./components/AnimateRotation";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/animateRotation" />} />
          <Route path="home" element={<Home />} />
          <Route path="animateRotation" element={<AnimateRotation />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
