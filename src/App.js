import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimateAbsolutePosition from "./components/AnimateAbsolutePosition";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route
            path="/"
            element={<Navigate to="/animateAbsolutePosition" />}
          />
          <Route path="home" element={<Home />} />
          <Route
            path="animateAbsolutePosition"
            element={<AnimateAbsolutePosition />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
