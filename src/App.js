import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import SequenceAnimations from "./components/SequenceAnimations";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/sequenceAnimations" />} />
          <Route path="home" element={<Home />} />
          <Route path="sequenceAnimations" element={<SequenceAnimations />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
