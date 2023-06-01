import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimatedColorPicker from "./components/AnimatedColorPicker";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/animatedColorPicker" />} />
          <Route path="home" element={<Home />} />
          <Route path="animatedColorPicker" element={<AnimatedColorPicker />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
