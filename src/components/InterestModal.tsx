import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  Calendar, 
  Calculator, 
  TrendingUp, 
  FileText, 
  BadgePercent, 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  User, 
  Mail,
  ExternalLink
} from 'lucide-react';
import { Property, InterestType, LeadFormData } from '../types';
import { INTEREST_OPTIONS } from '../data/properties';

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  initialInterestType?: InterestType;
}

export const InterestModal: React.FC<InterestModalProps> = ({
  isOpen,
  onClose,
  property,
  initialInterestType = 'compra'
}) => {
  const [activeInterest, setActiveInterest] = useState<InterestType>(initialInterestType);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Visit details
  const [visitDate, setVisitDate] = useState('');
  const [visitPeriod, setVisitPeriod] = useState<'manha' | 'tarde' | 'noite'>('tarde');
  const [visitType, setVisitType] = useState<'presencial' | 'video'>('presencial');

  // Financing details
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termMonths, setTermMonths] = useState(360);
  const [bankPreference, setBankPreference] = useState('Caixa Econômica');

  // Proposal details
  const [offerValue, setOfferValue] = useState<number>(0);
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState('Financiamento Bancário + Recursos Próprios');

  useEffect(() => {
    if (initialInterestType) {
      setActiveInterest(initialInterestType);
    }
    if (property) {
      setOfferValue(property.price);
    }
    setIsSubmitted(false);
  }, [initialInterestType, property, isOpen]);

  if (!isOpen || !property) return null;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  // Financing calculation (SAC/Price baseline estimate around 10.5% a.a.)
  const downPaymentValue = (property.price * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, property.price - downPaymentValue);
  const monthlyRate = 0.105 / 12;
  const estimatedInstallment = loanAmount > 0 
    ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) / (Math.pow(1 + monthlyRate, termMonths) - 1)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const lead: LeadFormData = {
      propertyId: property.id,
      propertyTitle: property.name,
      neighborhood: property.neighborhood,
      interestType: activeInterest,
      name,
      email,
      phone,
      notes,
      preferredDate: visitDate,
      preferredTime: visitPeriod,
      visitType,
      downPayment: downPaymentValue,
      installmentMonths: termMonths,
      hasTradeIn,
      offerPrice: offerValue
    };

    // Save lead to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('eastside_leads') || '[]');
      existing.push({ ...lead, submittedAt: new Date().toISOString() });
      localStorage.setItem('eastside_leads', JSON.stringify(existing));
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const generateWhatsAppUrl = () => {
    let text = `*Contato MOVA Imóveis*%0A`;
    text += `*Imóvel:* ${encodeURIComponent(property.name)} (${property.neighborhood})%0A`;
    text += `*Valor:* ${encodeURIComponent(formatBRL(property.price))}%0A`;
    text += `*Tipo de Interesse:* ${encodeURIComponent(activeInterest.toUpperCase())}%0A`;
    text += `*Nome:* ${encodeURIComponent(name || 'Cliente Interessado')}%0A`;
    text += `*Telefone:* ${encodeURIComponent(phone || 'Não informado')}%0A`;

    if (activeInterest === 'visita' && visitDate) {
      text += `*Data Preferida:* ${encodeURIComponent(visitDate)} (${visitPeriod} - ${visitType})%0A`;
    } else if (activeInterest === 'financiamento') {
      text += `*Entrada Simulada:* ${encodeURIComponent(formatBRL(downPaymentValue))} (${downPaymentPercent}%)%0A`;
      text += `*Prazo:* ${termMonths} meses (${bankPreference})%0A`;
    } else if (activeInterest === 'compra') {
      text += `*Oferta Proposta:* ${encodeURIComponent(formatBRL(offerValue))}%0A`;
      if (hasTradeIn) text += `*Possui Imóvel/Veículo na Troca:* Sim%0A`;
    }

    text += `%0A*Link VivaReal:* ${encodeURIComponent(property.vivaRealUrl)}`;
    return `https://wa.me/5511992900266?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col relative max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with property preview */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={onClose}
            aria-label="Fechar formulário"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className={`${property.badgeColor} text-[10px] font-bold uppercase px-2 py-0.5 rounded`}>
              {property.neighborhood}
            </span>
            <span className="text-xs text-slate-400">Cód. {property.code}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white pr-10">
            {property.name}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-300">
            <span className="font-semibold text-emerald-400 text-sm">
              {formatBRL(property.price)}
            </span>
            <span>•</span>
            <span>{property.area}m² úteis</span>
            <span>•</span>
            <span>{property.bedrooms} Quartos ({property.suites} Suítes)</span>
            <span>•</span>
            <span>{property.parkingSpots} Vagas</span>
          </div>
        </div>

        {/* Content Body */}
        {!isSubmitted ? (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {/* Direct Google Form Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    Formulário Oficial de Interesse ({property.neighborhood})
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Acesse o formulário Google Forms dedicado exclusivamente a este imóvel.
                  </p>
                </div>
              </div>
              <a
                href={property.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors shadow-xs inline-flex items-center justify-center gap-2 shrink-0"
              >
                <span>Abrir Google Forms</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interest Category Selector Tabs */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Selecione o seu objetivo de interesse:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                {INTEREST_OPTIONS.map((opt) => {
                  const isSelected = activeInterest === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setActiveInterest(opt.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-indigo-900 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-[11px] text-center leading-tight">{opt.title.split('/')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contextual Box explaining the chosen interest */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 mb-6 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                {activeInterest === 'compra' && <BadgePercent className="w-4 h-4" />}
                {activeInterest === 'visita' && <Calendar className="w-4 h-4" />}
                {activeInterest === 'financiamento' && <Calculator className="w-4 h-4" />}
                {activeInterest === 'investimento' && <TrendingUp className="w-4 h-4" />}
                {activeInterest === 'material' && <FileText className="w-4 h-4" />}
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-indigo-950">
                  {INTEREST_OPTIONS.find(o => o.id === activeInterest)?.title}
                </h4>
                <p className="text-slate-600 mt-0.5">
                  {INTEREST_OPTIONS.find(o => o.id === activeInterest)?.description}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Contextual Specific Fields per Interest Type */}
              {activeInterest === 'compra' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                    Detalhes da sua Proposta de Compra
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Valor Sugerido para Proposta (R$)
                      </label>
                      <input
                        type="number"
                        value={offerValue}
                        onChange={(e) => setOfferValue(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Condição de Pagamento
                      </label>
                      <select
                        value={paymentPlan}
                        onChange={(e) => setPaymentPlan(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option>À Vista / Recursos Próprios</option>
                        <option>Financiamento Bancário</option>
                        <option>Financiamento + FGTS</option>
                        <option>Carta de Crédito / Consórcio</option>
                      </select>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={hasTradeIn}
                      onChange={(e) => setHasTradeIn(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Desejo avaliar permuta ou entrada com outro imóvel / veículo
                    </span>
                  </label>
                </div>
              )}

              {activeInterest === 'visita' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                    Preferência de Agendamento
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Data Preferida
                      </label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Melhor Horário
                      </label>
                      <select
                        value={visitPeriod}
                        onChange={(e) => setVisitPeriod(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option value="manha">Manhã (09h às 12h)</option>
                        <option value="tarde">Tarde (13h às 17h)</option>
                        <option value="noite">Fim de Tarde (17h às 19h)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Formato
                      </label>
                      <select
                        value={visitType}
                        onChange={(e) => setVisitType(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option value="presencial">Presencial no Imóvel</option>
                        <option value="video">Tour Guiado por Vídeo</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeInterest === 'financiamento' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Simulação Estimada de Financiamento
                    </span>
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                      Taxa estimada ~10.5% a.a.
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-600">Entrada: {downPaymentPercent}%</span>
                      <span className="font-bold text-slate-900">{formatBRL(downPaymentValue)}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Prazo de Pagamento
                      </label>
                      <select
                        value={termMonths}
                        onChange={(e) => setTermMonths(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option value={120}>10 anos (120 meses)</option>
                        <option value={240}>20 anos (240 meses)</option>
                        <option value={360}>30 anos (360 meses)</option>
                        <option value={420}>35 anos (420 meses)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Banco Preferido
                      </label>
                      <select
                        value={bankPreference}
                        onChange={(e) => setBankPreference(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option>Caixa Econômica Federal</option>
                        <option>Itaú Personnalité</option>
                        <option>Bradesco Prime</option>
                        <option>Santander Select</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Parcela Inicial Estimada</span>
                      <span className="text-xs text-slate-400">Saldo a financiar: {formatBRL(loanAmount)}</span>
                    </div>
                    <span className="text-lg font-bold text-indigo-900">
                      {formatBRL(estimatedInstallment)}/mês*
                    </span>
                  </div>
                </div>
              )}

              {activeInterest === 'investimento' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                    Estimativa de Rentabilidade e Aluguel
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Projeção Aluguel/mês</span>
                      <span className="text-base font-bold text-emerald-700">{formatBRL(property.rentalEstimate || 4000)}</span>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Cap Rate Estimado</span>
                      <span className="text-base font-bold text-indigo-900">{property.investmentYieldEstimate || '6.0% a.a.'}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    A região da {property.neighborhood} possui alta demanda de locação residencial por sua proximidade com polos comerciais, estações de metrô e alta valorização do m².
                  </p>
                </div>
              )}

              {activeInterest === 'material' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
                  <span className="font-bold text-slate-800 uppercase tracking-wide block">
                    Itens Inclusos no Envio:
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Book digital em alta resolução com fotos completas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Planta arquitetônica com dimensões detalhadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Quadro de custos (IPTU, condomínio e simulação bancária)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Lead Contact Details */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Seus Dados para Contato
                </span>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      WhatsApp / Telefone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      E-mail *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mensagem ou Dúvida Específica (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Gostaria de saber mais sobre..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-slate-900 hover:bg-indigo-900 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registrando...' : 'Confirmar Envio de Interesse'}</span>
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Imediato</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="p-8 sm:p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              Solicitação Registrada com Sucesso!
            </h3>

            <p className="text-sm text-slate-600 max-w-md">
              Agradecemos seu interesse no imóvel <strong>{property.name}</strong> ({property.neighborhood}). Nossa equipe de especialistas entrará em contato em instantes através do seu telefone.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl w-full max-w-md text-left text-xs text-slate-700 space-y-1">
              <div><strong>Imóvel:</strong> {property.name} - {formatBRL(property.price)}</div>
              <div><strong>Interesse:</strong> {INTEREST_OPTIONS.find(o => o.id === activeInterest)?.title}</div>
              <div><strong>Contato:</strong> {name} ({phone})</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp Agora</span>
              </a>

              <button
                onClick={onClose}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
