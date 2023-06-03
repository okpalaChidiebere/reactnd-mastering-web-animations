import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import FABWithMenu from "./components/FABWithMenu";
import styles from "./css/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          {/* <Route element={Layout}> */}
          <Route path="/" element={<Navigate to="/fABWithMenu" />} />
          <Route path="home" element={<Home />} />
          <Route path="fABWithMenu" element={<FABWithMenu />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
