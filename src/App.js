import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import KittenCards from "./components/KittenCards";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/kittenCards" />} />
          <Route path="home" element={<Home />} />
          <Route path="kittenCards" element={<KittenCards />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
