import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Wrench, MessageSquareText } from 'lucide-react';
import { content } from '../../data/autoAuditContent';

const iconMap = {
  ShieldAlert: ShieldAlert,
  Wrench: Wrench,
  MessageSquareText: MessageSquareText
};

const Benefits = () => {
  return (
    <section id="beneficios" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Poder y transparencia en tus manos
          </h2>
          <p className="text-lg text-slate-600">
            Nuestra IA analiza múltiples variables para protegerte de cobros abusivos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {IconComponent && <IconComponent size={28} />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
