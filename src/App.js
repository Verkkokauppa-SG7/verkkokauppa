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
import Admin from './pages/Admin.js';
import CategoryForm from './components/CategoryForm.js';
import AdminLogin from './components/AdminLogin.js'
import ContactForm from './components/ContactForm.js';
import FeedbackList from './components/FeedbackList.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';


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
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/yllapito" element={<Admin />} />
            <Route path="/yllapito/tuoteryhmat" element={<CategoryForm />} />
            <Route path="/ota-yhteytta" element={<ContactForm />} />
            <Route path="/yllapito/palautteet" element={<FeedbackList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
