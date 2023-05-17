import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimateWidthHeight from "./components/AnimateWidthHeight";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/animateWidthHeight" />} />
          <Route path="home" element={<Home />} />
          <Route path="/animateWidthHeight" element={<AnimateWidthHeight />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
