import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle, Building, Percent, ExternalLink } from 'lucide-react';
import { Property, InterestType } from '../types';

interface FinancingCalculatorProps {
  properties: Property[];
  onOpenInterest: (property: Property, interestType: InterestType) => void;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  properties,
  onOpenInterest
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0].id);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termYears, setTermYears] = useState(30);
  const [interestRateAnnual, setInterestRateAnnual] = useState(10.5);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  const downPaymentAmount = (selectedProperty.price * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, selectedProperty.price - downPaymentAmount);
  const totalMonths = termYears * 12;
  const monthlyInterestRate = (interestRateAnnual / 100) / 12;

  const estimatedMonthlyPayment = loanAmount > 0
    ? (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
    : 0;

  const minRequiredIncome = estimatedMonthlyPayment * 3.33; // 30% rule of thumb

  return (
    <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-800 relative overflow-hidden">
      {/* Background Subtle Shapes */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-full inline-block mb-2">
              Simulador Inteligente
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Simule o Financiamento do seu Imóvel
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Calcule parcelas estimadas nos principais bancos e veja a entrada mínima recomendada.
            </p>
          </div>

          {/* Quick Property Selector Chips */}
          <div className="flex flex-wrap gap-2">
            {properties.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPropertyId(p.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPropertyId === p.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p.neighborhood} ({formatBRL(p.price)})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Form */}
          <div className="lg:col-span-7 space-y-6 bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl backdrop-blur-xs">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-slate-300">Valor de Entrada ({downPaymentPercent}%)</span>
                <span className="text-emerald-400 font-bold text-sm">{formatBRL(downPaymentAmount)}</span>
              </div>
              <input
                type="range"
                min={10}
                max={70}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>10% (Mínimo)</span>
                <span>30% (Recomendado)</span>
                <span>70%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Prazo de Financiamento
                </label>
                <select
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={15}>15 anos (180 meses)</option>
                  <option value={20}>20 anos (240 meses)</option>
                  <option value={25}>25 anos (300 meses)</option>
                  <option value={30}>30 anos (360 meses)</option>
                  <option value={35}>35 anos (420 meses)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Taxa de Juros Anual Estimada
                </label>
                <select
                  value={interestRateAnnual}
                  onChange={(e) => setInterestRateAnnual(Number(e.target.value))}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={9.8}>9.8% a.a. (Caixa SBPE)</option>
                  <option value={10.5}>10.5% a.a. (Média de Mercado)</option>
                  <option value={11.2}>11.2% a.a. (Bancos Privados)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Você pode utilizar o saldo do FGTS na composição da entrada ou amortização.</span>
            </div>
          </div>

          {/* Simulation Output Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-700/50 p-6 sm:p-7 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block">
                    {selectedProperty.name}
                  </span>
                  <span className="text-xs text-slate-400">Saldo financiado: {formatBRL(loanAmount)}</span>
                </div>
                <span className="bg-indigo-900 text-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-700">
                  Tabela Price / SAC
                </span>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 mb-4">
                <span className="text-xs text-slate-400 block mb-1">Primeira Parcela Estimada:</span>
                <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                  {formatBRL(estimatedMonthlyPayment)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">/mês em {totalMonths} parcelas</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Renda Familiar Sugerida:</span>
                  <span className="font-semibold text-white">{formatBRL(minRequiredIncome)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Entrada ({downPaymentPercent}%):</span>
                  <span className="font-semibold text-white">{formatBRL(downPaymentAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={selectedProperty.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Preencher Formulário {selectedProperty.neighborhood}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => onOpenInterest(selectedProperty, 'financiamento')}
                className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs py-2 rounded-lg transition-colors cursor-pointer"
              >
                Personalizar Simulação no Modal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
