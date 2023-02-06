import './App.css';
import Movies from './component/movies';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/common/Navbar';
import AboutUs from './component/AboutUs';
import AddMovie from './component/AddMovie';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/customers" element={<Movies />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/add-movie" element={<AddMovie />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
