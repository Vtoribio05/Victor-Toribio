import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';
import { content } from '../../data/autoAuditContent';

const ProblemSolution = () => {
  const { problemSolution } = content;

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            El taller no debería ser un misterio
          </h2>
          <p className="text-lg text-slate-600">
            Comparamos la experiencia tradicional frustrante con la claridad absoluta que te brinda nuestra inteligencia artificial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problem Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 rounded-3xl p-8 border border-slate-200"
          >
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-6">
              <XCircle size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{problemSolution.problem.title}</h3>
            <ul className="space-y-4">
              {problemSolution.problem.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="text-red-400 shrink-0 mt-1" size={20} />
                  <span className="text-slate-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-2xl flex items-center justify-center mb-6 border border-secondary/30">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">{problemSolution.solution.title}</h3>
              <ul className="space-y-4">
                {problemSolution.solution.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-secondary shrink-0 mt-1" size={20} />
                    <span className="text-slate-300 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
