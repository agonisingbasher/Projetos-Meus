import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  // Função para garantir que o link correto seja exibido
  const getProductImage = () => {
    const name = product.name.toLowerCase();
    if (product.name === 'Controle Xbox Series X') {
      return 'https://cdn.awsli.com.br/600x450/1919/1919257/produto/120337656/d8fc9b09e0.jpg';
    }
    if (name.includes('xbox')) {
      return 'https://m.media-amazon.com/images/I/516pVDAQMnL.jpg';
    }
    if (name.includes('playstation')) {
      return 'https://images.kabum.com.br/produtos/fotos/527400/console-playstation-5-sony-slim-branco-2-jogos-1000038899_1710512865_gg.jpg';
    }
    if (name.includes('switch')) {
      return 'https://m.media-amazon.com/images/I/7148mbvrbWL.jpg';
    }
    if (name.includes('mouse')) {
      return 'https://theawesomer.com/photos/2019/11/razer_basilisk_ultimate_mouse_4.jpg';
    }
    if (name.includes('controle')) {
      return 'https://images.kabum.com.br/produtos/fotos/115801/controle-sem-fio-ps5-dualsense_1598897393_gg.jpg';
    }
    if (name.includes('cadeira')) {
      return 'https://cdn.dooca.store/1841/products/cadeira-rgb-draxen.jpg?v=1644257662&webp=0';
    }
    // Se não for nenhum dos acima, retorna o image_url ou um placeholder
    return product.image_url || 'https://via.placeholder.com/400x400?text=Sem+Imagem';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden bg-gray-100">
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            -{discount}%
          </div>
        )}
        <img
          src={getProductImage()}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="space-y-2">
          {product.original_price && (
            <p className="text-sm text-gray-400 line-through">
              R$ {product.original_price.toFixed(2).replace('.', ',')}
            </p>
          )}
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-orange-600">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <p className="text-sm text-green-600 font-medium">
            Em estoque: {product.stock} unidades
          </p>
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition transform hover:scale-105"
        >
          <ShoppingCart size={20} />
          <span>Adicionar ao Carrinho</span>
        </button>
      </div>
    </div>
  );
};
