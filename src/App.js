import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AnimatedQuestionnaire from "./components/AnimatedQuestionnaire";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/animatedQuestionnaire" />} />
          <Route path="home" element={<Home />} />
          <Route
            path="animatedQuestionnaire"
            element={<AnimatedQuestionnaire />}
          />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
