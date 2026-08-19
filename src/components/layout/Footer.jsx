import React from 'react';
import { ShieldCheck, Mail, Phone, Globe, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-primary text-white rounded-md">
                <ShieldCheck size={20} />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">AutoAudit<span className="text-secondary">.AI</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-6">
              Transparencia y justicia en cada reparación mecánica. Tu copiloto impulsado por IA para evitar sobreprecios y sorpresas en el taller.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Phone size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><MessageCircle size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Características</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Casos de Éxito</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Para Talleres</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} AutoAudit AI. Todos los derechos reservados.</p>
          <p>Hecho con precisión para conductores inteligentes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
