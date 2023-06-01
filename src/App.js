import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import PhotoGridSharedElement from "./components/PhotoGridSharedElement";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/photoGridSharedElement" />} />
          <Route path="home" element={<Home />} />
          <Route
            path="photoGridSharedElement"
            element={<PhotoGridSharedElement />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
