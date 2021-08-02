import Home from './pages/Home';

import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/:category/:id" component={ProductDetail} />
          <Route path="/cart" exact component={Cart} />
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
