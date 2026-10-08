import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import NoticeToast from './components/NoticeToast';
import BackToTop from './components/BackToTop';
import Menu from './pages/Menu';
import CheesecakePage from './pages/CheesecakePage';
import SavedCheesecakes from './pages/SavedCheesecakes';
import Basket from './pages/Basket';
import OrderCheckout from './pages/OrderCheckout';
import ThankYou from './pages/ThankYou';
import OrderHistory from './pages/OrderHistory';
import MissingPage from './pages/MissingPage';
import { defaultShopFilters, initialProducts } from './catalog/cheesecakeCatalog';
import { getBasketCount, getBasketTotal } from './helpers/basketTools';

function ChijeuKeikeu() {
  const navigate = useNavigate();
  const [cheesecakeMenu, setCheesecakeMenu] = useState(initialProducts);
  const [basket, setBasket] = useState([]);
  const [savedFlavors, setSavedFlavors] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [menuFilters, setMenuFilters] = useState(defaultShopFilters);
  const [basketPulse, setBasketPulse] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast === null) return undefined;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message) => setToast({ id: Date.now(), message });


  const launchFloatingItem = (product, sourceElement) => {
    const basketIcon = document.getElementById('nav-cart');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sourceElement === null || basketIcon === null || reducedMotion) {
      setBasketPulse((current) => current + 1);
      return;
    }
  };

  const handleAddToBasket = (product, quantity = 1, sourceElement = null) => {
    const existing = basket.find((item) => item.id === product.id);
    const currentQuantity = existing?.quantity ?? 0;
    if (product.stock === 0) {
      showToast(product.name + ' is sold out.');
      return false;
    }
    if (currentQuantity + quantity > product.stock) {
      showToast('Only ' + product.stock + ' available for ' + product.name + '.');
      return false;
    }
    if (!existing) setBasket([...basket, { ...product, quantity }]);
    else setBasket(basket.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    launchFloatingItem(product, sourceElement);
    return true;
  };

  const handleToggleSaved = (productId) => {
    const product = cheesecakeMenu.find((item) => item.id === productId);
    if (savedFlavors.includes(productId)) {
      setSavedFlavors(savedFlavors.filter((id) => id !== productId));
      if (product) showToast(product.name + ' removed from your saved treats.');
    } else {
      setSavedFlavors([...savedFlavors, productId]);
      if (product) showToast(product.name + ' saved to your favorites.');
    }
  };

  const handleBuyNow = (product, quantity = 1) => {
    if (product.stock === 0) return showToast(product.name + ' is sold out.');
    const existing = basket.find((item) => item.id === product.id);
    const wantedQuantity = Math.min(product.stock, Math.max(quantity, existing?.quantity ?? 0));
    if (!existing) setBasket([...basket, { ...product, quantity: wantedQuantity }]);
    else setBasket(basket.map((item) => item.id === product.id ? { ...item, quantity: wantedQuantity } : item));
    navigate('/checkout');
  };

  const handleIncrease = (productId) => setBasket(basket.map((item) => item.id === productId && item.quantity < item.stock ? { ...item, quantity: item.quantity + 1 } : item));
  const handleDecrease = (productId) => setBasket(basket.map((item) => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  const handleRemove = (productId) => {
    const removed = basket.find((item) => item.id === productId);
    setBasket(basket.filter((item) => item.id !== productId));
    if (removed) showToast(removed.name + ' removed from your basket.');
  };
  const handleClearBasket = () => { setBasket([]); showToast('Your basket is ready for more sweet treats.'); };

  const handlePlaceOrder = (customer, paymentMethod) => {
    const newOrder = {
      id: 'CK-' + (1001 + orderHistory.length), customer, items: basket,
      total: getBasketTotal(basket), paymentMethod, status: 'Processing', placedAt: new Date().toISOString(),
    };
    setOrderHistory([newOrder, ...orderHistory]);
    setCheesecakeMenu(cheesecakeMenu.map((product) => {
      const purchased = basket.find((item) => item.id === product.id);
      return purchased ? { ...product, stock: product.stock - purchased.quantity } : product;
    }));
    setBasket([]);
    return newOrder.id;
  };

  return (
    <div className="min-h-screen bg-[#fff8fc] font-sans text-slate-800 selection:bg-pink-200 selection:text-slate-900">
      <BackToTop />
      <SiteHeader basketCount={getBasketCount(basket)} favoritesCount={savedFlavors.length} basketPulse={basketPulse} />
      <main>
        <Routes>
          <Route path="/" element={<Menu products={cheesecakeMenu} favorites={savedFlavors} filters={menuFilters} setFilters={setMenuFilters} onToggleFavorite={handleToggleSaved} onAddToBasket={handleAddToBasket} onBuyNow={handleBuyNow} />} />
          <Route path="/product/:id" element={<CheesecakePage products={cheesecakeMenu} cart={basket} favorites={savedFlavors} onToggleFavorite={handleToggleSaved} onAddToBasket={handleAddToBasket} onBuyNow={handleBuyNow} />} />
          <Route path="/favorites" element={<SavedCheesecakes products={cheesecakeMenu} favorites={savedFlavors} onToggleFavorite={handleToggleSaved} onAddToBasket={handleAddToBasket} />} />
          <Route path="/cart" element={<Basket cart={basket} onIncrease={handleIncrease} onDecrease={handleDecrease} onRemove={handleRemove} onClear={handleClearBasket} />} />
          <Route path="/checkout" element={<OrderCheckout cart={basket} onPlaceOrder={handlePlaceOrder} />} />
          <Route path="/order-success/:orderId" element={<ThankYou orders={orderHistory} />} />
          <Route path="/orders" element={<OrderHistory orders={orderHistory} />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <NoticeToast notice={toast} />
    </div>
  );
}

export default ChijeuKeikeu;
