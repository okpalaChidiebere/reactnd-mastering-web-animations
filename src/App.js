import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimatePercentageWidthHeight from "./components/AnimatePercentageWidthHeight";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route
            path="/"
            element={<Navigate to="/animatePercentageWidthHeight" />}
          />
          <Route path="home" element={<Home />} />
          <Route
            path="animatePercentageWidthHeight"
            element={<AnimatePercentageWidthHeight />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
