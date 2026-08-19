import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  MapPin, 
  Building2, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  DollarSign,
  Maximize2
} from 'lucide-react';
import { Property, InterestType } from '../types';

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onOpenInterest: (property: Property, interestType: InterestType) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  isOpen,
  onClose,
  property,
  onOpenInterest
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen || !property) return null;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col relative max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`${property.badgeColor} text-[10px] font-bold uppercase px-2.5 py-0.5 rounded`}>
                {property.badge}
              </span>
              <span className="text-xs text-slate-400">Cód. {property.code}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {property.name}
            </h2>
            <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              {property.fullAddress}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Main Gallery Display */}
          <div className="space-y-3">
            <div className="h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-950 relative">
              <img
                src={property.images[selectedImage]}
                alt={property.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-slate-950/70 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                Foto {selectedImage + 1} de {property.images.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === i ? 'border-indigo-600 ring-2 ring-indigo-300' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Miniatura" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Key Metrics Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block mb-0.5">Valor do Imóvel</span>
              <span className="text-3xl font-extrabold text-slate-950">{formatBRL(property.price)}</span>
              {property.condoFee ? (
                <span className="text-xs text-slate-500 block mt-0.5">
                  Condomínio: {formatBRL(property.condoFee)}/mês • IPTU anual: {formatBRL(property.iptuAnnual || 0)}
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={property.vivaRealUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-indigo-700 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                <span>Ver no VivaReal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={property.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-indigo-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <span>Preencher Formulário</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Specs Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold block">Área Útil</span>
              <span className="text-lg font-bold text-slate-900">{property.area} m²</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold block">Dormitórios</span>
              <span className="text-lg font-bold text-slate-900">{property.bedrooms} Quartos</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold block">Suítes</span>
              <span className="text-lg font-bold text-slate-900">{property.suites} Suíte{property.suites > 1 ? 's' : ''}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold block">Vagas de Garagem</span>
              <span className="text-lg font-bold text-slate-900">{property.parkingSpots} Vagas</span>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Sobre o Empreendimento</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities & Features */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Características e Comodidades</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-100 border-t border-slate-200 flex justify-between items-center shrink-0">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Atendimento exclusivo MOVA Imóveis • (11) 99290-0266
          </span>
          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href={property.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <span>Formulário {property.neighborhood}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                onClose();
                onOpenInterest(property, 'financiamento');
              }}
              className="flex-1 sm:flex-initial bg-slate-900 hover:bg-indigo-900 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
            >
              Simular Financiamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
