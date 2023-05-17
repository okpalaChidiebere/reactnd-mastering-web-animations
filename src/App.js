import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimateScale from "./components/AnimateScale";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/animateScale" />} />
          <Route path="home" element={<Home />} />
          <Route path="/animateScale" element={<AnimateScale />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
