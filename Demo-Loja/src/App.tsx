import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CategoryFilter } from './components/CategoryFilter';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { Product, Category, CartItem } from './lib/supabase';
import { getProducts, getCategories, getProductsByCategory } from './services/productService';
import { getCartItems, addToCart } from './services/cartService';
import { catalogProducts } from './lib/catalogProducts';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
  loadInitialData();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadInitialData = async () => {
    setIsLoading(true);
    const [productsData, categoriesData, cartData] = await Promise.all([
      getProducts(),
      getCategories(),
      getCartItems(),
    ]);

    // Junta produtos do banco e do catálogo local, evitando duplicados
    const allProducts = [
      ...productsData,
      ...catalogProducts.filter(localProd =>
        !productsData.some(dbProd => dbProd.name === localProd.name)
      ),
    ];

    setProducts(allProducts);
    setCategories(categoriesData);
    setCartItems(cartData);
    setIsLoading(false);
  };

  const loadProducts = async () => {
    let productsData;
    if (selectedCategory) {
      productsData = await getProductsByCategory(selectedCategory);
    } else {
      productsData = await getProducts();
    }
    // Junta produtos do banco e do catálogo local, evitando duplicados
    const allProducts = [
      ...productsData,
      ...catalogProducts.filter(localProd =>
        !productsData.some(dbProd => dbProd.name === localProd.name)
      ),
    ];
    setProducts(allProducts);
  };

  const loadCartItems = async () => {
    const cartData = await getCartItems();
    setCartItems(cartData);
  };

  const handleAddToCart = async (productId: string) => {
    const success = await addToCart(productId);
    if (success) {
      await loadCartItems();
    }
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItemsCount}
        onLoginClick={() => setIsLoginOpen(true)}
      />
      <Hero />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.name
                  : 'Todos os Produtos'}
              </h2>
              <p className="text-gray-600 mt-2">{products.length} produtos encontrados</p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdate={loadCartItems}
      />

      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center border-2 border-orange-600">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Login</h2>
            <input
              type="text"
              placeholder="Usuário"
              className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold mb-2"
              onClick={() => setIsLoginOpen(false)}
            >
              Entrar
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold"
              onClick={() => setIsLoginOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
