import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import ProductList from './components/ProductList';
import PresetCategories from './pages/PresetCategories';
import Categoriesbyname from './components/Categoriesbyname.js';
import FrontPage from './pages/FrontPage';
import ShoppingCart from './components/ShoppingCart.js';
import SearchBar from './components/SearchBar.js';
import ProductDetails from './components/ProductDetails';


function App() {

  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/tuoteryhmät" element={<PresetCategories />} />
            <Route path="/tuotteet/:category_type/:category" element={<ProductList />} />
            <Route path="vaatteet/:category_type" element={<Categoriesbyname />} />
            <Route path='/ostoskori' element={<ShoppingCart />} />
            <Route path="/haku" element={<SearchBar />} />
            <Route path="/hakutulokset/:query" element={<ProductList />} />
            <Route path="/tuote/:productId" element={<ProductDetails />} />
          </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
