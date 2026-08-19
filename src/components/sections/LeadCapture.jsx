import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';

const LeadCapture = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-700/50">
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Obtén un informe completo de tu caso
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Sube tu cotización completa y recibe un PDF detallado con el análisis de cada línea, repuestos alternativos y la estrategia de negociación.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-secondary shrink-0" size={20} />
                  Análisis línea por línea
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-secondary shrink-0" size={20} />
                  Opciones de repuestos en tu zona
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-secondary shrink-0" size={20} />
                  Guía de negociación en PDF
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                Solicitar Acceso Anticipado
              </h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    placeholder="tu@correo.com" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono (WhatsApp)</label>
                  <input 
                    type="tel" 
                    placeholder="+1 234 567 890" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-4 font-bold transition-colors flex items-center justify-center gap-2 mt-6"
                >
                  <FileText size={20} />
                  Recibir mi informe PDF
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500 mb-3">¿Prefieres atención inmediata?</p>
                <a 
                  href="https://wa.me/1234567890?text=Hola,%20quiero%20que%20revisen%20una%20cotizaci%C3%B3n%20de%20mi%20veh%C3%ADculo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl py-3 font-bold transition-colors"
                >
                  <Smartphone size={20} />
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
