import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import ProductList from './components/ProductList';
import PresetCategories from './pages/PresetCategories';
import MenComponent from './components/MenComponent';
import Categoriesbyname from './components/Categoriesbyname.js';
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
            <Route path="/tuoteryhmät" element={<PresetCategories />} />
            <Route path="/tuotteet/:category_type" element={<ProductList />} />
            <Route path="vaatteet/:category_type" element={<Categoriesbyname />} />
            <Route path='/ostoskori' element={<ShoppingCart />} />
          </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
