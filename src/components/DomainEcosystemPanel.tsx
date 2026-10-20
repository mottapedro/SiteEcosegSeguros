import React, { useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Scale,
  FileText,
  Lock,
  Globe,
  Database,
  Users,
  Presentation,
  ArrowRight,
  Code2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  BookOpen,
  Briefcase,
  Phone,
  Sparkles,
  Check,
  ShieldCheck,
} from "lucide-react";
import {
  NORMAS_JURIDICAS_GOVERNADAS,
  LACUNAS_PROTECAO_MILITAR,
  CATEGORIAS_SOLUCAO_PRIVADA,
  ROTEIRO_PALESTRA_CTA,
} from "../domain/military-family/data";
import { PRODUTOS_SOLUCOES_ECOSEG } from "../domain/military-family/products";

interface DomainEcosystemPanelProps {
  onOpenDoc?: (docPath: string) => void;
}

type DomainSubTab = "produtos" | "matriz" | "fronteira" | "militar" | "palestra" | "lgpd";

export const DomainEcosystemPanel: React.FC<DomainEcosystemPanelProps> = ({
  onOpenDoc,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    "produtos" | "matriz" | "fronteira" | "militar" | "palestra" | "lgpd"
  >("produtos");
  const [selectedPartnerFilter, setSelectedPartnerFilter] = useState<string>("Todos");
  const [expandedProblem, setExpandedProblem] = useState<number | null>(null);

  const problemas = [
    {
      id: 1,
      titulo: "Navegação promete páginas que não existem",
      status: "Mapeado para V1",
      impacto: "Alto - Quebra de experiência",
      detalhes:
        "Rotas como /empresa, /servicos, /blog anunciadas no menu sem rotas correspondentes em src/app.",
      resolucao:
        "Poda de rotas estáticas na V1 e priorização de: Home, Palestra CTA, Diagnóstico e Contato.",
    },
    {
      id: 2,
      titulo: "Dados fictícios publicados no site",
      status: "Corrigido no Domínio",
      impacto: "Crítico - Quebra de credibilidade",
      detalhes:
        "Telefone (+55 11 0000-0000) e WhatsApp apontando para São Paulo enquanto a operação é no RJ (CTA).",
      resolucao:
        "Substituição no siteConfig e nos componentes pelo telefone e WhatsApp oficial (21) 99469-3673, e-mail ecoseg@yahoo.com e praça Rio de Janeiro / CTA.",
    },
    {
      id: 3,
      titulo: "Home apresenta produto antes de demonstrar a dor",
      status: "Reestruturado",
      impacto: "Alto - Filosofia de Marca",
      detalhes:
        "Sequência genérica (Hero → Produtos → Diferenciais) viola a ordem: Contexto → Compreensão → Lacuna → Decisão → Proteção.",
      resolucao:
        "Reordenamento da Home da palestra: Expectativa Militar → Mudança Jurídica → Lacuna → Diagnóstico → Solução.",
    },
    {
      id: 4,
      titulo: "Contradição visual: ícone de escudo (ShieldCheck)",
      status: "Resolvido (ADR-B-001)",
      impacto: "Médio - Consistência de Marca",
      detalhes:
        "ADR-B-001 veta escudos/cadeados. O logotipo representa compreensão e estrutura de horizonte.",
      resolucao:
        "Aplicação da EcoSegLogo oficial com acabamento Latão Nobre no Header e Footer.",
    },
    {
      id: 5,
      titulo: "Novo domínio militar inexistente na arquitetura",
      status: "Implementado em src/domain",
      impacto: "Crítico - Modelo de Negócio",
      detalhes:
        "O sistema só conhecia seguros corporativos, sem modelos para Leis, Artigos, Militares e Lacunas.",
      resolucao:
        "Criação dos tipos formais e banco de dados de domínio em src/domain/military-family/.",
    },
    {
      id: 6,
      titulo: "Formulário ainda não adequado à LGPD",
      status: "Contrato Neutro Criado",
      impacto: "Crítico - Risco Regulatório",
      detalhes:
        "Coleta de dados sem finalidade, base legal ou rastreabilidade de consentimento.",
      resolucao:
        "Implementação de consentimento explícito fundamentado no Art. 7º V/IX da Lei 13.709/2018.",
    },
    {
      id: 7,
      titulo: "Acoplamento arquitetural pontual",
      status: "Desacoplado",
      impacto: "Médio - Manutenibilidade",
      detalhes: "services/email importava tipos diretamente de features/contact-form.",
      resolucao:
        "Contrato neutro LeadDiagnosticoPublicoContract isolado na camada de domínio.",
    },
    {
      id: 8,
      titulo: "Proteções operacionais provisórias",
      status: "Fronteira Delimitada",
      impacto: "Alto - Segurança & Escala",
      detalhes:
        "Rate limit em memória no Vercel serverless e ausência de banco de dados persistente.",
      resolucao:
        "Delimitação da fronteira: Site público leve na Vercel e motor confidencial na Cyborg Intelligence.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Principal de Intenção do Sistema */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/20 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Cpu className="h-3.5 w-3.5 text-amber-400" />
              <span>Intenção Estratégica do Ecossistema ECOSEG</span>
            </div>
            <h2 className="text-xl font-bold tracking-wide text-white sm:text-2xl">
              Transição: Corretora Genérica → Plataforma Consultiva Governada
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-300">
              O ecossistema foi reorganizado para acomodar a tese consultiva validada com
              João no Clube dos Taifeiros (CTA-RJ):
              <strong> Compreensão do contexto militar</strong>, fundamentação na{" "}
              <strong>Lei nº 13.954/2019</strong> e separação estrita entre o site público
              e a plataforma privada SaaS da <strong>Cyborg Tecnologia</strong>.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3 lg:flex-col">
            {onOpenDoc && (
              <button
                onClick={() => onOpenDoc("domain/ecoseg-domain-ecosystem-intent.md")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-semibold text-neutral-950 shadow-md transition-colors hover:bg-amber-400"
              >
                <BookOpen className="h-4 w-4" />
                <span>Ler Documento de Intenção</span>
              </button>
            )}
            {onOpenDoc && (
              <button
                onClick={() =>
                  onOpenDoc("adr/0005-ecoseg-public-site-cyborg-consulting-platform.md")
                }
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-200 transition-colors hover:bg-neutral-700"
              >
                <FileText className="h-4 w-4 text-amber-400" />
                <span>ADR 0005 (Site vs SaaS)</span>
              </button>
            )}
            {onOpenDoc && (
              <button
                onClick={() =>
                  onOpenDoc("adr/0007-cyborg-intelligence-saas-core-architecture.md")
                }
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-4 py-2 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/30"
              >
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span>ADR 0007 (Núcleo Cyborg)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Subnavegação do Painel - Carousel Horizontal no Mobile */}
      <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto border-b border-neutral-800 px-4 pb-3 sm:mx-0 sm:flex-wrap sm:px-0">
        {[
          {
            id: "produtos",
            label: "1. Produtos & Soluções (Icatu / GBOEX / MAG)",
            shortLabel: "1. Produtos",
            icon: Briefcase,
          },
          {
            id: "matriz",
            label: "2. Matriz dos 8 Problemas",
            shortLabel: "2. 8 Problemas",
            icon: AlertTriangle,
          },
          {
            id: "fronteira",
            label: "3. Fronteira ECOSEG × Cyborg",
            shortLabel: "3. Fronteira",
            icon: Layers,
          },
          {
            id: "militar",
            label: "4. Domínio Militar & Leis",
            shortLabel: "4. Domínio Militar",
            icon: Scale,
          },
          {
            id: "palestra",
            label: "5. Roteiro da Palestra (CTA)",
            shortLabel: "5. Palestra CTA",
            icon: Presentation,
          },
          { id: "lgpd", label: "6. Governança LGPD", shortLabel: "6. LGPD", icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as DomainSubTab)}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-all active:scale-95 sm:px-3.5 ${
                isActive
                  ? "border border-amber-500/40 bg-amber-500/20 font-semibold text-amber-300 shadow-sm"
                  : "text-neutral-400 hover:bg-neutral-800/60 hover:text-white"
              }`}
            >
              <Icon
                className={`h-3.5 w-3.5 ${isActive ? "text-amber-400" : "text-neutral-500"}`}
              />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* SubTab 0: Produtos & Soluções Privadas (Icatu / GBOEX / MAG) */}
      {activeSubTab === "produtos" && (
        <div className="space-y-6">
          {/* Header e Filtros */}
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <Briefcase className="h-4 w-4 text-amber-400" />
                <span>
                  Opções de Produtos para Suprir Ausências de Direitos (Lei 13.954)
                </span>
              </h3>
              <p className="mt-0.5 text-xs text-neutral-400">
                Soluções homologadas pelas seguradoras parceiras para a família militar e
                planejamento sucessório.
              </p>
            </div>

            <div className="no-scrollbar flex shrink-0 items-center gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:pb-0">
              {[
                "Todos",
                "Icatu Seguros",
                "GBOEX",
                "MAG Seguros",
                "Consultoria Previdenciária",
              ].map((partner) => (
                <button
                  key={partner}
                  onClick={() => setSelectedPartnerFilter(partner)}
                  className={`shrink-0 cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedPartnerFilter === partner
                      ? "bg-amber-400 font-semibold text-neutral-950"
                      : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                  }`}
                >
                  {partner}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Cards de Produtos */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {PRODUTOS_SOLUCOES_ECOSEG.filter(
              (prod) =>
                selectedPartnerFilter === "Todos" ||
                prod.seguradora === selectedPartnerFilter
            ).map((produto) => {
              const partnerBadgeColors: Record<string, string> = {
                "Icatu Seguros":
                  "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                GBOEX: "bg-blue-500/10 text-blue-400 border-blue-500/30",
                "MAG Seguros": "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
                "Consultoria Previdenciária":
                  "bg-amber-500/10 text-amber-400 border-amber-500/30",
              };

              return (
                <div
                  key={produto.id}
                  className="flex flex-col justify-between space-y-4 rounded-2xl border border-neutral-800/90 bg-neutral-900/70 p-5 shadow-lg transition-all hover:border-amber-500/40"
                >
                  <div className="space-y-3">
                    {/* Header do Card */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                            partnerBadgeColors[produto.seguradora] ||
                            "bg-neutral-800 text-neutral-300"
                          }`}
                        >
                          {produto.seguradora}
                        </span>
                        {["Icatu Seguros", "MAG Seguros", "GBOEX"].includes(
                          produto.seguradora
                        ) && (
                          <span className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
                            API Conectada
                          </span>
                        )}
                      </div>
                      {produto.processoSusep && (
                        <span className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 font-mono text-[10px] text-neutral-500">
                          SUSEP {produto.processoSusep}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-bold tracking-wide text-white">
                        {produto.nome}
                      </h4>
                      <p className="mt-0.5 text-xs leading-snug font-medium text-amber-300/90">
                        {produto.subtitulo}
                      </p>
                    </div>

                    <p className="text-xs leading-relaxed text-neutral-300">
                      {produto.descricao}
                    </p>

                    {/* Vantagem Sucessória / Jurídica em destaque */}
                    <div className="space-y-1 rounded-xl border border-amber-500/20 bg-neutral-950 p-3 text-xs">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-amber-400 uppercase">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Vantagem Sucessória & Anti-Inventário</span>
                      </div>
                      <p className="text-xs leading-relaxed text-neutral-300">
                        {produto.vantagemSucessoria}
                      </p>
                    </div>

                    {/* Lista de Destaques Técnicos */}
                    <div className="space-y-1.5 pt-1">
                      <span className="block font-mono text-[10px] tracking-wider text-neutral-400 uppercase">
                        Diferenciais do Plano:
                      </span>
                      <ul className="space-y-1 text-xs text-neutral-300">
                        {produto.destaques.slice(0, 4).map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Rodapé do Card com CTA WhatsApp */}
                  <div className="flex flex-col justify-between gap-3 border-t border-neutral-800/80 pt-3 sm:flex-row sm:items-center">
                    <div className="text-[11px] text-neutral-400">
                      <span>Consultoria EcoSeg · Rio de Janeiro / CTA</span>
                    </div>

                    <a
                      href={`https://wa.me/5521994693673?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20${encodeURIComponent(
                        produto.nome
                      )}%20para%20a%20fam%C3%ADlia%20militar.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-neutral-950 px-3.5 py-2 text-xs font-semibold text-amber-300 shadow-sm transition-all hover:border-amber-400 hover:bg-neutral-800"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-400 transition-transform group-hover:scale-110" />
                      <span>Cotar pelo WhatsApp (21) 99469-3673</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SubTab 1: Matriz dos 8 Problemas Prioritários */}
      {activeSubTab === "matriz" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1 text-xs text-neutral-400">
            <span>Diagnóstico Arquitetural Registrado</span>
            <span className="font-mono text-amber-400">
              8/8 problemas endereçados no domínio
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {problemas.map((p) => {
              const isExpanded = expandedProblem === p.id;
              return (
                <div
                  key={p.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 transition-all hover:border-neutral-700"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 font-mono text-[11px] font-bold text-amber-400">
                        {p.id}
                      </span>
                      <div>
                        <h4 className="text-xs leading-tight font-semibold text-white">
                          {p.titulo}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-[10px]">
                          <span className="text-neutral-400">{p.impacto}</span>
                          <span>·</span>
                          <span className="font-medium text-emerald-400">{p.status}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedProblem(isExpanded ? null : p.id)}
                      className="cursor-pointer p-1 text-neutral-400 hover:text-white"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 space-y-2 border-t border-neutral-800/80 pt-3 text-xs">
                      <div>
                        <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
                          Causa Raiz:
                        </span>
                        <p className="mt-0.5 text-neutral-300">{p.detalhes}</p>
                      </div>
                      <div className="rounded border border-neutral-800 bg-neutral-950/80 p-2">
                        <span className="font-mono text-[10px] tracking-wider text-amber-400/90 uppercase">
                          Diretriz de Domínio:
                        </span>
                        <p className="mt-0.5 text-neutral-200">{p.resolucao}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SubTab 2: Fronteira ECOSEG × Cyborg Intelligence */}
      {activeSubTab === "fronteira" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Superfície Pública: ECOSEG */}
          <div className="space-y-4 rounded-xl border border-blue-500/30 bg-neutral-900/60 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-blue-400">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  ECOSEG — Superfície Pública
                </h3>
                <p className="text-xs text-neutral-400">
                  Repositório `SiteEcosegSeguros` (Next.js 16 / Vercel)
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span>Identidade e posicionamento institucional de autoridade</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span>Página do evento / Palestra no Clube dos Taifeiros (CTA-RJ)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span>Modo Apresentação do Palestrante com notas de palco</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span>Simulador de Lacunas de baixa sensibilidade para o público</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span>Consentimento explícito e aviso de privacidade LGPD</span>
              </li>
            </ul>

            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-[11px] text-neutral-400">
              <strong className="text-neutral-200">Princípio Arquitetural:</strong> Nunca
              armazena dados de saúde, prontuários ou regras comerciais reutilizáveis por
              terceiros.
            </div>
          </div>

          {/* Plataforma Privada: Cyborg Intelligence */}
          <div className="space-y-4 rounded-xl border border-amber-500/30 bg-neutral-900/60 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-amber-400">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Cyborg Intelligence — SaaS B2B Privado
                </h3>
                <p className="text-xs text-neutral-400">
                  Repositório Privado (Propriedade Cyborg Tecnologia)
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>Motor determinístico de aderência e recomendação de apólices</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>Base jurídica completa versionada com jurisprudência militar</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>Prontuário consultivo familiar confidencial com auditoria</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>Autenticação, RBAC e gestão de organizações e consultores</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>API comercial para futuras corretoras parceiras</span>
              </li>
            </ul>

            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-[11px] text-neutral-400">
              <strong className="text-neutral-200">Propriedade Intelectual:</strong> A
              ECOSEG é cliente piloto e ambiente de validação; a propriedade do motor
              pertence à Cyborg Tecnologia.
            </div>

            {onOpenDoc && (
              <button
                onClick={() =>
                  onOpenDoc("adr/0007-cyborg-intelligence-saas-core-architecture.md")
                }
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/20 px-3 py-2.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/30"
              >
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span>Explorar Arquitetura do SaaS (ADR 0007)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* SubTab 3: Domínio Militar & Leis Governadas */}
      {activeSubTab === "militar" && (
        <div className="space-y-6">
          {/* Normas Jurídicas */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Scale className="h-4 w-4 text-amber-400" />
              <span>Normas Jurídicas Governadas no Código</span>
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {NORMAS_JURIDICAS_GOVERNADAS.map((norma) => (
                <div
                  key={norma.id}
                  className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-amber-400">
                      {norma.codigo}
                    </span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 uppercase">
                      {norma.statusValidacao}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {norma.lei} — {norma.artigo}
                    </h4>
                    <p className="mt-0.5 text-[11px] text-neutral-400">
                      {norma.vigencia}
                    </p>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="rounded border border-neutral-800 bg-neutral-950 p-2 text-neutral-300">
                      <strong className="block text-[10px] text-neutral-400 uppercase">
                        Regra Anterior:
                      </strong>
                      {norma.regraAnterior}
                    </div>
                    <div className="rounded border border-amber-900/30 bg-neutral-950 p-2 text-amber-200/90">
                      <strong className="block text-[10px] text-amber-400 uppercase">
                        Regra Atual pós-13.954:
                      </strong>
                      {norma.regraAtual}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lacunas vs Soluções */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Lacunas Mapeadas vs Soluções Privadas Complementares</span>
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {LACUNAS_PROTECAO_MILITAR.map((lacuna) => (
                <div
                  key={lacuna.id}
                  className="flex flex-col justify-between space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/70 p-4"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
                      <span className="font-semibold text-red-400 uppercase">
                        Severidade {lacuna.severidade}
                      </span>
                      <span className="font-bold text-amber-400">
                        -{lacuna.percentualPerdaRenda}% Renda
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{lacuna.titulo}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                      {lacuna.descricaoCurta}
                    </p>
                  </div>
                  <div className="border-t border-neutral-800 pt-3">
                    <span className="block font-mono text-[10px] text-neutral-500 uppercase">
                      Solução Recomendada:
                    </span>
                    <span className="text-xs font-medium text-amber-300">
                      Seguro Resgatável / Fundo de Liquidez
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Roteiro Narrativo da Palestra CTA */}
      {activeSubTab === "palestra" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1 text-xs text-neutral-400">
            <span>
              Roteiro de Palco do Palestrante João (Clube dos Taifeiros / CTA-RJ)
            </span>
            <span className="font-mono text-amber-400">6 Fases Narrativas</span>
          </div>

          <div className="space-y-3">
            {ROTEIRO_PALESTRA_CTA.map((bloco) => (
              <div
                key={bloco.ordem}
                className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 md:flex-row md:items-center"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 font-mono text-xs font-bold text-amber-400">
                    0{bloco.ordem}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-amber-400/80 uppercase">
                        {bloco.fase}
                      </span>
                      <span className="font-mono text-xs text-neutral-400">
                        ~{bloco.tempoSugeridoMinutos} min
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{bloco.tituloSlide}</h4>
                    <p className="text-xs text-neutral-300 italic">
                      &ldquo;{bloco.ganchoEmocional}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="shrink-0 space-y-1 pl-10 md:pl-0 md:text-right">
                  <span className="block font-mono text-[10px] text-neutral-500 uppercase">
                    Ação do Público no Site:
                  </span>
                  <span className="inline-block rounded bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                    {bloco.acaoPublicoNoSite}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 5: Governança LGPD */}
      {activeSubTab === "lgpd" && (
        <div className="space-y-5 rounded-xl border border-neutral-800 bg-neutral-900/70 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Governança & Adequação à LGPD (Lei nº 13.709/2018)
              </h3>
              <p className="text-xs text-neutral-400">
                Resolução do Ponto 6: Coleta Minimizada e Consentimento Transparente
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
            <div className="space-y-2 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
              <h4 className="font-semibold text-white">Fundamento Legal Específico</h4>
              <p className="leading-relaxed text-neutral-300">
                Coleta com base no <strong>Artigo 7º, Inciso V</strong> da LGPD
                (procedimentos preliminares relacionados a contrato a pedido do titular) e{" "}
                <strong>Artigo 7º, Inciso IX</strong> (legítimo interesse do controlador
                na prevenção de desamparo familiar militar).
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
              <h4 className="font-semibold text-white">Regra de Minimização de Dados</h4>
              <p className="leading-relaxed text-neutral-300">
                Na superfície pública são coletados apenas: Força, Posto/Graduação,
                situação de dependência de filhas e faixa de renda. Nenhum dado bancário,
                prontuário médico ou documento de identificação (RG/CPF) é solicitado no
                site público.
              </p>
            </div>
          </div>

          <div className="space-y-1 rounded-lg border border-amber-900/30 bg-neutral-950 p-4 text-xs text-neutral-300">
            <span className="block font-mono text-[11px] font-semibold text-amber-400 uppercase">
              Contrato de Domínio Neutro:
            </span>
            <code className="font-mono text-[11px] text-neutral-400">
              LeadDiagnosticoPublicoContract com ConsentimentoLGPD versionado
              (src/domain/military-family/types.ts)
            </code>
          </div>
        </div>
      )}
    </div>
  );
};
