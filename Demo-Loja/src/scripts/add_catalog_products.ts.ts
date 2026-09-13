import { createClient } from '@supabase/supabase-js';
import { catalogProducts } from '../lib/catalogProducts.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addProducts() {
  const { data, error } = await supabase.from('products').insert(catalogProducts);
  if (error) {
    console.error('Erro ao adicionar produtos:', error);
  } else {
    console.log('Produtos adicionados com sucesso:', data);
  }
}

addProducts();