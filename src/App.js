import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimateBackgroundColor from "./components/AnimateBackgroundColor";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/animateBackgroundColor" />} />
          <Route path="home" element={<Home />} />
          <Route
            path="/animateBackgroundColor"
            element={<AnimateBackgroundColor />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
