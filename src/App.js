import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import CombineAnimationsWithDelay from "./components/CombineAnimationsWithDelay";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route
            path="/"
            element={<Navigate to="/combineAnimationsWithDelay" />}
          />
          <Route path="home" element={<Home />} />
          <Route
            path="combineAnimationsWithDelay"
            element={<CombineAnimationsWithDelay />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
