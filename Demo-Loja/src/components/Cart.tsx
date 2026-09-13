import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../lib/supabase';
import { updateCartItemQuantity, removeFromCart } from '../services/cartService';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdate: () => void;
}

export const Cart = ({ isOpen, onClose, cartItems, onUpdate }: CartProps) => {
  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    await updateCartItemQuantity(itemId, newQuantity);
    onUpdate();
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart(itemId);
    onUpdate();
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.products?.price || 0) * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Carrinho</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex space-x-4">
                  <img
                    src={item.products?.image_url}
                    alt={item.products?.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      {item.products?.name}
                    </h3>
                    <p className="text-orange-600 font-bold">
                      R$ {item.products?.price.toFixed(2).replace('.', ',')}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-white rounded-lg border">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-l-lg transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-orange-600">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold transition transform hover:scale-105">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
