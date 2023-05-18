import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Easing from "./components/Easing";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/easing" />} />
          <Route path="home" element={<Home />} />
          <Route path="/easing" element={<Easing />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
