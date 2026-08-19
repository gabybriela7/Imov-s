import React, { useState } from 'react';
import { Header } from './components/Header';
import { PropertyCard } from './components/PropertyCard';
import { InterestModal } from './components/InterestModal';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { ComparisonSection } from './components/ComparisonSection';
import { FinancingCalculator } from './components/FinancingCalculator';
import { Footer } from './components/Footer';
import { PROPERTIES } from './data/properties';
import { Property, InterestType } from './types';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Award, 
  Building2, 
  Calendar,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('TODOS');
  
  // Modals state
  const [interestModalOpen, setInterestModalOpen] = useState(false);
  const [activePropertyForInterest, setActivePropertyForInterest] = useState<Property | null>(null);
  const [selectedInterestType, setSelectedInterestType] = useState<InterestType>('compra');

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [activePropertyForDetails, setActivePropertyForDetails] = useState<Property | null>(null);

  const filteredProperties = selectedNeighborhood === 'TODOS'
    ? PROPERTIES
    : PROPERTIES.filter((p) => p.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase()));

  const handleOpenInterest = (property: Property, interestType: InterestType) => {
    setActivePropertyForInterest(property);
    setSelectedInterestType(interestType);
    setInterestModalOpen(true);
  };

  const handleOpenDetails = (property: Property) => {
    setActivePropertyForDetails(property);
    setDetailsModalOpen(true);
  };

  const handleOpenGeneralContact = () => {
    handleOpenInterest(PROPERTIES[0], 'material');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header 
        onOpenGeneralContact={handleOpenGeneralContact}
        activeFilter={selectedNeighborhood}
        onSelectNeighborhood={(n) => setSelectedNeighborhood(n)}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto pt-4 pb-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Seleção Exclusiva de Imóveis • Zona Leste SP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Empreendimentos Selecionados na <span className="text-indigo-600">Mooca, Tatuapé e Vila Ema</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            Três oportunidades únicas de investimento e moradia de alto padrão. Escolha o seu objetivo e preencha o formulário dedicado para atendimento imediato e propostas exclusivas.
          </p>

          {/* Quick Filter Pill Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-6">
            <button
              onClick={() => setSelectedNeighborhood('TODOS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedNeighborhood === 'TODOS'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Todos os 3 Imóveis
            </button>
            <button
              onClick={() => setSelectedNeighborhood('Mooca')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedNeighborhood === 'Mooca'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Mooca • Sobrado 170m² (R$ 1.88M)
            </button>
            <button
              onClick={() => setSelectedNeighborhood('Tatuapé')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedNeighborhood === 'Tatuapé'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Tatuapé • Apto 88m² (R$ 890k)
            </button>
            <button
              onClick={() => setSelectedNeighborhood('Vila Ema')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedNeighborhood === 'Vila Ema'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Vila Ema • Apto 70m² (R$ 716k)
            </button>
          </div>
        </section>

        {/* 3 Main Property Cards Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpenInterest={handleOpenInterest}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </section>

        {/* Value Proposition Micro-Banner */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center sm:text-left">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Documentação 100% Regular</h3>
              <p className="text-xs text-slate-500 mt-0.5">Imóveis com matrícula e certidões auditadas.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 sm:border-x border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Aprovação de Crédito Ágil</h3>
              <p className="text-xs text-slate-500 mt-0.5">Parceria com Caixa, Itaú, Bradesco e Santander.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Plantão Personalizado</h3>
              <p className="text-xs text-slate-500 mt-0.5">Corretores credenciados e especialistas na região.</p>
            </div>
          </div>
        </section>

        {/* Direct Comparison Matrix */}
        <ComparisonSection
          properties={PROPERTIES}
          onOpenInterest={handleOpenInterest}
        />

        {/* Interactive Financing Calculator Section */}
        <FinancingCalculator
          properties={PROPERTIES}
          onOpenInterest={handleOpenInterest}
        />

        {/* Regional FAQ & Buyer Guide */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-2">
                Dúvidas Frequentes
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Por que escolher a Zona Leste de São Paulo?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Mooca Tradicional
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bairro com forte identidade cultural, alta segurança, farto comércio gastronômico e excelente valorização para residências de médio e alto padrão.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Tatuapé & Anália Franco
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Principal polo corporativo e de lazer da Zona Leste, com parques renomados (CERET), shoppings centers e alta demanda para locação e revenda.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Vila Ema em Expansão
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Região em franca valorização com a linha de Monotrilho/Metrô, condomínios modernos e excelente relação custo-benefício de entrada.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer properties={PROPERTIES} />

      {/* Interest Form Modal */}
      <InterestModal
        isOpen={interestModalOpen}
        onClose={() => setInterestModalOpen(false)}
        property={activePropertyForInterest}
        initialInterestType={selectedInterestType}
      />

      {/* Detailed Gallery Modal */}
      <PropertyDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        property={activePropertyForDetails}
        onOpenInterest={handleOpenInterest}
      />
    </div>
  );
}
