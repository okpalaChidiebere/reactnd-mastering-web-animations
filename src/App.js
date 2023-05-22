import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import FourCorners from "./components/FourCorners";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/fourCorners" />} />
          <Route path="home" element={<Home />} />
          <Route path="fourCorners" element={<FourCorners />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
