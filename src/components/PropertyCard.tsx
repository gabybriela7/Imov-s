import React, { useState } from 'react';
import { 
  ExternalLink, 
  Calendar, 
  Calculator, 
  TrendingUp, 
  FileText, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Property, InterestType } from '../types';

interface PropertyCardProps {
  property: Property;
  onOpenInterest: (property: Property, interestType: InterestType) => void;
  onOpenDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onOpenInterest,
  onOpenDetails
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 group">
      {/* Top Image Box with Badges & Gallery Nav */}
      <div 
        className="h-56 sm:h-64 bg-slate-200 relative overflow-hidden cursor-pointer select-none"
        onClick={() => onOpenDetails(property)}
      >
        <img
          src={property.images[activeImageIndex]}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
          <span className={`${property.badgeColor} text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1`}>
            <Sparkles className="w-3 h-3" />
            {property.badge}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded border border-white/20">
            Cód. {property.code}
          </span>
        </div>

        {/* Image carousel controllers */}
        {property.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={prevImage}
              aria-label="Foto anterior"
              className="w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900 transition-colors backdrop-blur-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Próxima foto"
              className="w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900 transition-colors backdrop-blur-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image index dots */}
        <div className="absolute bottom-16 right-4 flex gap-1 z-10 pointer-events-none">
          {property.images.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                activeImageIndex === idx ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Bottom Property Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{property.neighborhood}, São Paulo - SP</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight drop-shadow-xs">
            {property.name}
          </h2>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5 bg-white">
        <div>
          {/* Price & VivaReal Source Link */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                Valor de Venda
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                {formatPrice(property.price)}
              </span>
              {property.condoFee ? (
                <span className="text-xs text-slate-500 block mt-0.5 font-medium">
                  Condomínio: {formatPrice(property.condoFee)}/mês
                </span>
              ) : (
                <span className="text-xs text-emerald-600 block mt-0.5 font-semibold">
                  Sem taxa de condomínio
                </span>
              )}
            </div>

            {/* VivaReal Direct Link Button */}
            <a
              href={property.vivaRealUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-2.5 py-1.5 rounded-lg transition-colors group/link shrink-0"
              title="Abrir anúncio oficial no VivaReal"
            >
              <span>VivaReal</span>
              <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Key Metric Specs Matrix */}
          <div className="grid grid-cols-4 bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-5 text-center divide-x divide-slate-200">
            <div className="px-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Área</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{property.area}m²</span>
            </div>
            <div className="px-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Dorms</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{property.bedrooms} Qts</span>
            </div>
            <div className="px-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Suítes</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{property.suites} Suíte{property.suites > 1 ? 's' : ''}</span>
            </div>
            <div className="px-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Vagas</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{property.parkingSpots} Vaga{property.parkingSpots > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
            {property.summary}
          </p>

          {/* Highlight Bullets */}
          <div className="space-y-1.5 mb-2">
            {property.highlights.slice(0, 2).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions & Interest Form Triggers */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
          {/* Main Google Form Action Button for this property */}
          <a
            href={property.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-slate-900 text-white text-center py-3.5 px-4 rounded-xl font-bold hover:bg-indigo-900 active:scale-[0.99] transition-all uppercase text-xs tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer group/btn"
          >
            <span>{property.defaultInterestLabel}</span>
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>

          {/* Quick Segmented Interest Pills */}
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <a
              href={property.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
              title="Preencher Formulário de Visita no Google Forms"
            >
              <Calendar className="w-3 h-3 text-emerald-600" />
              <span className="truncate">Visita</span>
            </a>

            <button
              onClick={() => onOpenInterest(property, 'financiamento')}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
              title="Simular Financiamento Bancário"
            >
              <Calculator className="w-3 h-3 text-blue-600" />
              <span className="truncate">Financiar</span>
            </button>

            <button
              onClick={() => onOpenDetails(property)}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
              title="Ver Fotos e Detalhes Completos"
            >
              <FileText className="w-3 h-3 text-amber-600" />
              <span className="truncate">Detalhes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
