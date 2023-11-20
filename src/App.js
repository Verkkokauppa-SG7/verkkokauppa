import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import ProductList from './components/ProductList';
import FrontPage from './pages/FrontPage';
import WomenCategories from './components/WomenCategories';
import MenCategories from './components/MenCategories';

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/vaatteet/naiset" element={<WomenCategories />} />
            <Route path="/vaatteet/miehet" element={<MenCategories />} />
            <Route path="/tuotteet/:categoryName" element={<ProductList />} />
          </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
