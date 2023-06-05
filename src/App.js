import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ApplicationIntro from "./components/ApplicationIntro";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/applicationIntro" />} />
          <Route path="home" element={<Home />} />
          <Route path="applicationIntro" element={<ApplicationIntro />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
