import { Category } from '../lib/supabase';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Categorias</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-4 py-3 rounded-lg transition ${
            selectedCategory === null
              ? 'bg-orange-600 text-white font-semibold'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todos os Produtos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              selectedCategory === category.id
                ? 'bg-orange-600 text-white font-semibold'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
