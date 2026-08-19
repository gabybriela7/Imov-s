import React from 'react';
import { Phone, MessageCircle, ShieldCheck, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenGeneralContact: () => void;
  activeFilter?: string;
  onSelectNeighborhood?: (neighborhood: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGeneralContact,
  activeFilter,
  onSelectNeighborhood
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 transition-all">
      {/* Top micro-bar for trust & location */}
      <div className="bg-slate-900 text-slate-300 text-[11px] font-medium py-1.5 px-4 sm:px-10 flex justify-between items-center tracking-wider uppercase border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Oportunidades Selecionadas • Zona Leste, São Paulo - SP</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            CRECI 12345-J • Imóveis Verificados
          </span>
          <span>•</span>
          <span>Atendimento Personalizado</span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="h-20 flex items-center justify-between px-4 sm:px-10 max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 bg-indigo-900 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-800 transition-colors">
            <div className="w-5 h-5 border-2 border-white rotate-45 transform transition-transform group-hover:rotate-90"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-indigo-950 uppercase font-sans">
              MOVA <span className="text-indigo-600 font-extrabold">IMÓVEIS</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold -mt-1">
              Zona Leste • São Paulo
            </span>
          </div>
        </a>

        {/* Neighborhood Quick Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectNeighborhood && onSelectNeighborhood('TODOS')}
            className={`pb-1 transition-colors ${
              !activeFilter || activeFilter === 'TODOS'
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                : 'hover:text-indigo-600'
            }`}
          >
            Todos os Imóveis
          </button>
          <button
            onClick={() => onSelectNeighborhood && onSelectNeighborhood('Mooca')}
            className={`pb-1 transition-colors flex items-center gap-1 ${
              activeFilter === 'Mooca'
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                : 'hover:text-indigo-600'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            Mooca
          </button>
          <button
            onClick={() => onSelectNeighborhood && onSelectNeighborhood('Tatuapé')}
            className={`pb-1 transition-colors flex items-center gap-1 ${
              activeFilter === 'Tatuapé'
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                : 'hover:text-indigo-600'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            Tatuapé
          </button>
          <button
            onClick={() => onSelectNeighborhood && onSelectNeighborhood('Vila Ema')}
            className={`pb-1 transition-colors flex items-center gap-1 ${
              activeFilter === 'Vila Ema'
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                : 'hover:text-indigo-600'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            Vila Ema
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/5511992900266?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20im%C3%B3veis%20da%20MOVA%20na%20Zona%20Leste"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Plantão</span>
          </a>

          <a
            href="tel:11992900266"
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-indigo-600" />
            <span>(11) 99290-0266</span>
          </a>
        </div>
      </div>
    </header>
  );
};
