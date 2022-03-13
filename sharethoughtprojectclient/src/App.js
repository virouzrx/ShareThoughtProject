import logo from './logo.svg';
import CustomNavbar from './Components/CustomNavbar/CustomNavbar';
import PostsCarousel from './Components/PostsCarousel/PostsCarousel';
import Container from 'react-bootstrap/Container'
import './App.css';

function App() {
  return (
    <div>
      <CustomNavbar></CustomNavbar>
      <Container>
        <h2 class='carousel-header'>Popular today</h2>
        <hr class="mb-5" />
      </Container>
      <PostsCarousel></PostsCarousel>
      <Container>
        <h2 class='carousel-header'>Top posts this week</h2>
        <hr class="mb-5" />
      </Container>
      <PostsCarousel></PostsCarousel>
    </div>
  );
}

export default App;
