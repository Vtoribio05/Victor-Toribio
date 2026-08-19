import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Loader2, CheckCircle2, AlertTriangle, ScanLine, Calculator, ChevronRight, X } from 'lucide-react';

const aiProcessingSteps = [
  { icon: ScanLine, text: "Escaneando documento con Visión IA..." },
  { icon: FileText, text: "Extrayendo repuestos y mano de obra..." },
  { icon: Calculator, text: "Cruzando precios con distribuidores OEM..." },
  { icon: CheckCircle2, text: "Generando reporte de auditoría..." }
];

const mockExtractedData = {
  brand: "Toyota (detectado)",
  items: [
    { name: "Juego de Pastillas Delanteras", original: 180, fair: 95, risk: "Alto" },
    { name: "Rectificado de Discos", original: 60, fair: 50, risk: "Bajo" },
    { name: "Líquido de Frenos DOT 4", original: 45, fair: 20, risk: "Alto" },
    { name: "Mano de Obra (3 hrs)", original: 150, fair: 100, risk: "Medio" },
    { name: "Limpieza de cuerpo aceleración", original: 80, fair: 0, risk: "Innecesario" } // Found as redundant
  ]
};

const AuditSimulator = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, processing, complete
  const [step, setStep] = useState(0);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    setStatus('processing');
    setStep(0);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < aiProcessingSteps.length) {
        setStep(currentStep);
      } else {
        clearInterval(interval);
        setStatus('complete');
      }
    }, 1500);
  };

  const resetSimulator = () => {
    setFile(null);
    setStatus('idle');
    setStep(0);
  };

  const totalOriginal = mockExtractedData.items.reduce((acc, curr) => acc + curr.original, 0);
  const totalFair = mockExtractedData.items.reduce((acc, curr) => acc + curr.fair, 0);
  const saving = totalOriginal - totalFair;

  return (
    <section id="simulador" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-6 border border-secondary/20">
            <ScanLine size={16} /> IA de Visión Activa
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Auditoría Inteligente Automatizada
          </h2>
          <p className="text-lg md:text-xl text-slate-400">
            Sube una foto o PDF de tu cotización. Nuestra inteligencia artificial extraerá cada línea, buscará los precios de mercado y te mostrará exactamente dónde te están cobrando de más.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="dark-glass-panel rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-700/60 relative overflow-hidden transition-all duration-500">
            
            <AnimatePresence mode="wait">
              {/* STAGE 1: UPLOAD */}
              {status === 'idle' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-700 hover:border-slate-500'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf"
                  />
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-slate-700">
                    <UploadCloud size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Arrastra tu cotización aquí</h3>
                  <p className="text-slate-400 mb-8 max-w-sm mx-auto">Soporta formatos JPG, PNG y PDF hasta 5MB. Los datos se analizan de forma privada y segura.</p>
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
                  >
                    Seleccionar Archivo
                  </button>
                </motion.div>
              )}

              {/* STAGE 2: PROCESSING */}
              {status === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12"
                >
                  <div className="text-center mb-10">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 bg-primary/20 rounded-xl animate-pulse"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-secondary shadow-[0_0_15px_rgba(14,165,233,0.8)] z-50 animate-scan"></div>
                      <div className="w-full h-full border border-slate-600 rounded-xl flex items-center justify-center bg-slate-800/50">
                        <FileText size={40} className="text-slate-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{file?.name || "Documento cargado"}</h3>
                    <p className="text-slate-400">Analizando documento con IA...</p>
                  </div>

                  <div className="max-w-md mx-auto space-y-4">
                    {aiProcessingSteps.map((s, idx) => {
                      const Icon = s.icon;
                      const isComplete = idx < step;
                      const isCurrent = idx === step;
                      return (
                        <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${isCurrent ? 'bg-slate-800/50 border border-slate-700' : ''} ${isComplete ? 'opacity-50' : idx > step ? 'opacity-30' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isComplete ? 'bg-green-500/20 text-green-500' : isCurrent ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-slate-500'}`}>
                            {isComplete ? <CheckCircle2 size={16} /> : isCurrent ? <Loader2 size={16} className="animate-spin" /> : <Icon size={16} />}
                          </div>
                          <span className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-slate-300'}`}>{s.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: RESULT */}
              {status === 'complete' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold mb-3">
                        <CheckCircle2 size={12} className="text-green-500" /> IA Confianza: 98%
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">Análisis Completado</h3>
                      <p className="text-slate-400">{mockExtractedData.brand}</p>
                    </div>
                    <button onClick={resetSimulator} className="text-slate-500 hover:text-white p-2">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                      <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Monto Original</p>
                      <p className="text-2xl font-bold text-slate-300 line-through decoration-red-500/50">${totalOriginal}</p>
                    </div>
                    <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                      <p className="text-xs text-primary uppercase font-semibold mb-1">Precio Justo (IA)</p>
                      <p className="text-2xl font-bold text-white">${totalFair}</p>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                      <p className="text-xs text-green-500 uppercase font-semibold mb-1">Ahorro Detectado</p>
                      <p className="text-2xl font-bold text-green-400">${saving}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Desglose de Ítems (Extraídos)</h4>
                    <div className="space-y-3">
                      {mockExtractedData.items.map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border ${item.risk === 'Innecesario' ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-900 border-slate-800'} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                          <div className="flex-1">
                            <p className="font-semibold text-white flex items-center gap-2">
                              {item.name}
                              {item.risk === 'Innecesario' && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full uppercase font-bold">No sugerido</span>}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">Cobrado: ${item.original} • Justo: ${item.fair}</p>
                          </div>
                          <div className="text-right">
                            {item.risk === 'Alto' && <span className="text-sm font-bold text-amber-500 flex items-center gap-1 justify-end"><AlertTriangle size={14}/> Sobreprecio ALTO</span>}
                            {item.risk === 'Medio' && <span className="text-sm font-bold text-yellow-500">Sobreprecio MEDIO</span>}
                            {item.risk === 'Bajo' && <span className="text-sm font-bold text-green-500 flex items-center gap-1 justify-end"><CheckCircle2 size={14}/> Precio Ok</span>}
                            {item.risk === 'Innecesario' && <span className="text-sm font-bold text-red-500 line-through decoration-2 decoration-red-500">${item.original}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-white hover:bg-slate-50 text-slate-900 rounded-xl py-4 font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg">
                    <FileText size={20} />
                    Descargar Reporte Completo (PDF)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditSimulator;
