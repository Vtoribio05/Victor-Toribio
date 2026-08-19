import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, CarFront, ScanLine, AlertCircle } from 'lucide-react';
import { content } from '../../data/autoAuditContent';

const Hero = () => {
  const { hero } = content;
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition(prev => (prev >= 100 ? 0 : prev + 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
            className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center"
          >
            <div className="relative w-full aspect-square max-w-md bg-slate-900 rounded-full flex items-center justify-center p-8 border border-slate-800 shadow-[0_0_50px_rgba(14,165,233,0.15)] overflow-hidden group">
              {/* Radar Rings */}
              <div className="absolute inset-0 border border-slate-800 rounded-full scale-[0.8] opacity-50"></div>
              <div className="absolute inset-0 border border-secondary/20 rounded-full scale-[0.6] opacity-50"></div>
              <div className="absolute inset-0 border border-primary/20 rounded-full scale-[0.4] opacity-50"></div>
              
              {/* Holographic Car */}
              <div className="relative z-10 text-slate-800 transition-all duration-500">
                <CarFront size={200} strokeWidth={1} className="text-secondary drop-shadow-[0_0_20px_rgba(14,165,233,0.8)]" />
              </div>

              {/* Laser Scanner */}
              <div 
                className="absolute left-0 w-full h-[2px] bg-secondary shadow-[0_0_15px_rgba(14,165,233,1)] z-20 transition-all duration-75"
                style={{ top: `${scanPosition}%` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-12 bg-gradient-to-b from-transparent to-secondary/20 blur-md"></div>
              </div>

              {/* Hotspots */}
              <AnimatePresence>
                {(scanPosition > 30 && scanPosition < 60) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute top-[35%] left-[20%] bg-red-500/20 border border-red-500 text-red-500 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1 z-30 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  >
                    <AlertCircle size={12}/> Sobreprecio: Frenos
                  </motion.div>
                )}
                {(scanPosition > 60 && scanPosition < 90) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute bottom-[20%] right-[15%] bg-green-500/20 border border-green-500 text-green-500 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1 z-30 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                  >
                    <ScanLine size={12}/> Precio Correcto
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
