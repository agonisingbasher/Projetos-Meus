import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">TechStore</h3>
            <p className="text-sm">
              Sua loja de tecnologia e gaming com os melhores preços e produtos do mercado.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Rastreamento</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contato@techstore.com.br</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1" />
                <span>São Paulo, SP<br />Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 TechStore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
