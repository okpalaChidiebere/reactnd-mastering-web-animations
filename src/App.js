import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import StaggeredHeads from "./components/StaggeredHeads";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/staggeredHeads" />} />
          <Route path="home" element={<Home />} />
          <Route path="staggeredHeads" element={<StaggeredHeads />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
