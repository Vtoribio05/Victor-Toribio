import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, ShieldCheck, MapPin, Award, CheckCircle2 } from 'lucide-react';

const mockShops = [
  {
    id: 1,
    name: "Autotaller Precisión G.",
    score: 99,
    reviews: 142,
    location: "Zona Norte",
    badges: ["0% Sobreprecios", "Garantía Extendida"]
  },
  {
    id: 2,
    name: "Mecánica Avanzada Elite",
    score: 96,
    reviews: 89,
    location: "Centro",
    badges: ["Diagnóstico Honesto", "Repuestos OEM"]
  },
  {
    id: 3,
    name: "Servicio Automotriz Flash",
    score: 94,
    reviews: 215,
    location: "Zona Sur",
    badges: ["Rapidez", "Precios Justos"]
  }
];

const TrustRanking = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-16 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-sm font-bold mb-6 border border-amber-500/20">
            <Award size={16} /> Buró de Confianza
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Encuentra talleres <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">verificados por IA</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Nuestra IA no solo detecta fraudes, también premia a los mecánicos honestos. Busca en nuestra base de datos antes de llevar tu auto.
          </p>

          <div className="relative max-w-xl mx-auto shadow-2xl rounded-2xl overflow-hidden group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
            </div>
            <input
              type="text"
              placeholder="Busca el nombre de un taller o zona..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-5 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary border border-slate-200 text-lg transition-all"
            />
            <button className="absolute inset-y-2 right-2 bg-slate-900 hover:bg-slate-800 text-white px-6 rounded-xl font-bold transition-colors">
              Buscar
            </button>
          </div>
        </div>

        {/* Ranking List */}
        <div className="grid md:grid-cols-3 gap-8">
          {mockShops.map((shop, idx) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-400 to-orange-500 text-white px-4 py-2 rounded-bl-2xl font-black text-xl shadow-md">
                {shop.score}<span className="text-sm opacity-80">/100</span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 pr-16 mb-2">{shop.name}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><MapPin size={16} className="text-primary"/> {shop.location}</span>
                  <span className="flex items-center gap-1"><Star size={16} className="text-amber-400 fill-amber-400"/> {shop.reviews} reseñas</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {shop.badges.map((badge, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0"/>
                    <span className="text-sm font-semibold">{badge}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-slate-900 group-hover:bg-primary text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                <ShieldCheck size={20} /> Ver reporte completo
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustRanking;
