import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./components/Home";
import Categories from './components/Category';
import Rank from './components/Rank';
import LeaderBoard from './components/LeaderBoard';
import Upload from './components/Upload';

import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/home'  element={<Home />} />
        <Route path='/categories'  element={<Categories />} />
        <Route path='/rank'  element={<Rank />} />
        <Route path='/leaderboard'  element={<LeaderBoard />} />
        <Route path='/upload'  element={<Upload />} />
        <Route path='/*'  element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
