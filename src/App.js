import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
/*import Vaatteet from './pages/Vaatteet';*/
import './App.css';
import Categories from './components/Categories';

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vaatteet" element={<Categories />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
