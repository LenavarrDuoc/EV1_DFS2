import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AppRouter } from './routes/AppRouter';

import './App.css'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRouter/>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
