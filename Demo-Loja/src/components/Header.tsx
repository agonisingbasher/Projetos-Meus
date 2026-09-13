import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCartItems } from '../services/cartService';

interface HeaderProps {
  onCartClick: () => void;
  cartItemsCount: number;
  onLoginClick: () => void;
}

export const Header = ({ onCartClick, cartItemsCount, onLoginClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-orange-600" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-white">TechStore</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white hover:text-orange-100 transition font-medium">
                Ofertas
              </a>
              <a href="#" className="text-white hover:text-orange-100 transition font-medium">
                Consoles
              </a>
              <a href="#" className="text-white hover:text-orange-100 transition font-medium">
                Periféricos
              </a>
              <a href="#" className="text-white hover:text-orange-100 transition font-medium">
                Áudio
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center bg-white rounded-lg px-4 py-2 w-96">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="flex-1 outline-none text-gray-700"
              />
              <Search className="text-gray-400" size={20} />
            </div>

            <button
              className="hidden md:flex items-center space-x-2 bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-lg transition"
              onClick={onLoginClick}
            >
              <User size={20} />
              <span>Entrar</span>
            </button>

            <button
              onClick={onCartClick}
              className="relative bg-orange-700 hover:bg-orange-800 text-white p-2 rounded-lg transition"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <a href="#" className="block text-white hover:text-orange-100 transition py-2">
              Ofertas
            </a>
            <a href="#" className="block text-white hover:text-orange-100 transition py-2">
              Consoles
            </a>
            <a href="#" className="block text-white hover:text-orange-100 transition py-2">
              Periféricos
            </a>
            <a href="#" className="block text-white hover:text-orange-100 transition py-2">
              Áudio
            </a>
            <div className="pt-2">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 rounded-lg outline-none"
              />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
