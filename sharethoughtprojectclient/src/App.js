import CustomNavbar from './Components/CustomNavbar/CustomNavbar';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Creators from './Components/Creators/Creators';
import Posts from './Components/Posts/Posts';
import SinglePostPage from './Components/SinglePostPage/SinglePost';
import UserProfile from './Components/UserProfile/UserProfile';
import Moderation from './Components/Moderation/Moderation';
import Search from './Components/Search/Search';
import Auth from './Components/AuthComponents/Auth';
import Confirm from './Components/AuthComponents/AuthSubComponents/Confirm';
import Activate from './Components/AuthComponents/AuthSubComponents/Activate';
import CreatePost from './Components/CreatePost/CreatePost';
import Logout from './Components/Logout/Logout';
import UserSettings from './Components/UserProfile/UserSettings';
import NotFound from './Components/NotFound/NotFound';
import PromotionRequest from './Components/PromotionRequest/PromotionRequest';


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
          <Route path="user/:id/settings*" element={<UserSettings />}></Route>
          <Route path="moderation/*" element={<Moderation />}></Route>
          <Route path="createpost/*" element={<CreatePost />}></Route>
          <Route path="logout/*" element={<Logout/>}></Route>
          <Route path="auth/*" element={<Auth />}></Route>
          <Route path="confirm" element={<Confirm />}></Route>
          <Route path="become-a-creator" element={<PromotionRequest />}></Route>
          <Route path="activate/:userid/:token" element={<Activate />}></Route>
          <Route path="search/:searchedphrase/*" element={<Search/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
