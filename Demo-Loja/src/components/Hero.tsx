export const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold leading-tight">
              As Melhores Ofertas em
              <span className="text-orange-400"> Gaming</span>
            </h2>
            <p className="text-xl text-gray-300">
              Consoles, periféricos e acessórios com os melhores preços do mercado
            </p>
            <div className="flex space-x-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105">
                Ver Ofertas
              </button>
              <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105">
                Novidades
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-500/20 to-transparent rounded-3xl p-8 backdrop-blur-sm border border-orange-500/30">
              <img
                src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Gaming Setup"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
