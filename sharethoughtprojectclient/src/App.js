import logo from './logo.svg';
import CustomNavbar from './Components/CustomNavbar/CustomNavbar';
import PostsCarousel from './Components/PostsCarousel/PostsCarousel';
import Container from 'react-bootstrap/Container'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Creators from './Components/Creators/Creators';
import NewCreatorsWrapper from './Components/Creators/NewCreatorsWrapper';
import PopularCreatorsWrapper from './Components/Creators/PopularCreatorsWrapper';
import TopCreatorsWrapper from './Components/Creators/TopCreatorsWrapper';


function App() {
  return (
    <div>
      <CustomNavbar></CustomNavbar>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="creators/*" element={<Creators />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
