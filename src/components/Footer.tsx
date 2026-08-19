import React from 'react';
import { ShieldCheck, Phone, MessageCircle, ExternalLink, MapPin } from 'lucide-react';
import { Property } from '../types';

interface FooterProps {
  properties: Property[];
}

export const Footer: React.FC<FooterProps> = ({ properties }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-xs">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rotate-45"></div>
              </div>
              <span className="text-lg font-black tracking-tight text-indigo-950 uppercase">
                MOVA <span className="text-indigo-600">IMÓVEIS</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Curadoria imobiliária MOVA especializada nos melhores endereços da Zona Leste de São Paulo: Mooca, Tatuapé e Vila Ema.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>CRECI 12345-J • São Paulo - SP</span>
            </div>
          </div>

          {/* Direct Listing Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Empreendimentos em Destaque
            </h4>
            <ul className="space-y-2">
              {properties.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.vivaRealUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors group"
                  >
                    <span className="font-medium text-slate-800 group-hover:text-indigo-600">
                      {p.neighborhood} ({p.area}m²)
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
                  </a>
                  <span className="text-[10px] text-slate-400 block">{p.badge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interest Forms Quick Access */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Formulários de Interesse
            </h4>
            <ul className="space-y-2 text-xs">
              {properties.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors text-slate-700 font-medium group"
                  >
                    <span>Formulário {p.neighborhood} ({p.area}m²)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Plantão de Atendimento
            </h4>
            <p className="text-xs text-slate-500">
              Segunda a Sábado: 08:30 às 19:30<br />
              Domingos e Feriados: 09:00 às 16:00
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <a
                href="https://wa.me/5511992900266"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: (11) 99290-0266</span>
              </a>
              <a
                href="tel:11992900266"
                className="inline-flex items-center gap-2 text-indigo-900 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-indigo-700" />
                <span>Telefone: (11) 99290-0266</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-14 bg-slate-50 border-t border-slate-200 flex items-center justify-center text-[11px] text-slate-400 uppercase tracking-widest px-4 sm:px-10 text-center">
        <span>&copy; {new Date().getFullYear()} MOVA Imóveis • CRECI 12345-J • Anúncios integrados via VivaReal • São Paulo, SP</span>
      </div>
    </footer>
  );
};
