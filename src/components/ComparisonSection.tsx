import React from 'react';
import { Check, ArrowRight, ExternalLink, MapPin, Building, Shield } from 'lucide-react';
import { Property, InterestType } from '../types';

interface ComparisonSectionProps {
  properties: Property[];
  onOpenInterest: (property: Property, interestType: InterestType) => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  properties,
  onOpenInterest
}) => {
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-2">
          Comparativo Direto
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Qual o imóvel ideal para o seu perfil?
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Compare lado a lado as características dos 3 empreendimentos selecionados na Zona Leste de São Paulo.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-4 bg-slate-50 rounded-tl-xl w-1/4">Critério</th>
              {properties.map((p) => (
                <th key={p.id} className="py-4 px-4 bg-slate-50 last:rounded-tr-xl w-1/4">
                  <div className="text-slate-900 font-bold text-sm sm:text-base">{p.neighborhood}</div>
                  <div className="text-[11px] text-indigo-600 font-semibold">{p.badge}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/50">Valor Total</td>
              {properties.map((p) => (
                <td key={p.id} className="py-3 px-4 font-bold text-slate-950 text-base">
                  {formatBRL(p.price)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/50">Valor do m²</td>
              {properties.map((p) => (
                <td key={p.id} className="py-3 px-4 text-slate-600">
                  {formatBRL(Math.round(p.price / p.area))}/m²
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/50">Área & Tipologia</td>
              {properties.map((p) => (
                <td key={p.id} className="py-3 px-4">
                  <span className="font-semibold">{p.area} m²</span> • {p.propertyType}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/50">Dormitórios / Suítes</td>
              {properties.map((p) => (
                <td key={p.id} className="py-3 px-4">
                  {p.bedrooms} Quartos ({p.suites} Suíte{p.suites > 1 ? 's' : ''})
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/50">Vagas de Garagem</td>
              {properties.map((p) => (
                <td key={p.id} className="py-3 px-4">
                  {p.parkingSpots} Vaga{p.parkingSpots > 1 ? 's' : ''}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/50">Destaque Principal</td>
              {properties.map((p) => (
                <td key={p.id} className="py-3 px-4 text-xs text-slate-600">
                  {p.highlights[0]}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/50">Anúncio VivaReal</td>
              {properties.map((p) => (
                <td key={p.id} className="py-3 px-4">
                  <a
                    href={p.vivaRealUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Ver Anúncio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              ))}
            </tr>
            <tr className="bg-slate-50/80">
              <td className="py-4 px-4 font-semibold text-slate-900 rounded-bl-xl">Formulário de Interesse</td>
              {properties.map((p) => (
                <td key={p.id} className="py-4 px-4 last:rounded-br-xl">
                  <a
                    href={p.googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-indigo-900 text-white font-bold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Abrir Formulário</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
