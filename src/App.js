import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimateOpacity from "./components/AnimateOpacity";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/animateOpacity" />} />
          <Route path="home" element={<Home />} />
          <Route path="/animateOpacity" element={<AnimateOpacity />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
