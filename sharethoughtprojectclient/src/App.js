import CustomNavbar from './Components/CustomNavbar/CustomNavbar';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Creators from './Components/Creators/Creators';
import Posts from './Components/Posts/Posts';
import SinglePostPage from './Components/SinglePostPage/SinglePost';
import UserProfile from './Components/UserProfile/UserProfile';
import Moderation from './Components/Moderation/Moderation';


function App() {
  return (
    <div>
      <CustomNavbar></CustomNavbar>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="creators/*" element={<Creators />}></Route>
          <Route path="posts/*" element={<Posts />}></Route>
          <Route path="post/:id" element={<SinglePostPage />}></Route>
          <Route path="user/:id/*" element={<UserProfile />}></Route>
          <Route path="moderation/*" element={<Moderation />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
