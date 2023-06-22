import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import HorizontalParallaxScroll from "./components/HorizontalParallaxScroll";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route
            path="/"
            element={<Navigate to="/horizontalParallaxScroll" />}
          />
          <Route path="home" element={<Home />} />
          <Route
            path="horizontalParallaxScroll"
            element={<HorizontalParallaxScroll />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
