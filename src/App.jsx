import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import ProblemSolution from './components/sections/ProblemSolution';
import Benefits from './components/sections/Benefits';
import AuditSimulator from './components/sections/AuditSimulator';
import FAQ from './components/sections/FAQ';
import LeadCapture from './components/sections/LeadCapture';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProblemSolution />
        <Benefits />
        <AuditSimulator />
        <LeadCapture />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
