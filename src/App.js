import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import styles from "./css/App.module.css";
import AnimateTranslatePosition from "./components/AnimateTranslatePosition";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route
            path="/"
            element={<Navigate to="/animateTranslatePosition" />}
          />
          <Route path="home" element={<Home />} />
          <Route
            path="animateTranslatePosition"
            element={<AnimateTranslatePosition />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
