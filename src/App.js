import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import SwipeGestureControls from "./components/SwipeGestureControls";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/swipeGestureControls" />} />
          <Route path="home" element={<Home />} />
          <Route
            path="swipeGestureControls"
            element={<SwipeGestureControls />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
