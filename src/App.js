import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import ProductList from './components/ProductList';
import PresetCategories from './pages/PresetCategories';
import MenComponent from './components/MenComponent';
import WomenComponent from './components/WomenComponent';
import UnisexComponent from './components/UnisexComponent';
import FrontPage from './pages/FrontPage';
import ShoppingCart from './components/ShoppingCart.js';

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
          <Routes>
            <Route path="/" element={<FrontPage />} />
<<<<<<< HEAD
            <Route path="/vaatteet" element={<PresetCategories />} />
=======
            <Route path="/tuoteryhmät" element={<PresetCategories />} />
>>>>>>> cec5ce1685707f448ae33b10c0cdfdc9c460205b
            <Route path="/tuotteet/:categoryName" element={<ProductList />} />
            <Route path="vaatteet/miehet" element={<MenComponent />} />
            <Route path="/vaatteet/naiset" element={<WomenComponent />} />
            <Route path="/unisex" element={<UnisexComponent />} />
            <Route path='/ostoskori' element={<ShoppingCart />} />
          </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
