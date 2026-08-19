import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, AlertCircle, CheckCircle2, TrendingDown } from 'lucide-react';
import { content } from '../../data/autoAuditContent';

const Hero = () => {
  const { hero } = content;

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-background-light to-background-light"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {hero.badge}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              No pagues de más en el taller. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Audita tu presupuesto</span> con IA.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
              >
                {hero.ctaPrimary}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Play fill="currentColor" size={16} />
                {hero.ctaSecondary}
              </button>
            </div>
          </motion.div>

          {/* Graphic / Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
              {/* Scanning Laser Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary shadow-[0_0_15px_rgba(14,165,233,0.8)] z-50 animate-scan pointer-events-none"></div>

              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-10">
                <TrendingDown size={14} /> Ahorro: $330 USD
              </div>
              
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Presupuesto Original</p>
                  <p className="text-2xl font-bold text-slate-400 line-through decoration-red-500/50 decoration-2">$850.00</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary font-bold uppercase tracking-wider">Sugerido AutoAudit</p>
                  <p className="text-3xl font-extrabold text-slate-900">$520.00</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Pastillas de Freno (Eje Delantero)</p>
                      <p className="text-xs text-slate-500">Precio Justo (OEM)</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-700">$120.00</span>
                </div>

                <div className="flex items-start justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex gap-3">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-red-900">Limpieza de Inyectores</p>
                      <p className="text-xs text-red-700 font-medium">Servicio redundante / No requerido</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-400 line-through block">$150.00</span>
                    <span className="text-xs font-bold text-red-600 block">Eliminar</span>
                  </div>
                </div>

                <div className="flex items-start justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex gap-3">
                    <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-amber-900">Mano de Obra (4 horas)</p>
                      <p className="text-xs text-amber-700 font-medium">Sobreprecio detectado (Mercado: 2h)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-400 line-through block">$180.00</span>
                    <span className="text-sm font-bold text-amber-700 block">$90.00</span>
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
