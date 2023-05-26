import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ProgressbarButton from "./components/ProgressbarButton";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/progressbarButton" />} />
          <Route path="home" element={<Home />} />
          <Route path="progressbarButton" element={<ProgressbarButton />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
