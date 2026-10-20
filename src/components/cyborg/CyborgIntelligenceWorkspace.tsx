"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Shield,
  Layers,
  Scale,
  FileText,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Printer,
  Copy,
  Check,
  Building,
  RefreshCw,
  Search,
  Filter,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Send,
  Sliders,
  DollarSign,
  HeartHandshake,
  Download,
  X,
  BookmarkPlus,
  Terminal,
  FolderArchive,
  ArrowDownToLine,
  Zap,
  Radio,
  Globe,
  Server,
  Activity,
  CheckCheck,
  Key,
  Lock,
  ShieldCheck,
  Code2,
  Eye,
  EyeOff,
  RotateCcw,
  KeyRound,
  Fingerprint,
  Gauge,
  ShieldAlert,
} from "lucide-react";
import { AudienceProfileEntity } from "../../domain/cyborg-platform/schema";
import {
  evaluateCyborgAdherence,
  AdherenceEngineResult,
} from "../../domain/cyborg-platform/adherenceEngine";
import {
  ORG_ECOSEG_PILOT,
  CONSULTANT_JOAO_BRITO,
  SEEDED_DOSSIERS,
  ActiveConsultationDossier,
} from "../../domain/cyborg-platform/consultationStore";
import { NORMAS_JURIDICAS_GOVERNADAS } from "../../domain/military-family/data";
import {
  INSURER_CONNECTORS_CONFIG,
  fetchRealtimeQuote,
  checkInsurerConnectorsHealth,
  generateLocalRealtimeQuote,
} from "../../services/insuranceApiService";
import {
  RealtimeQuoteResponse,
  InsurerConnectorConfig,
  InsurerHealthCheck,
  InsurerId,
} from "../../domain/contracts/insurance-api-connectors";
import { CyborgLicenseService } from "../../services/cyborgLicenseService";
import {
  CyborgLicense,
  CyborgApiKey,
  ValidateCredentialResponse,
  LeadIngestionResponse,
  ApiKeyEnvironment,
  ApiPermissionScope,
} from "../../domain/contracts/cyborg-license-credentials";

type WorkspaceTab =
  | "simulador"
  | "dossies"
  | "regras"
  | "api"
  | "sync-local"
  | "conectores-api"
  | "credenciais-licenca";
type MilitaryBranch = AudienceProfileEntity["militaryBranch"];
type MilitaryStatus = AudienceProfileEntity["militaryStatus"];

export const CyborgIntelligenceWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("simulador");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Estados de Licenciamento & Credenciais de API B2B
  const [licenseData, setLicenseData] = useState<CyborgLicense>(() =>
    CyborgLicenseService.getLicense()
  );
  const [activeToken, setActiveTokenState] = useState<string>(() =>
    CyborgLicenseService.getActiveToken()
  );
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [rotatingKeyId, setRotatingKeyId] = useState<string | null>(null);
  const [rotateSuccessKeyId, setRotateSuccessKeyId] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [testTokenInput, setTestTokenInput] = useState<string>(() =>
    CyborgLicenseService.getActiveToken()
  );
  const [isValidatingToken, setIsValidatingToken] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidateCredentialResponse | null>(null);
  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
  const [newKeyLabel, setNewKeyLabel] = useState("");
  const [newKeyEnv, setNewKeyEnv] = useState<ApiKeyEnvironment>("sandbox");
  const [newKeyScopes, setNewKeyScopes] = useState<ApiPermissionScope[]>([
    "leads:ingest",
    "quotes:realtime",
  ]);
  const [leadTestName, setLeadTestName] = useState("Suboficial Marcos Vinícius");
  const [leadTestPhone, setLeadTestPhone] = useState("(21) 98765-4321");
  const [leadTestRank, setLeadTestRank] = useState("Suboficial");
  const [leadTestBranch, setLeadTestBranch] = useState<"FAB" | "EB" | "MB">("FAB");
  const [leadTestIncome, setLeadTestIncome] = useState(11500);
  const [isIngestingLead, setIsIngestingLead] = useState(false);
  const [leadIngestResult, setLeadIngestResult] = useState<LeadIngestionResponse | null>(
    null
  );

  // Estados de Cotação em Tempo Real via APIs de Seguradoras
  const [isLiveQuoteLoading, setIsLiveQuoteLoading] = useState(false);
  const [activeRealtimeQuote, setActiveRealtimeQuote] =
    useState<RealtimeQuoteResponse | null>(null);
  const [selectedQuoteInsurer, setSelectedQuoteInsurer] = useState<InsurerId>("icatu");
  const [connectorsHealth, setConnectorsHealth] = useState<InsurerHealthCheck[]>([]);
  const [isTestingPing, setIsTestingPing] = useState<string | null>(null);
  const [playgroundInsurer, setPlaygroundInsurer] = useState<InsurerId>("icatu");
  const [playgroundCapital, setPlaygroundCapital] = useState<number>(500000);
  const [playgroundResult, setPlaygroundResult] = useState<RealtimeQuoteResponse | null>(
    null
  );
  const [isPlayingGroundLoading, setIsPlaygroundLoading] = useState(false);
  const [showPayloadModal, setShowPayloadModal] = useState(false);
  const [payloadModalData, setPayloadModalData] = useState<RealtimeQuoteResponse | null>(
    null
  );

  useEffect(() => {
    checkInsurerConnectorsHealth().then(setConnectorsHealth);
  }, []);

  const handleDownloadTarball = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch("/api/download-bundle");
      if (!res.ok) throw new Error("Erro ao baixar pacote");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ecoseg-cyborg-local-bundle.tar.gz";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (e) {
      console.error(e);
      window.location.href = "/api/download-bundle";
    } finally {
      setIsDownloading(false);
    }
  };

  // Disparo de Cotação em Tempo Real para o Perfil Atual
  const handleExecuteLiveQuote = async (insurerId: InsurerId = selectedQuoteInsurer) => {
    try {
      setIsLiveQuoteLoading(true);
      const estimatedAge = 42;
      const capital = currentProfile.grossIncome > 8000 ? 750000 : 500000;
      const quote = await fetchRealtimeQuote({
        profileId: currentProfile.id,
        militaryRank: currentProfile.rankCategory,
        militaryBranch: currentProfile.militaryBranch,
        militaryStatus: currentProfile.militaryStatus,
        age: estimatedAge,
        gender: "M",
        grossIncome: currentProfile.grossIncome,
        requestedCoverage: {
          productId:
            insurerId === "mag"
              ? "prod-mag-vida-militar"
              : insurerId === "gboex"
                ? "prod-gboex-forca-ativa-resgatavel"
                : "prod-icatu-equilibrio",
          productName:
            insurerId === "mag"
              ? "MAG Vida Militar"
              : insurerId === "gboex"
                ? "GBOEX Força Ativa Resgatável"
                : "Icatu Equilíbrio Whole Life",
          insurerId,
          insuredCapital: capital,
        },
      });
      setActiveRealtimeQuote(quote);
    } catch (err) {
      console.error("Erro na cotação ao vivo:", err);
    } finally {
      setIsLiveQuoteLoading(false);
    }
  };

  // Disparo de Teste no Playground da Sub-aba 6
  const handleRunPlaygroundQuote = async () => {
    try {
      setIsPlaygroundLoading(true);
      const quote = await fetchRealtimeQuote({
        profileId: "playground-test",
        militaryRank: currentProfile.rankCategory,
        militaryBranch: currentProfile.militaryBranch,
        militaryStatus: currentProfile.militaryStatus,
        age: 42,
        gender: "M",
        grossIncome: currentProfile.grossIncome,
        requestedCoverage: {
          productId: `prod-${playgroundInsurer}-test`,
          productName:
            playgroundInsurer === "mag"
              ? "MAG Vida Militar"
              : playgroundInsurer === "gboex"
                ? "GBOEX Pecúlio Especial"
                : "Icatu Equilíbrio Whole Life",
          insurerId: playgroundInsurer,
          insuredCapital: playgroundCapital,
        },
      });
      setPlaygroundResult(quote);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPlaygroundLoading(false);
    }
  };

  // Teste de Ping / Latência dos Conectores
  const handlePingConnector = async (insurerId: InsurerId) => {
    setIsTestingPing(insurerId);
    await new Promise((r) => setTimeout(r, 450 + Math.random() * 300));
    setConnectorsHealth((prev) =>
      prev.map((c) =>
        c.insurerId === insurerId
          ? {
              ...c,
              latencyMs: Math.floor(95 + Math.random() * 45),
              lastCheckedAt: new Date().toISOString(),
            }
          : c
      )
    );
    setIsTestingPing(null);
  };

  // Estado do perfil em análise no simulador
  const [selectedPresetId, setSelectedPresetId] = useState<string>("preset-01");
  const [currentProfile, setCurrentProfile] = useState<AudienceProfileEntity>({
    id: "sim-profile-01",
    organizationId: ORG_ECOSEG_PILOT.id,
    consultantId: CONSULTANT_JOAO_BRITO.id,
    fullName: "Suboficial R1 Carlos Alberto Menezes",
    phone: "(21) 98452-1190",
    email: "carlos.menezes@cta.org.br",
    militaryBranch: "FAB",
    rankCategory: "Suboficial Taifeiro",
    militaryStatus: "reserva",
    entryYear: 1988,
    grossIncome: 11400,
    netIncome: 8650,
    hasDaughterDeduction1_5: false,
    numberOfDependents: 2,
    hasElderlyInHousehold: true,
    notes:
      "Taifeiro da Aeronáutica, 62 anos. Filha solteira de 26 anos sem opção de 1,5%.",
    createdAt: new Date().toISOString(),
  });

  // Lista de Dossiês ativos
  const [dossiersList, setDossiersList] =
    useState<ActiveConsultationDossier[]>(SEEDED_DOSSIERS);
  const [selectedDossier, setSelectedDossier] =
    useState<ActiveConsultationDossier | null>(SEEDED_DOSSIERS[0]);
  const [dossierFilter, setDossierFilter] = useState<string>("todos");

  // Estado de cópia e emissão
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [isParecerModalOpen, setIsParecerModalOpen] = useState(false);
  const [saveDossierSuccess, setSaveDossierSuccess] = useState(false);

  // Executa o motor determinístico sobre o perfil atual
  const evaluationResult: AdherenceEngineResult = evaluateCyborgAdherence(currentProfile);

  const handleSaveToDossiers = () => {
    const now = new Date();
    const profileId = `prof-cta-${now.getTime()}`;
    const consultationId = `cons-cta-${now.getTime().toString().slice(-4)}`;
    const newDossier: ActiveConsultationDossier = {
      profile: { ...currentProfile, id: profileId },
      consultation: {
        id: consultationId,
        organizationId: ORG_ECOSEG_PILOT.id,
        consultantId: CONSULTANT_JOAO_BRITO.id,
        profileId,
        originEvent: "Simulador Consultivo CTA-RJ",
        status: "motor_aderencia_executado",
        currentStep: 3,
        summaryFindings: evaluationResult.consultantRecommendationsSummary,
        adherenceScoreTotal: evaluationResult.matchedSolutions[0]?.adherenceScore || 95,
        recommendedProductIds: evaluationResult.matchedSolutions.map((s) => s.product.id),
        objectionsHandled: ["Perfil simulado e salvo em tempo real no workspace Cyborg"],
        nextStepsAgreed: "Apresentação presencial da proposta no CTA",
        scheduledFollowUpDate: new Date(
          now.getTime() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      },
      evaluation: evaluationResult,
    };
    setDossiersList([newDossier, ...dossiersList]);
    setSelectedDossier(newDossier);
    setSaveDossierSuccess(true);
    setTimeout(() => setSaveDossierSuccess(false), 3000);
  };

  // Handlers para Governança de Licença e Credenciais de API B2B
  const handleToggleRevealKey = (id: string) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyKey = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleRotateKey = async (keyId: string) => {
    try {
      setRotatingKeyId(keyId);
      try {
        await fetch("/api/cyborg/credentials/rotate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyId }),
        });
      } catch (e) {}

      const updated = CyborgLicenseService.rotateApiKey(keyId);
      setLicenseData(CyborgLicenseService.getLicense());
      setActiveTokenState(CyborgLicenseService.getActiveToken());
      setTestTokenInput(updated.rawKey);
      setRotateSuccessKeyId(keyId);
      setTimeout(() => setRotateSuccessKeyId(null), 3500);
    } catch (err) {
      console.error("Falha ao rotacionar chave:", err);
    } finally {
      setRotatingKeyId(null);
    }
  };

  const handleSelectActiveToken = (rawKey: string) => {
    CyborgLicenseService.setActiveToken(rawKey);
    setActiveTokenState(rawKey);
    setTestTokenInput(rawKey);
  };

  const handleTestToken = async (customToken?: string) => {
    const tokenToTest = customToken || testTokenInput;
    if (!tokenToTest) return;
    try {
      setIsValidatingToken(true);
      const res = await CyborgLicenseService.validateToken(tokenToTest);
      setValidationResult(res);
    } catch (err) {
      console.error("Erro ao validar token:", err);
    } finally {
      setIsValidatingToken(false);
    }
  };

  const handleCreateNewKey = () => {
    if (!newKeyLabel.trim()) return;
    try {
      CyborgLicenseService.createApiKey(newKeyLabel.trim(), newKeyEnv, newKeyScopes);
      setLicenseData(CyborgLicenseService.getLicense());
      setShowCreateKeyModal(false);
      setNewKeyLabel("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestLeadIngestion = async () => {
    try {
      setIsIngestingLead(true);
      const res = await CyborgLicenseService.ingestLead({
        fullName: leadTestName,
        phone: leadTestPhone,
        rankCategory: leadTestRank,
        militaryBranch: leadTestBranch,
        monthlyGrossIncome: leadTestIncome,
        leadSource: "simulador_workspace_cta",
        mainConcern: "pensao_militar_e_blindagem",
      });
      setLeadIngestResult(res);
      setLicenseData(CyborgLicenseService.getLicense());
    } catch (err) {
      console.error(err);
    } finally {
      setIsIngestingLead(false);
    }
  };

  // Manipulador para carregar presets rápidos
  const handleLoadPreset = (presetKey: string) => {
    setSelectedPresetId(presetKey);
    if (presetKey === "preset-01") {
      setCurrentProfile({
        id: "sim-profile-01",
        organizationId: ORG_ECOSEG_PILOT.id,
        consultantId: CONSULTANT_JOAO_BRITO.id,
        fullName: "Suboficial R1 Carlos Alberto Menezes",
        phone: "(21) 98452-1190",
        email: "carlos.menezes@cta.org.br",
        militaryBranch: "FAB",
        rankCategory: "Suboficial Taifeiro",
        militaryStatus: "reserva",
        entryYear: 1988,
        grossIncome: 11400,
        netIncome: 8650,
        hasDaughterDeduction1_5: false,
        numberOfDependents: 2,
        hasElderlyInHousehold: true,
        notes: "Preocupação principal: perda de pensão da filha e confisco de 10,5%.",
        createdAt: new Date().toISOString(),
      });
    } else if (presetKey === "preset-02") {
      setCurrentProfile({
        id: "sim-profile-02",
        organizationId: ORG_ECOSEG_PILOT.id,
        consultantId: CONSULTANT_JOAO_BRITO.id,
        fullName: "D. Elza Soares da Silva",
        phone: "(21) 97123-8840",
        militaryBranch: "FAB",
        rankCategory: "Viúva de 1º Sargento Taifeiro",
        militaryStatus: "pensionista",
        entryYear: 1982,
        grossIncome: 7800,
        netIncome: 5900,
        hasDaughterDeduction1_5: false,
        numberOfDependents: 1,
        hasElderlyInHousehold: true,
        notes:
          "Idosa 71 anos, pensionista, precisa de adaptação domiciliar e prevenção de quedas.",
        createdAt: new Date().toISOString(),
      });
    } else if (presetKey === "preset-03") {
      setCurrentProfile({
        id: "sim-profile-03",
        organizationId: ORG_ECOSEG_PILOT.id,
        consultantId: CONSULTANT_JOAO_BRITO.id,
        fullName: "Capitão Aviador Marcelo Drumond",
        phone: "(21) 99888-4422",
        email: "drumond.marcelo@fab.mil.br",
        militaryBranch: "FAB",
        rankCategory: "Capitão Aviador",
        militaryStatus: "ativa",
        entryYear: 2008,
        grossIncome: 16800,
        netIncome: 12200,
        hasDaughterDeduction1_5: false,
        numberOfDependents: 3,
        hasElderlyInHousehold: false,
        notes:
          "Ingresso pós-2001 (sem pensão de filhas), 2 imóveis em risco de inventário.",
        createdAt: new Date().toISOString(),
      });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(label);
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handlePrintParecer = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Cyborg Intelligence SaaS Private Console */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#060D17] via-[#091524] to-[#0A1A2E] p-6 shadow-2xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-bold tracking-wider text-cyan-300">
                <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                CYBORG INTELLIGENCE · SAAS B2B PRIVADO
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs text-emerald-400">
                Licença Ativa: ECOSEG
              </span>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs text-amber-300">
                Base Jurídica v1.4.2 Homologada
              </span>
            </div>

            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              <span>Workspace de Decisão Consultiva</span>
              <span className="rounded border border-neutral-700 px-2 py-0.5 font-mono text-xs font-normal text-neutral-400">
                ADR 0005 & ADR 0007
              </span>
            </h2>

            <p className="max-w-3xl text-xs leading-relaxed text-neutral-300 sm:text-sm">
              Ambiente restrito da <strong>Cyborg Tecnologia</strong> para a operação da{" "}
              <strong>ECOSEG</strong> no Clube dos Taifeiros (CTA-RJ). Motor
              determinístico de elegibilidade, prontuário confidencial e governança de
              apólices sem dependência de palpites ou alucinações.
            </p>
          </div>

          {/* Identity Metadata Box */}
          <div className="flex shrink-0 flex-col gap-2 rounded-xl border border-neutral-800 bg-[#040810]/80 p-4 text-xs">
            <div className="flex items-center justify-between gap-4 border-b border-neutral-800/80 pb-2">
              <span className="font-mono text-[10px] text-neutral-500 uppercase">
                Organização:
              </span>
              <span className="font-semibold text-white">{ORG_ECOSEG_PILOT.name}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-neutral-800/80 pb-2">
              <span className="font-mono text-[10px] text-neutral-500 uppercase">
                Consultor Responsável:
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-cyan-300">
                <UserCheck className="h-3.5 w-3.5" />
                {CONSULTANT_JOAO_BRITO.name} ({CONSULTANT_JOAO_BRITO.registrationNumber})
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-neutral-500 uppercase">
                Base Operacional:
              </span>
              <span className="font-mono text-neutral-300">
                CTA · Rio de Janeiro (RJ)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Navigation Bar - Horizontal Touch Carousel for Mobile */}
      <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto border-b border-neutral-800 px-4 pb-3 sm:mx-0 sm:flex-wrap sm:px-0">
        {[
          {
            id: "simulador",
            label: "1. Simulador & Motor em Tempo Real",
            shortLabel: "1. Simulador",
            icon: Cpu,
          },
          {
            id: "dossies",
            label: "2. Fila de Dossiês do CTA (Palestra)",
            shortLabel: "2. Dossiês CTA",
            icon: Briefcase,
          },
          {
            id: "regras",
            label: "3. Matriz de Regras & Auditoria Jurídica",
            shortLabel: "3. Regras & STF",
            icon: Scale,
          },
          {
            id: "api",
            label: "4. Contrato de API & Integração Externa",
            shortLabel: "4. API Leads",
            icon: Layers,
          },
          {
            id: "sync-local",
            label: "5. Sincronização Repositório Local",
            shortLabel: "5. Sync Local",
            icon: Terminal,
          },
          {
            id: "conectores-api",
            label: "6. Conectores de APIs de Seguradoras (Tempo Real)",
            shortLabel: "6. APIs Seguradoras",
            icon: Zap,
            highlight: true,
          },
          {
            id: "credenciais-licenca",
            label: "7. Licença B2B & Credenciais de API",
            shortLabel: "7. Licença & API",
            icon: Key,
            highlight: true,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as WorkspaceTab)}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all active:scale-95 sm:px-4 sm:py-2.5 ${
                isActive
                  ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 shadow-sm"
                  : tab.highlight
                    ? "border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:text-white"
                    : "border border-transparent text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${isActive ? "text-cyan-400" : tab.highlight ? "text-cyan-400" : "text-neutral-500"}`}
              />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SIMULADOR & MOTOR DETERMINÍSTICO */}
      {activeTab === "simulador" && (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Coluna Esquerda: Formulário do Perfil Militar (lg:col-span-5) */}
          <div className="space-y-4 lg:col-span-5">
            <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#080E18] p-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">
                    Parâmetros do Militar / Família
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-cyan-400/80">
                  Entrada Segura
                </span>
              </div>

              {/* Presets Rápidos */}
              <div>
                <span className="mb-2 block font-mono text-[11px] text-neutral-400">
                  Carregar Caso Típico da Palestra:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleLoadPreset("preset-01")}
                    className={`cursor-pointer truncate rounded-lg px-2 py-1.5 text-left text-[11px] font-medium transition-colors ${
                      selectedPresetId === "preset-01"
                        ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300"
                        : "border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
                    }`}
                    title="Suboficial R1 (Taifeiro) - 26 anos filha solteira"
                  >
                    1. Taifeiro R1
                  </button>
                  <button
                    onClick={() => handleLoadPreset("preset-02")}
                    className={`cursor-pointer truncate rounded-lg px-2 py-1.5 text-left text-[11px] font-medium transition-colors ${
                      selectedPresetId === "preset-02"
                        ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300"
                        : "border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
                    }`}
                    title="Viúva Pensionista 71 anos - Risco de quedas"
                  >
                    2. Pensionista
                  </button>
                  <button
                    onClick={() => handleLoadPreset("preset-03")}
                    className={`cursor-pointer truncate rounded-lg px-2 py-1.5 text-left text-[11px] font-medium transition-colors ${
                      selectedPresetId === "preset-03"
                        ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300"
                        : "border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
                    }`}
                    title="Capitão da Ativa - Ingresso pós-2001 (Sem pensão filhas)"
                  >
                    3. Oficial Ativa
                  </button>
                </div>
              </div>

              {/* Campos do Formulário */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="mb-1 block font-medium text-neutral-400">
                    Nome do Titular / Militar
                  </label>
                  <input
                    type="text"
                    value={currentProfile.fullName}
                    onChange={(e) =>
                      setCurrentProfile({ ...currentProfile, fullName: e.target.value })
                    }
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block font-medium text-neutral-400">
                      Força Armada
                    </label>
                    <select
                      value={currentProfile.militaryBranch}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          militaryBranch: e.target.value as MilitaryBranch,
                        })
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="FAB">Aeronáutica (FAB)</option>
                      <option value="EXERCITO">Exército Brasileiro</option>
                      <option value="MARINHA">Marinha do Brasil</option>
                      <option value="FORCAS_AUXILIARES">Forças Auxiliares</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block font-medium text-neutral-400">
                      Situação Funcional
                    </label>
                    <select
                      value={currentProfile.militaryStatus}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          militaryStatus: e.target.value as MilitaryStatus,
                        })
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="ativa">Ativa</option>
                      <option value="reserva">Reserva Remunerada</option>
                      <option value="reformado">Reformado</option>
                      <option value="pensionista">Pensionista</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block font-medium text-neutral-400">
                      Posto / Graduação
                    </label>
                    <input
                      type="text"
                      value={currentProfile.rankCategory}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          rankCategory: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-medium text-neutral-400">
                      Ano de Ingresso
                    </label>
                    <input
                      type="number"
                      value={currentProfile.entryYear}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          entryYear: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block font-medium text-neutral-400">
                      Renda Bruta (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={currentProfile.grossIncome}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          grossIncome: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-medium text-neutral-400">
                      Nº Dependentes
                    </label>
                    <input
                      type="number"
                      value={currentProfile.numberOfDependents}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          numberOfDependents: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Toggles Críticos da Lei 13.954 */}
                <div className="space-y-2 border-t border-neutral-800/80 pt-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 p-2 hover:bg-neutral-900">
                    <input
                      type="checkbox"
                      checked={currentProfile.hasDaughterDeduction1_5}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          hasDaughterDeduction1_5: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-neutral-700 bg-neutral-950 text-cyan-500"
                    />
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-neutral-200">
                        Recolhe os 1,5% de Pensão das Filhas (MP 2.215)?
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Se desmarcado, a pensão vitalícia de filhas solteiras está
                        extinta.
                      </span>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 p-2 hover:bg-neutral-900">
                    <input
                      type="checkbox"
                      checked={currentProfile.hasElderlyInHousehold}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          hasElderlyInHousehold: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-neutral-700 bg-neutral-950 text-cyan-500"
                    />
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-neutral-200">
                        Titular ou Dependente com mais de 60 anos na residência?
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Ativa verificação para Master Acidentes Domiciliares & Check-Up
                        Lar.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Laudo Técnico Gerado pelo Motor (lg:col-span-7) */}
          <div className="space-y-5 lg:col-span-7">
            {/* Score de Vulnerabilidade e Cabeçalho do Laudo */}
            <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#080E18] p-5">
              <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                      Laudo de Aderência Determinística Cyborg
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    Processado sem alucinações contra as Leis nº 13.954/2019 e 6.880/1980
                  </p>
                </div>

                <div className="grid w-full grid-cols-2 items-center gap-2 sm:flex sm:w-auto sm:flex-wrap">
                  <button
                    onClick={handleSaveToDossiers}
                    className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:py-1.5 ${
                      saveDossierSuccess
                        ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                        : "border border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800"
                    }`}
                    title="Adicionar este militar diretamente à fila de atendimento do CTA"
                  >
                    {saveDossierSuccess ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <BookmarkPlus className="h-3.5 w-3.5 text-cyan-400" />
                    )}
                    <span>{saveDossierSuccess ? "Salvo!" : "Salvar Fila"}</span>
                  </button>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        evaluationResult.consultantRecommendationsSummary,
                        "summary"
                      )
                    }
                    className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-3 py-2 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/30 sm:py-1.5"
                  >
                    {copiedStatus === "summary" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedStatus === "summary" ? "Copiado!" : "Copiar"}</span>
                  </button>

                  <button
                    onClick={() => setIsParecerModalOpen(true)}
                    className="col-span-2 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-neutral-950 shadow-sm transition-colors hover:bg-amber-400 active:scale-95 sm:col-span-1 sm:py-1.5"
                    title="Emitir Laudo Técnico Executivo oficial para levar à mesa do cliente"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Emitir Laudo CTA</span>
                  </button>
                </div>
              </div>

              {/* Medidor de Vulnerabilidade */}
              <div className="flex flex-col justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 sm:flex-row sm:items-center">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase sm:text-[11px]">
                    Índice de Vulnerabilidade Legal da Família:
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-amber-400">
                      {evaluationResult.overallVulnerabilityScore}%
                    </span>
                    <div className="h-2.5 max-w-[140px] flex-1 overflow-hidden rounded-full bg-neutral-800 sm:w-32">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-rose-500"
                        style={{
                          width: `${evaluationResult.overallVulnerabilityScore}%`,
                        }}
                      />
                    </div>
                    <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-300 uppercase sm:text-xs">
                      {evaluationResult.overallVulnerabilityScore > 80
                        ? "CRÍTICO"
                        : "ELEVADO"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-800/80 pt-2.5 sm:block sm:border-t-0 sm:border-l sm:border-neutral-800 sm:pt-0 sm:pl-4 sm:text-right">
                  <span className="block font-mono text-[10px] text-neutral-400 sm:text-[11px]">
                    Lacunas Mapeadas:
                  </span>
                  <span className="font-mono text-sm font-bold text-white sm:text-base">
                    {evaluationResult.identifiedGapsCount} ausências de direitos
                  </span>
                </div>
              </div>

              {/* Lista das Lacunas Identificadas - Responsivo com título em largura total (Anti-Cramping) */}
              <div className="space-y-2">
                <span className="block font-mono text-[11px] font-semibold text-neutral-400 uppercase">
                  Lacunas de Direito Identificadas no Perfil:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {evaluationResult.identifiedGaps.map((g) => (
                    <div
                      key={g.code}
                      className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-950/80 p-3.5 text-xs transition-colors hover:border-neutral-700"
                    >
                      {/* Top Row: Code Badge + Income Impact Pill */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                          {g.code}
                        </span>
                        <span className="inline-flex items-center rounded-md border border-rose-500/30 bg-rose-500/15 px-2 py-0.5 text-right font-mono text-[10px] font-bold text-rose-300 sm:text-[11px]">
                          {g.incomeImpact}
                        </span>
                      </div>

                      {/* Title full-width sem quebras artificiais de uma palavra por linha */}
                      <h4 className="text-xs leading-snug font-bold text-white sm:text-sm">
                        {g.title}
                      </h4>

                      {/* Summary Description */}
                      <p className="text-[11px] leading-relaxed text-neutral-300 sm:text-xs">
                        {g.summary}
                      </p>

                      {/* Legal Basis Footer */}
                      <div className="flex items-center justify-between border-t border-neutral-900 pt-1.5 text-[10px]">
                        <span className="font-mono text-cyan-400/90">
                          Base Legal: {g.legalBasis}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HUB DE COTAÇÃO EM TEMPO REAL VIA API (Icatu / MAG / GBOEX / Open Insurance) */}
              <div className="space-y-4 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-[#061220] via-[#091829] to-[#040D17] p-4 shadow-xl sm:p-5">
                <div className="flex flex-col justify-between gap-3 border-b border-neutral-800/80 pb-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/20 p-2 text-cyan-300">
                      <Zap className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                          <span>Cotação em Tempo Real via APIs de Seguradoras</span>
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                            LIVE
                          </span>
                        </h4>
                      </div>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        Conexão direta aos gateways Icatu, MAG e GBOEX com protocolo SUSEP
                        e garantia de preço de 15 a 30 dias.
                      </p>
                    </div>
                  </div>

                  {/* Seletor Rápido de Seguradora */}
                  <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-1 text-xs">
                    {[
                      { id: "icatu", label: "Icatu Seguros" },
                      { id: "mag", label: "MAG Seguros" },
                      { id: "gboex", label: "GBOEX Militar" },
                    ].map((ins) => (
                      <button
                        key={ins.id}
                        onClick={() => {
                          setSelectedQuoteInsurer(ins.id as InsurerId);
                          handleExecuteLiveQuote(ins.id as InsurerId);
                        }}
                        className={`cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                          selectedQuoteInsurer === ins.id
                            ? "bg-cyan-500 font-bold text-neutral-950 shadow"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                        }`}
                      >
                        {ins.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botão de Disparo e Status */}
                <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Radio
                      className={`h-4 w-4 ${isLiveQuoteLoading ? "animate-spin text-amber-400" : "text-emerald-400"}`}
                    />
                    <span>
                      {isLiveQuoteLoading
                        ? "Consultando webservice da seguradora..."
                        : activeRealtimeQuote
                          ? `Última cotação gerada às ${new Date(activeRealtimeQuote.createdAt).toLocaleTimeString("pt-BR")} (Latência: ${activeRealtimeQuote.securityVerification.apiLatencyMs}ms)`
                          : "Pronto para consultar cotação válida via API"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleExecuteLiveQuote(selectedQuoteInsurer)}
                    disabled={isLiveQuoteLoading}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-neutral-950 shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95 disabled:opacity-50"
                  >
                    {isLiveQuoteLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4" />
                    )}
                    <span>
                      {isLiveQuoteLoading
                        ? "Cotando na Seguradora..."
                        : "⚡ Cotar em Tempo Real via API"}
                    </span>
                  </button>
                </div>

                {/* Card de Cotação Ativa Retornada pela API */}
                {activeRealtimeQuote && (
                  <div className="space-y-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4">
                    <div className="flex flex-col justify-between gap-2 border-b border-emerald-500/20 pb-2.5 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-white sm:text-sm">
                          Cotação Oficial Homologada · {activeRealtimeQuote.insurerName}
                        </span>
                        <span className="rounded border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                          STATUS: 200 OK (VÁLIDA)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-emerald-300">
                          Expira em {activeRealtimeQuote.validityDays} dias (
                          {new Date(activeRealtimeQuote.validUntil).toLocaleDateString(
                            "pt-BR"
                          )}
                          )
                        </span>
                        <button
                          onClick={() => {
                            setPayloadModalData(activeRealtimeQuote);
                            setShowPayloadModal(true);
                          }}
                          className="cursor-pointer rounded border border-cyan-500/40 bg-neutral-900 px-2 py-1 font-mono text-[10px] font-semibold text-cyan-300 hover:bg-neutral-800"
                        >
                          Ver Payload JSON
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                      <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/90 p-2.5">
                        <span className="block font-mono text-[10px] text-neutral-400 uppercase">
                          Protocolo SUSEP:
                        </span>
                        <span
                          className="block truncate font-mono text-[11px] font-bold text-cyan-300"
                          title={activeRealtimeQuote.quoteProtocol}
                        >
                          {activeRealtimeQuote.quoteProtocol}
                        </span>
                      </div>
                      <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/90 p-2.5">
                        <span className="block font-mono text-[10px] text-neutral-400 uppercase">
                          Prêmio Mensal Bruto:
                        </span>
                        <span className="font-mono text-sm font-bold text-emerald-400">
                          R${" "}
                          {activeRealtimeQuote.pricing.grossMonthlyPremium.toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 }
                          )}
                        </span>
                        <span className="block text-[9px] text-neutral-500">
                          (inclui IOF R${" "}
                          {activeRealtimeQuote.pricing.taxesIOFMonthly.toFixed(2)})
                        </span>
                      </div>
                      <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/90 p-2.5">
                        <span className="block font-mono text-[10px] text-neutral-400 uppercase">
                          Tábua Biométrica:
                        </span>
                        <span
                          className="block truncate font-mono text-[10px] text-white"
                          title={activeRealtimeQuote.actuarialDetails.biometricTable}
                        >
                          {activeRealtimeQuote.actuarialDetails.biometricTable}
                        </span>
                      </div>
                      <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/90 p-2.5">
                        <span className="block font-mono text-[10px] text-neutral-400 uppercase">
                          Assinatura Digital:
                        </span>
                        <span
                          className="block truncate font-mono text-[9px] text-neutral-400"
                          title={
                            activeRealtimeQuote.securityVerification.digitalSignatureHash
                          }
                        >
                          {activeRealtimeQuote.securityVerification.digitalSignatureHash.substring(
                            0,
                            18
                          )}
                          ...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Soluções Estruturadas Recomendadas */}
              <div className="space-y-3 border-t border-neutral-800 pt-3">
                <span className="block font-mono text-[11px] font-bold text-cyan-400 uppercase">
                  Soluções Privadas com Aderência Determinística:
                </span>

                <div className="space-y-3">
                  {evaluationResult.matchedSolutions.map((sol) => (
                    <div
                      key={sol.product.id}
                      className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 transition-colors hover:border-cyan-500/40"
                    >
                      {/* Header do Card Responsivo */}
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        {/* Left: Badges, Nome, Subtítulo */}
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded border border-cyan-500/30 bg-cyan-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                              Score: {sol.adherenceScore}%
                            </span>
                            <span className="text-xs font-medium text-neutral-300">
                              {sol.product.seguradora}
                            </span>
                            <span className="rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
                              SUSEP: {sol.product.processoSusep}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white sm:text-base">
                              {sol.product.nome}
                            </h4>
                            <p className="mt-0.5 text-xs leading-snug font-medium text-amber-300/90">
                              {sol.product.subtitulo}
                            </p>
                          </div>
                        </div>

                        {/* Right / Bottom on Mobile: Capital Recomendado e Contribuição Mensal */}
                        <div className="flex shrink-0 items-center justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/80 p-2.5 sm:flex-col sm:items-end sm:justify-start sm:rounded-none sm:border-none sm:bg-transparent sm:p-0">
                          <div className="text-left sm:text-right">
                            <span className="block font-mono text-[9.5px] tracking-wider text-neutral-400 uppercase">
                              Capital Recomendado
                            </span>
                            <span className="font-mono text-xs font-bold text-white sm:text-sm">
                              {sol.suggestedCapitalDisplay}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="block font-mono text-[9.5px] tracking-wider text-neutral-500 uppercase sm:hidden">
                              Investimento Estimado
                            </span>
                            <span className="font-mono text-xs font-bold text-cyan-400">
                              {activeRealtimeQuote &&
                              ((sol.product.seguradora.toLowerCase().includes("icatu") &&
                                activeRealtimeQuote.insurerId === "icatu") ||
                                (sol.product.seguradora.toLowerCase().includes("mag") &&
                                  activeRealtimeQuote.insurerId === "mag") ||
                                (sol.product.seguradora.toLowerCase().includes("gboex") &&
                                  activeRealtimeQuote.insurerId === "gboex"))
                                ? `R$ ${activeRealtimeQuote.pricing.grossMonthlyPremium.toFixed(2)} / mês (API)`
                                : sol.estimatedMonthlyContribution}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Selo de Cotação Válida via API quando coincide com a seguradora */}
                      {activeRealtimeQuote &&
                        ((sol.product.seguradora.toLowerCase().includes("icatu") &&
                          activeRealtimeQuote.insurerId === "icatu") ||
                          (sol.product.seguradora.toLowerCase().includes("mag") &&
                            activeRealtimeQuote.insurerId === "mag") ||
                          (sol.product.seguradora.toLowerCase().includes("gboex") &&
                            activeRealtimeQuote.insurerId === "gboex")) && (
                          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-emerald-500/40 bg-emerald-950/50 p-2.5 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                              </span>
                              <span className="font-bold text-emerald-300">
                                Cotação Ativa via API Oficial
                              </span>
                              <span className="rounded border border-emerald-700/50 bg-emerald-900/60 px-2 py-0.5 font-mono text-[10px] text-emerald-200">
                                {activeRealtimeQuote.quoteProtocol}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-neutral-300">
                                Preço garantido até{" "}
                                {new Date(
                                  activeRealtimeQuote.validUntil
                                ).toLocaleDateString("pt-BR")}
                              </span>
                              <button
                                onClick={() => {
                                  setPayloadModalData(activeRealtimeQuote);
                                  setShowPayloadModal(true);
                                }}
                                className="cursor-pointer rounded border border-cyan-500/40 bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 hover:bg-cyan-500/30"
                              >
                                Ver Recibo API
                              </button>
                            </div>
                          </div>
                        )}

                      <div className="space-y-1 rounded-lg border border-neutral-800/80 bg-neutral-900/80 p-2.5 text-xs text-neutral-300">
                        <span className="block font-mono text-[10px] font-semibold tracking-wider text-amber-400 uppercase">
                          Racional Técnico da Recomendação:
                        </span>
                        <p>{sol.rationalText}</p>
                      </div>

                      {/* Vantagem Sucessória e Anti-Inventário */}
                      <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-2.5 text-[11px] text-neutral-300">
                        <strong className="text-emerald-400">
                          Proteção Anti-Inventário:{" "}
                        </strong>
                        <span>{sol.antiInventoryAdvantage}</span>
                      </div>

                      {/* Guia de Objeções para o Consultor */}
                      {sol.objectionsGuide.length > 0 && (
                        <div className="space-y-1 rounded-lg border border-neutral-800 bg-neutral-900/90 p-3 text-xs">
                          <span className="block font-mono text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                            Guia de Resposta para João Brito (Contorno de Objeção):
                          </span>
                          <p className="font-medium text-amber-300 italic">
                            {sol.objectionsGuide[0].objection}
                          </p>
                          <p className="text-[11px] leading-relaxed text-neutral-300">
                            {sol.objectionsGuide[0].consultantResponse}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FILA DE DOSSIÊS DO CTA */}
      {activeTab === "dossies" && (
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <Briefcase className="h-4 w-4 text-cyan-400" />
                <span>Atendimentos Agendados no CTA (Clube dos Taifeiros - RJ)</span>
              </h3>
              <p className="mt-0.5 text-xs text-neutral-400">
                Militares e pensionistas qualificados pós-palestra Lei nº 13.954/2019.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-400">
                {dossiersList.length} prontuários registrados
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Lista dos Dossiês */}
            <div className="space-y-3 lg:col-span-5">
              {dossiersList.map((dossier) => {
                const isSelected = selectedDossier?.profile.id === dossier.profile.id;
                return (
                  <div
                    key={dossier.profile.id}
                    onClick={() => setSelectedDossier(dossier)}
                    className={`cursor-pointer space-y-2 rounded-xl border p-4 text-xs transition-all ${
                      isSelected
                        ? "border-cyan-400/80 bg-cyan-500/10 shadow-md"
                        : "border-neutral-800 bg-neutral-900/80 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {dossier.profile.fullName}
                        </h4>
                        <span className="text-xs text-neutral-400">
                          {dossier.profile.rankCategory} ·{" "}
                          {dossier.profile.militaryBranch}
                        </span>
                      </div>
                      <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                        {dossier.consultation.status}
                      </span>
                    </div>

                    <p className="line-clamp-2 text-[11px] text-neutral-300">
                      {dossier.profile.notes}
                    </p>

                    <div className="flex items-center justify-between border-t border-neutral-800/80 pt-1 text-[10px] text-neutral-400">
                      <span>{dossier.consultation.originEvent}</span>
                      <span className="font-mono text-amber-400">
                        Score: {dossier.evaluation.overallVulnerabilityScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detalhe do Dossiê Selecionado */}
            <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#080E18] p-5 lg:col-span-7">
              {selectedDossier ? (
                <>
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div>
                      <span className="block font-mono text-[10px] tracking-wider text-cyan-400 uppercase">
                        Prontuário Consultivo Confidencial #
                        {selectedDossier.consultation.id}
                      </span>
                      <h3 className="mt-0.5 text-base font-bold text-white">
                        {selectedDossier.profile.fullName}
                      </h3>
                      <p className="text-xs text-neutral-400">
                        {selectedDossier.profile.rankCategory} ·{" "}
                        {selectedDossier.profile.militaryStatus.toUpperCase()} · Telefone:{" "}
                        {selectedDossier.profile.phone}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentProfile(selectedDossier.profile);
                        setActiveTab("simulador");
                      }}
                      className="cursor-pointer rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-neutral-950 transition-colors hover:bg-cyan-400"
                    >
                      Abrir no Simulador
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase">
                        Diagnóstico do Consultor:
                      </span>
                      <p className="text-neutral-200">
                        {selectedDossier.consultation.summaryFindings}
                      </p>
                    </div>

                    <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase">
                        Próximo Passo Acordado:
                      </span>
                      <p className="font-medium text-amber-300">
                        {selectedDossier.consultation.nextStepsAgreed}
                      </p>
                    </div>

                    <div className="space-y-1 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase">
                        Objeções Vencidas em Mesa:
                      </span>
                      <ul className="space-y-1 text-neutral-300">
                        {selectedDossier.consultation.objectionsHandled.map((obj, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-800 pt-2 text-[11px] text-neutral-400">
                      <span>
                        Data de Retorno:{" "}
                        {selectedDossier.consultation.scheduledFollowUpDate?.slice(0, 10)}
                      </span>
                      <span>Consultor: {CONSULTANT_JOAO_BRITO.name} (CTA-RJ)</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-xs text-neutral-500">
                  Selecione um prontuário na lista ao lado.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MATRIZ DE REGRAS & AUDITORIA JURÍDICA */}
      {activeTab === "regras" && (
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <Scale className="h-4 w-4 text-cyan-400" />
                <span>Base Jurídica Governada & Versionada (Planalto / STF)</span>
              </h3>
              <p className="mt-0.5 text-xs text-neutral-400">
                Somente normas com conferência oficial são ingeridas pelo motor de regras
                da Cyborg Intelligence.
              </p>
            </div>

            <div className="font-mono text-xs text-neutral-400">
              Versão em Produção:{" "}
              <span className="font-bold text-emerald-400">1.4.2-STF</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {NORMAS_JURIDICAS_GOVERNADAS.map((norma) => (
              <div
                key={norma.codigo}
                className="space-y-2 rounded-xl border border-neutral-800 bg-[#080E18] p-4 text-xs"
              >
                <div className="flex flex-col justify-between gap-2 border-b border-neutral-800/80 pb-2 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-xs font-bold text-cyan-300">
                      {norma.codigo}
                    </span>
                    <span className="text-sm font-bold text-white">{norma.lei}</span>
                    <span className="font-mono text-[11px] text-neutral-400">
                      ({norma.artigo})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                      Status: {norma.statusValidacao.toUpperCase()}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      Vigência: {norma.vigencia}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-1 md:grid-cols-2">
                  <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-2.5">
                    <span className="block font-mono text-[10px] text-neutral-500 uppercase">
                      Regra Anterior:
                    </span>
                    <p className="mt-0.5 text-neutral-400">{norma.regraAnterior}</p>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-2.5">
                    <span className="block font-mono text-[10px] font-semibold text-rose-400 uppercase">
                      Regra Vigente Pós-Lei 13.954:
                    </span>
                    <p className="mt-0.5 text-neutral-200">{norma.regraAtual}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-400">
                  <span>Público Impactado: {norma.publicoAfetado.join(", ")}</span>
                  <a
                    href={norma.fonteOficial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Fonte Oficial Planalto</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CONTRATO DE API & INTEGRAÇÃO EXTERNA */}
      {activeTab === "api" && (
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>API de Ingestão de Leads & Contrato de Integração</span>
              </h3>
              <p className="mt-0.5 text-xs text-neutral-400">
                Conexão autenticada e cifrada entre o site público `SiteEcosegSeguros` e a
                plataforma privada.
              </p>
            </div>

            <button
              onClick={() =>
                copyToClipboard(
                  "curl -X POST https://api.cyborgintelligence.com/v1/leads/ingest ...",
                  "curl"
                )
              }
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition-colors hover:bg-neutral-700"
            >
              {copiedStatus === "curl" ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>Copiar cURL</span>
            </button>
          </div>

          {/* Banner de Direcionamento para Aba 7 */}
          <div className="flex flex-col justify-between gap-3 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-neutral-900 p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2.5 text-cyan-400">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-xs font-bold text-white">
                  <span>Credenciais Oficiais de Licença & Tokens de Acesso</span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
                    Enterprise Piloto Ativa
                  </span>
                </h4>
                <p className="mt-0.5 text-[11px] text-neutral-300">
                  Para visualizar e copiar tokens Bearer oficiais de produção/sandbox,
                  rotacionar chaves ou testar autenticação contra o gateway, acesse o
                  gerenciador dedicado.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("credenciais-licenca")}
              className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-500 px-3.5 py-2 text-xs font-bold text-neutral-950 shadow-lg shadow-cyan-500/10 transition-all hover:bg-cyan-400"
            >
              <Key className="h-3.5 w-3.5" />
              <span>Gerenciar na Aba 7</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 font-mono text-xs lg:grid-cols-2">
            {/* Endpoint Spec */}
            <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="font-bold text-neutral-400">POST /v1/leads/ingest</span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
                  201 Created
                </span>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed whitespace-pre-wrap text-neutral-300">
                {`{
  "leadSource": "palestra_cta_2026",
  "fullName": "Tenente João Silva",
  "phone": "(21) 98765-4321",
  "email": "joao.silva@exemplo.mil.br",
  "militaryBranch": "FAB",
  "rankCategory": "Tenente",
  "militaryStatus": "reserva",
  "mainConcern": "pensao_filhas_lei_13954",
  "lgpdConsent": {
    "accepted": true,
    "timestamp": "${new Date().toISOString()}",
    "legalBasis": "Art. 7, V e IX da Lei 13.709/2018",
    "policyVersion": "1.0.0"
  }
}`}
              </pre>
            </div>

            {/* Response Spec */}
            <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="font-bold text-neutral-400">
                  Resposta da Cyborg Intelligence
                </span>
                <span className="text-[10px] text-neutral-500">Autenticado</span>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed whitespace-pre-wrap text-neutral-300">
                {`{
  "success": true,
  "dossierId": "dossier-cta-98214",
  "queueStatus": "enfileirado_para_consultor",
  "assignedConsultant": {
    "name": "João Brito",
    "officeLocation": "Base Operacional CTA-RJ"
  },
  "trackingCode": "CYB-CTA-2026-X89",
  "timestamp": "${new Date().toISOString()}"
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SINCRONIZAÇÃO REPOSITÓRIO LOCAL */}
      {activeTab === "sync-local" && (
        <div className="animate-in fade-in-0 space-y-6 duration-200">
          {/* Header Card */}
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-950 p-6 md:flex-row md:items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                  Sincronização Direta
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  Repositório: SiteEcosegSeguros
                </span>
              </div>
              <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
                <Terminal className="h-5 w-5 text-amber-400" />
                <span>
                  Implementar no Repositório Local (AntiGravity / Cursor / Claude Code)
                </span>
              </h3>
              <p className="max-w-2xl text-xs leading-relaxed text-neutral-300">
                Todos os arquivos do ecossistema ECOSEG e Cyborg Intelligence estão
                consolidados e prontos para aplicação direta no seu repositório local.
                Você pode baixar o pacote completo (
                <code className="font-mono text-amber-300">.tar.gz</code>) ou fornecer o
                prompt estruturado para o agente da sua IDE.
              </p>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadTarball}
              disabled={isDownloading}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl px-5 py-3 text-xs font-bold shadow-lg transition-all ${
                downloadSuccess
                  ? "bg-emerald-500 text-neutral-950 shadow-emerald-500/20"
                  : "bg-amber-500 text-neutral-950 shadow-amber-500/20 hover:bg-amber-400"
              }`}
            >
              <Download className={`h-4 w-4 ${isDownloading ? "animate-bounce" : ""}`} />
              <span>
                {isDownloading
                  ? "Baixando Pacote Real..."
                  : downloadSuccess
                    ? "✓ Pacote Baixado (54 KB)!"
                    : "Baixar Pacote .tar.gz (54 KB)"}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Opção 1: Extração por Linha de Comando */}
            <div className="space-y-4 lg:col-span-5">
              <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/80 p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <FolderArchive className="h-4 w-4 text-cyan-400" />
                  <span>Método 1: Extrair no Repositório Local (SiteEcosegSeguros)</span>
                </div>

                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-200">
                  <strong>Atenção ao arquivo de 10 KB:</strong> Se seu arquivo tem ~10 KB
                  e começa com <code>&lt;!doctype html&gt;</code>, ele é a página web do
                  Google e não o pacote gzip. O pacote autêntico tem{" "}
                  <strong>54 KB (55.093 bytes)</strong>.
                </div>

                <p className="text-xs text-neutral-400">
                  Ao baixar pelo botão acima, o seu navegador salva em{" "}
                  <strong>~/Downloads</strong>. Mova para a pasta do seu projeto ou
                  execute:
                </p>

                <div className="group relative rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-[11px] text-cyan-300">
                  <div className="mb-2 flex items-center justify-between border-b border-neutral-800 pb-1 text-[10px] text-neutral-500">
                    <span>Terminal na raiz do SiteEcosegSeguros</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "mv ~/Downloads/ecoseg-cyborg-local-bundle*.tar.gz ./ecoseg-cyborg-local-bundle.tar.gz\ntar -xvf ecoseg-cyborg-local-bundle.tar.gz\npnpm install\npnpm lint\npnpm build"
                        );
                        setCopiedPrompt(true);
                        setTimeout(() => setCopiedPrompt(false), 2000);
                      }}
                      className="cursor-pointer text-neutral-400 hover:text-white"
                    >
                      {copiedPrompt ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <code>
                    <span className="text-neutral-500">
                      # 1. Mover o download real (54 KB) da sua pasta Downloads:
                    </span>
                    <br />
                    <span className="text-amber-300">
                      mv ~/Downloads/ecoseg-cyborg-local-bundle*.tar.gz
                      ./ecoseg-cyborg-local-bundle.tar.gz
                    </span>
                    <br />
                    <br />
                    <span className="text-neutral-500">
                      # 2. Descompactar todos os módulos:
                    </span>
                    <br />
                    <span className="text-cyan-300">
                      tar -xvf ecoseg-cyborg-local-bundle.tar.gz
                    </span>
                    <br />
                    <br />
                    <span className="text-neutral-500"># 3. Validar build e lint:</span>
                    <br />
                    <span className="text-emerald-300">pnpm lint && pnpm build</span>
                  </code>
                </div>
              </div>

              {/* Inventário de Arquivos */}
              <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/80 p-5">
                <h4 className="font-mono text-xs font-bold tracking-wider text-neutral-300 uppercase">
                  Arquivos Incluídos no Pacote
                </h4>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {[
                    {
                      path: "src/domain/military-family/types.ts",
                      desc: "Tipos da família militar & normas",
                    },
                    {
                      path: "src/domain/military-family/products.ts",
                      desc: "Catálogo oficial Icatu & GBOEX",
                    },
                    {
                      path: "src/domain/cyborg-platform/schema.ts",
                      desc: "Schema multi-tenant do SaaS",
                    },
                    {
                      path: "src/domain/cyborg-platform/adherenceEngine.ts",
                      desc: "Motor determinístico de aderência",
                    },
                    {
                      path: "src/domain/cyborg-platform/consultationStore.ts",
                      desc: "Dossiês semeados da CTA",
                    },
                    {
                      path: "src/domain/contracts/cyborg-api.ts",
                      desc: "Contratos de API e webhook",
                    },
                    {
                      path: "src/components/cyborg/CyborgIntelligenceWorkspace.tsx",
                      desc: "Workspace completo do consultor",
                    },
                    {
                      path: "src/components/brand/EcoSegLogo.tsx",
                      desc: "Logo oficial em latão nobre",
                    },
                    {
                      path: "docs/adr/0005, 0006, 0007",
                      desc: "ADRs de governança arquitetural",
                    },
                    {
                      path: "docs/domain/*",
                      desc: "Especificação técnica e alinhamento",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-2 rounded border border-neutral-800 bg-neutral-950 p-2"
                    >
                      <span className="truncate text-cyan-300">{item.path}</span>
                      <span className="shrink-0 text-[10px] text-neutral-500">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Opção 2: Prompt Completo para o Agente Local */}
            <div className="space-y-4 lg:col-span-7">
              <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/80 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Terminal className="h-4 w-4 text-amber-400" />
                    <span>
                      Método 2: Prompt Mestre para Agente Local (AntiGravity / Cursor /
                      Claude)
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const promptText = `# PROMPT PARA O AGENTE LOCAL — ECOSEG & CYBORG INTELLIGENCE
Implemente no repositório SiteEcosegSeguros o catálogo de produtos e o motor Cyborg Intelligence:
1. Descompacte ecoseg-cyborg-local-bundle.tar.gz ou crie os arquivos de src/domain/military-family/ (types.ts e products.ts com Icatu e GBOEX).
2. Adicione o motor determinístico em src/domain/cyborg-platform/adherenceEngine.ts e o schema em schema.ts.
3. Adicione os dossiês semeados em consultationStore.ts e o contrato de API em src/domain/contracts/cyborg-api.ts.
4. Adicione o componente CyborgIntelligenceWorkspace.tsx em src/components/cyborg/.
5. Adicione as ADRs 0005, 0006 e 0007 em docs/adr/.
6. Execute 'pnpm lint' e 'pnpm build' para validar.`;
                      navigator.clipboard.writeText(promptText);
                      setCopiedPrompt(true);
                      setTimeout(() => setCopiedPrompt(false), 2000);
                    }}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20"
                  >
                    {copiedPrompt ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedPrompt ? "Copiado!" : "Copiar Prompt Mestre"}</span>
                  </button>
                </div>
                <p className="text-xs text-neutral-400">
                  Copie o prompt abaixo e envie para o seu agente de IA local
                  (AntiGravity, Cursor Composer ou Claude Code) para orquestrar a
                  implementação automatizada no seu ambiente:
                </p>

                <div className="max-h-[440px] space-y-3 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-[11px] leading-relaxed text-neutral-300">
                  <div className="font-bold text-amber-400">
                    # INSTRUÇÕES PARA EXECUÇÃO LOCAL NO REPOSITÓRIO:
                  </div>
                  <p className="text-neutral-400">
                    Sincronize o repositório local <code>SiteEcosegSeguros</code> com as
                    especificações da Central de Governança ECOSEG:
                  </p>
                  <ol className="list-inside list-decimal space-y-1.5 text-neutral-300">
                    <li>
                      <strong>Catálogo Oficial de Soluções:</strong> Parametrizar produtos
                      Icatu (Equilíbrio Whole Life, Horizonte, Vida Longa Resgatável,
                      Força Ativa, Master Acidentes Domiciliares) e GBOEX (Pecúlio
                      Consignado).
                    </li>
                    <li>
                      <strong>Motor de Aderência Determinístico:</strong> Aplicar o
                      algoritmo <code>evaluateCyborgAdherence</code> para cruzar perfil
                      militar (ingresso pré/pós 2000, desconto 1,5%, dependentes, idade)
                      com as normas da Lei 13.954/2019 e Art. 794 do Código Civil.
                    </li>
                    <li>
                      <strong>Workspace Privado:</strong> Integrar a aba restrita{" "}
                      <code>CyborgIntelligenceWorkspace</code> com simulador, fila de
                      dossiês do CTA e matriz de regras.
                    </li>
                    <li>
                      <strong>Governança:</strong> Manter atualizadas as ADRs 0005, 0006 e
                      0007 na pasta <code>docs/adr/</code>.
                    </li>
                  </ol>
                  <div className="rounded border border-neutral-800 bg-neutral-900 p-2.5 text-emerald-400">
                    Validação Final: Execute <code>pnpm lint && pnpm build</code> para
                    certificar zero erros de compilação.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CONECTORES DE APIS DE SEGURADORAS (TEMPO REAL / OPEN INSURANCE) */}
      {activeTab === "conectores-api" && (
        <div className="space-y-6">
          {/* Header da Sub-aba */}
          <div className="space-y-3 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#040C18] via-[#08172A] to-[#051122] p-5 shadow-xl sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/20 p-2.5 text-cyan-300">
                  <Zap className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
                    <span>Hub de Conectores de APIs de Seguradoras em Tempo Real</span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                      OPEN INSURANCE
                    </span>
                  </h3>
                  <p className="mt-0.5 text-xs text-neutral-300 sm:text-sm">
                    Webservices de cotação instantânea, validação atuarial e emissão de
                    propostas integrados a <strong>Icatu Seguros</strong>,{" "}
                    <strong>MAG Seguros</strong>, <strong>GBOEX</strong> e padrão{" "}
                    <strong>SUSEP OPIN</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => checkInsurerConnectorsHealth().then(setConnectorsHealth)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-neutral-800"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Atualizar Telemetria</span>
                </button>
              </div>
            </div>

            {/* Badges de Governança */}
            <div className="flex flex-wrap items-center gap-2 border-t border-neutral-800/80 pt-2 text-xs">
              <span className="rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1 font-mono text-neutral-300">
                Padrão SUSEP: Circular nº 635/2021 & Resolução CNSP nº 415/2021
              </span>
              <span className="rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1 font-mono text-cyan-300">
                Autenticação: mTLS + OAuth 2.0 Client Credentials
              </span>
              <span className="rounded border border-emerald-500/40 bg-emerald-950/80 px-2.5 py-1 font-mono text-emerald-300">
                Garantia de Preço: 15 a 30 dias congelados
              </span>
            </div>
          </div>

          {/* 1. Grade de Status dos 4 Conectores Oficiais */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-cyan-400 uppercase">
                <Activity className="h-4 w-4" />
                1. Status & Telemetria dos Conectores (Healthcheck em Tempo Real)
              </span>
              <span className="font-mono text-[11px] text-neutral-400">
                Todos os serviços operando dentro dos SLAs contratuais
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {INSURER_CONNECTORS_CONFIG.map((conn) => {
                const health = connectorsHealth.find((h) => h.insurerId === conn.id);
                const latency = health?.latencyMs || conn.avgLatencyMs;
                const isPinging = isTestingPing === conn.id;

                return (
                  <div
                    key={conn.id}
                    className="space-y-3 rounded-2xl border border-neutral-800 bg-[#070D17] p-4 shadow-lg transition-colors hover:border-cyan-500/40"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                        </span>
                        <h4
                          className="truncate text-xs font-bold text-white sm:text-sm"
                          title={conn.name}
                        >
                          {conn.shortName}
                        </h4>
                      </div>
                      <span className="rounded border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 uppercase">
                        {conn.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[11px]">Latência RTT:</span>
                        <span className="font-mono font-bold text-white">
                          {isPinging ? "testando..." : `${latency} ms`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[11px]">Uptime Mensal:</span>
                        <span className="font-mono font-semibold text-emerald-400">
                          {conn.uptimeMonthly}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[11px]">Protocolo Auth:</span>
                        <span className="font-mono text-[10px] text-cyan-300">
                          {conn.authMethod}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[11px]">Capital Máximo:</span>
                        <span className="font-mono text-[10px] text-white">
                          Até R$ {(conn.maxInsuredCapital / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[11px]">Garantia Preço:</span>
                        <span className="font-mono text-[10px] text-amber-300">
                          {conn.features.guaranteedPriceDays} dias
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-800/80 pt-2">
                      <span className="font-mono text-[10px] text-neutral-500">
                        SUSEP: {conn.susepCode}
                      </span>
                      <button
                        onClick={() => handlePingConnector(conn.id)}
                        disabled={isPinging}
                        className="inline-flex cursor-pointer items-center gap-1 rounded border border-cyan-500/30 bg-neutral-900 px-2.5 py-1 font-mono text-[10px] font-semibold text-cyan-300 transition-colors hover:bg-neutral-800 disabled:opacity-50"
                      >
                        <Radio
                          className={`h-3 w-3 ${isPinging ? "animate-spin text-amber-400" : ""}`}
                        />
                        <span>{isPinging ? "Pingando..." : "Testar Ping"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Console & Playground Interativo de Teste de Cotação de APIs */}
          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#070D17] p-5 shadow-xl sm:p-6">
            <div className="flex flex-col justify-between gap-3 border-b border-neutral-800 pb-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white sm:text-base">
                    Console Interativo de Cotação de APIs (Live Sandbox Playground)
                  </h4>
                </div>
                <p className="mt-0.5 text-xs text-neutral-400">
                  Execute requisições diretas de homologação contra os endpoints REST das
                  seguradoras parceiras e inspecione o contrato de dados.
                </p>
              </div>

              {/* Botão de Disparo */}
              <button
                onClick={handleRunPlaygroundQuote}
                disabled={isPlayingGroundLoading}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 active:scale-95 disabled:opacity-50"
              >
                {isPlayingGroundLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                <span>
                  {isPlayingGroundLoading
                    ? "Consultando API..."
                    : "Disparar Cotação Instantânea (Live Call)"}
                </span>
              </button>
            </div>

            {/* Controles do Playground */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 text-xs sm:grid-cols-3">
              <div>
                <label className="mb-1 block font-mono text-[10px] text-neutral-400 uppercase">
                  1. Seguradora Alvo:
                </label>
                <select
                  value={playgroundInsurer}
                  onChange={(e) => setPlaygroundInsurer(e.target.value as InsurerId)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 font-medium text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="icatu">Icatu Seguros (Direct API v2.4)</option>
                  <option value="mag">MAG Seguros (Conecta API v1.9)</option>
                  <option value="gboex">GBOEX Militar (Gateway v2.1)</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] text-neutral-400 uppercase">
                  2. Capital Segurado Solicitado:
                </label>
                <select
                  value={playgroundCapital}
                  onChange={(e) => setPlaygroundCapital(Number(e.target.value))}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value={350000}>R$ 350.000,00 (Plano Básico)</option>
                  <option value={500000}>R$ 500.000,00 (Plano Recomendado)</option>
                  <option value={750000}>R$ 750.000,00 (Plano Oficial Subalterno)</option>
                  <option value={1000000}>
                    R$ 1.000.000,00 (Plano Oficial Superior)
                  </option>
                  <option value={2000000}>
                    R$ 2.000.000,00 (Blindagem Sucessória Total)
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] text-neutral-400 uppercase">
                  3. Perfil de Risco em Avaliação:
                </label>
                <div className="truncate rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 font-mono text-[11px] text-neutral-300">
                  {currentProfile.rankCategory} · {currentProfile.militaryBranch} · R${" "}
                  {currentProfile.grossIncome.toLocaleString("pt-BR")}
                </div>
              </div>
            </div>

            {/* Visualizador Lado a Lado: Request JSON x Response JSON */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Request JSON */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-mono font-bold text-neutral-300 uppercase">
                    <Send className="h-3.5 w-3.5 text-cyan-400" />
                    Request Payload (POST /api/insurance-connectors/quote)
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">
                    Content-Type: application/json
                  </span>
                </div>
                <div className="max-h-[320px] overflow-y-auto rounded-xl border border-neutral-800 bg-[#03060C] p-3.5 font-mono text-[11px] leading-relaxed text-neutral-300">
                  <pre>
                    {JSON.stringify(
                      {
                        endpoint:
                          playgroundInsurer === "icatu"
                            ? "https://api.icatuseguros.com.br/v2/parceiros/cotacao"
                            : playgroundInsurer === "mag"
                              ? "https://api.mag.com.br/v1/venda-digital/simulacao"
                              : "https://gateway.gboex.com.br/api/militares/peculio/cotacao",
                        headers: {
                          Authorization:
                            playgroundInsurer === "icatu"
                              ? "Bearer eyJhbGciOiJSUzI1NiIs..."
                              : "ApiKey gbx_mil_2026_sec...",
                          "X-Correlation-ID": `cyborg-${currentProfile.id}`,
                          "X-Underwriting-Occupation": "FORCAS_ARMADAS_ESTABILIZADO",
                        },
                        body: {
                          profileId: currentProfile.id,
                          rankCategory: currentProfile.rankCategory,
                          militaryBranch: currentProfile.militaryBranch,
                          calculatedAge: 42,
                          grossIncome: currentProfile.grossIncome,
                          requestedCapital: playgroundCapital,
                          selectedCoverages: [
                            "morte_qualquer_causa_livre_inventario",
                            "invalidez_permanente_servico_folga",
                            "assistencia_funeral_familiar",
                          ],
                        },
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>

              {/* Response JSON */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-mono font-bold text-neutral-300 uppercase">
                    <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Response Payload (200 OK — Assinado pela Seguradora)
                  </span>
                  {playgroundResult && (
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                      Latência: {playgroundResult.securityVerification.apiLatencyMs}ms
                    </span>
                  )}
                </div>
                <div className="max-h-[320px] overflow-y-auto rounded-xl border border-emerald-500/30 bg-[#03060C] p-3.5 font-mono text-[11px] leading-relaxed text-emerald-300/90">
                  <pre>
                    {playgroundResult
                      ? JSON.stringify(playgroundResult, null, 2)
                      : JSON.stringify(
                          {
                            status: "aguardando_disparo",
                            mensagem:
                              "Clique no botão 'Disparar Cotação Instantânea' acima para simular a chamada em tempo real ao webservice da seguradora selecionada.",
                            exemplosProtocolos: [
                              "ICATU-COT-2026-98421-MIL",
                              "MAG-SIM-849102-DF",
                              "GBOEX-PEC-33019-CTA",
                            ],
                          },
                          null,
                          2
                        )}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Matriz Comparativa de Capacidades Técnicas das APIs */}
          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#070D17] p-5 shadow-xl sm:p-6">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-cyan-400 uppercase">
              <Layers className="h-4 w-4" />
              3. Matriz Comparativa de Capacidades Técnicas dos Conectores
            </h4>

            <div className="no-scrollbar overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 font-mono text-[10px] text-neutral-400 uppercase">
                    <th className="py-2.5 pr-4">Seguradora / Gateway</th>
                    <th className="px-3 py-2.5">Cotação Instantânea</th>
                    <th className="px-3 py-2.5">Garantia Preço</th>
                    <th className="px-3 py-2.5">Declaração Saúde (DPS)</th>
                    <th className="px-3 py-2.5">Subscrição Militar</th>
                    <th className="px-3 py-2.5">Tábua Biometria</th>
                    <th className="py-2.5 pl-3 text-right">Resgate Reserva</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 font-mono text-[11px]">
                  <tr className="hover:bg-neutral-900/40">
                    <td className="flex items-center gap-1.5 py-3 pr-4 font-bold text-white">
                      <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                      Icatu Seguros Direct API
                    </td>
                    <td className="px-3 py-3 text-emerald-400">Sim (118ms)</td>
                    <td className="px-3 py-3 font-bold text-amber-300">
                      15 dias corridos
                    </td>
                    <td className="px-3 py-3 text-neutral-300">
                      Link Digital (SMS/WhatsApp)
                    </td>
                    <td className="px-3 py-3 text-cyan-300">Homologado (EB/MB/FAB)</td>
                    <td className="px-3 py-3 text-neutral-400">BR-EMS 2021 Sb</td>
                    <td className="py-3 pl-3 text-right font-bold text-emerald-300">
                      A partir do 25º mês
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-900/40">
                    <td className="flex items-center gap-1.5 py-3 pr-4 font-bold text-white">
                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                      MAG Seguros Conecta
                    </td>
                    <td className="px-3 py-3 text-emerald-400">Sim (142ms)</td>
                    <td className="px-3 py-3 font-bold text-amber-300">
                      30 dias corridos
                    </td>
                    <td className="px-3 py-3 text-neutral-300">
                      Assinatura Eletrônica Gov.br
                    </td>
                    <td className="px-3 py-3 text-cyan-300">
                      Cobertura Missões Especiais
                    </td>
                    <td className="px-3 py-3 text-neutral-400">AT-2000 Suavizada</td>
                    <td className="py-3 pl-3 text-right text-neutral-500">
                      N/A (Vida Puro)
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-900/40">
                    <td className="flex items-center gap-1.5 py-3 pr-4 font-bold text-white">
                      <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                      GBOEX Previdência Gateway
                    </td>
                    <td className="px-3 py-3 text-emerald-400">Sim (185ms)</td>
                    <td className="px-3 py-3 font-bold text-amber-300">
                      20 dias corridos
                    </td>
                    <td className="px-3 py-3 text-neutral-300">Simplificada sem Exame</td>
                    <td className="px-3 py-3 text-cyan-300">
                      Consignado em Folha FAB/EB
                    </td>
                    <td className="px-3 py-3 text-neutral-400">Mortalidade Militar</td>
                    <td className="py-3 pl-3 text-right font-bold text-emerald-300">
                      A partir do 24º mês
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-900/40">
                    <td className="flex items-center gap-1.5 py-3 pr-4 font-bold text-white">
                      <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                      Open Insurance Brasil (SUSEP)
                    </td>
                    <td className="px-3 py-3 text-emerald-400">Sim (165ms)</td>
                    <td className="px-3 py-3 font-bold text-amber-300">
                      15 dias corridos
                    </td>
                    <td className="px-3 py-3 text-neutral-300">Consentimento OpenID</td>
                    <td className="px-3 py-3 text-cyan-300">Interoperável Fase 3</td>
                    <td className="px-3 py-3 text-neutral-400">Padrão Regulatório</td>
                    <td className="py-3 pl-3 text-right text-cyan-300">
                      Portabilidade Ampla
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Vantagens Estratégicas para o Consultor e para o Militar */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Preço Travado sem Surpresas</span>
              </div>
              <p className="leading-relaxed text-neutral-300">
                A seguradora congela formalmente o valor da parcela por 15 a 30 dias com
                protocolo oficial, impedindo oscilações de cálculo atuarial ou
                reenquadramento de idade durante a negociação.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-cyan-400">
                <Zap className="h-4 w-4" />
                <span>Fechamento no Mesmo Instante</span>
              </div>
              <p className="leading-relaxed text-neutral-300">
                Elimina a dependência de orçamentos manuais ou retorno posterior por
                e-mail. O militar sai da palestra do CTA já com a proposta oficial
                pré-aprovada na palma da mão.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <Lock className="h-4 w-4" />
                <span>Auditoria Criptográfica SHA-256</span>
              </div>
              <p className="leading-relaxed text-neutral-300">
                Cada cotação carrega um carimbo digital auditável que vincula o CPF
                anonimizado do militar ao número de processo SUSEP da apólice, blindando o
                consultor contra questionamentos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: LICENÇA B2B & CREDENCIAIS DE ACESSO API CYBORG INTELLIGENCE */}
      {activeTab === "credenciais-licenca" && (
        <div className="space-y-6">
          {/* Header da Aba de Credenciais */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-[#071322] via-[#0A1A2E] to-[#060D18] p-5 shadow-xl shadow-cyan-950/20 md:flex-row md:items-center">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                  CYBORG INTELLIGENCE · B2B SAAS GATEWAY
                </span>
                <span className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  LICENÇA ATIVA
                </span>
                <span className="rounded border border-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-400">
                  ADR 0007 & ADR 0009
                </span>
              </div>
              <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
                <Key className="h-5 w-5 text-cyan-400" />
                <span>Licença Enterprise Piloto & Credenciais de Acesso API</span>
              </h3>
              <p className="max-w-3xl text-xs leading-relaxed text-neutral-300">
                Governança oficial de autenticação por tokens Bearer criptográficos,
                assinatura digital SHA-256 e controle de quotas para a operação da{" "}
                <strong>ECOSEG</strong> no Clube dos Taifeiros (CTA-RJ).
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                onClick={() => handleTestToken(activeToken)}
                disabled={isValidatingToken}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-cyan-500 px-3.5 py-2 text-xs font-bold text-neutral-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 active:scale-95 disabled:opacity-50"
              >
                {isValidatingToken ? (
                  <Activity className="h-4 w-4 animate-spin" />
                ) : (
                  <Gauge className="h-4 w-4" />
                )}
                <span>Validar Token Ativo</span>
              </button>
              <button
                onClick={() => setShowCreateKeyModal(true)}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-500/60 hover:bg-neutral-800 active:scale-95"
              >
                <KeyRound className="h-4 w-4" />
                <span>+ Nova Chave</span>
              </button>
            </div>
          </div>

          {/* Card Holográfico do Certificado Oficial de Licença */}
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/50 bg-gradient-to-br from-[#06101E] via-[#091526] to-[#040812] p-6 text-white shadow-2xl">
            {/* Holographic Watermark Background */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
            <div className="pointer-events-none absolute top-6 right-6 opacity-10">
              <Fingerprint className="h-44 w-44 text-cyan-400" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Top Banner do Certificado */}
              <div className="flex flex-col justify-between gap-4 border-b border-cyan-500/20 pb-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-cyan-400" />
                    <span className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">
                      Certificado de Concessão de Licença B2B
                    </span>
                  </div>
                  <h4 className="text-xl font-bold tracking-tight text-white">
                    {licenseData.organizationName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                    <span>
                      CNPJ:{" "}
                      <strong className="font-mono text-neutral-200">
                        {licenseData.cnpj}
                      </strong>
                    </span>
                    <span>·</span>
                    <span>
                      Base Operacional:{" "}
                      <strong className="text-cyan-300">{licenseData.pilotBase}</strong>
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-left sm:text-right">
                  <span className="block font-mono text-[10px] text-neutral-400 uppercase">
                    ID da Licença Oficial:
                  </span>
                  <span className="inline-block rounded-lg border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 font-mono text-sm font-bold text-cyan-300">
                    {licenseData.licenseId}
                  </span>
                  <div className="pt-0.5 text-[11px] text-neutral-400">
                    Emissão:{" "}
                    <span className="font-mono text-neutral-300">15/01/2026</span> ·
                    Validade:{" "}
                    <span className="font-mono text-emerald-400">15/01/2027</span>
                  </div>
                </div>
              </div>

              {/* Informações Técnicas da Licença: SLA, Assinatura Criptográfica e Quotas */}
              <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
                {/* Coluna 1: Governança & Autoridade Certificadora */}
                <div className="space-y-2 rounded-xl border border-neutral-800 bg-[#030914]/80 p-4">
                  <span className="block font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                    Autoridade & Assinatura Digital
                  </span>
                  <div className="space-y-1">
                    <div className="flex justify-between text-neutral-300">
                      <span className="text-neutral-500">Autoridade:</span>
                      <span className="font-mono font-medium text-cyan-300">
                        {licenseData.issuerAuthority}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span className="text-neutral-500">SLA Garantido:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {licenseData.slaGuaranteedUptime}% Uptime
                      </span>
                    </div>
                    <div className="pt-1">
                      <span className="block text-[10px] text-neutral-500">
                        Hash SHA-256 do Certificado:
                      </span>
                      <span className="mt-0.5 block rounded border border-neutral-900 bg-black/40 p-1.5 font-mono text-[10px] break-all text-neutral-400 select-all">
                        {licenseData.digitalSignatureHash}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coluna 2: Quota de Ingestão de Leads */}
                <div className="space-y-2.5 rounded-xl border border-neutral-800 bg-[#030914]/80 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                      Quota de Leads Mensais
                    </span>
                    <span className="font-mono text-[10px] font-bold text-cyan-400">
                      {Math.round(
                        (licenseData.quotas.consumedLeadsThisMonth /
                          licenseData.quotas.monthlyLeadsLimit) *
                          100
                      )}
                      % Consumido
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-lg font-bold text-white">
                        {licenseData.quotas.consumedLeadsThisMonth.toLocaleString(
                          "pt-BR"
                        )}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">
                        limite:{" "}
                        {licenseData.quotas.monthlyLeadsLimit.toLocaleString("pt-BR")}{" "}
                        leads/mês
                      </span>
                    </div>
                    {/* Barra de Progresso */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{
                          width: `${(licenseData.quotas.consumedLeadsThisMonth / licenseData.quotas.monthlyLeadsLimit) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="block pt-1 text-[10px] text-neutral-400">
                      Renovação da franquia:{" "}
                      <strong className="font-mono text-neutral-300">01/11/2026</strong>
                    </span>
                  </div>
                </div>

                {/* Coluna 3: Quota de Cotações em Tempo Real & Rate-Limit */}
                <div className="space-y-2.5 rounded-xl border border-neutral-800 bg-[#030914]/80 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                      Cotações Conectores (Tempo Real)
                    </span>
                    <span className="font-mono text-[10px] font-bold text-cyan-400">
                      {Math.round(
                        (licenseData.quotas.consumedQuotesThisMonth /
                          licenseData.quotas.monthlyQuotesLimit) *
                          100
                      )}
                      % Consumido
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-lg font-bold text-white">
                        {licenseData.quotas.consumedQuotesThisMonth.toLocaleString(
                          "pt-BR"
                        )}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">
                        limite:{" "}
                        {licenseData.quotas.monthlyQuotesLimit.toLocaleString("pt-BR")}{" "}
                        cotações/mês
                      </span>
                    </div>
                    {/* Barra de Progresso */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                        style={{
                          width: `${(licenseData.quotas.consumedQuotesThisMonth / licenseData.quotas.monthlyQuotesLimit) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-400">
                      <span>
                        Rate-Limit:{" "}
                        <strong className="font-mono text-neutral-300">
                          600 req/min
                        </strong>
                      </span>
                      <span>
                        Concorrência:{" "}
                        <strong className="font-mono text-cyan-300">25 conexões</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Escopos de Permissão Autorizados na Licença */}
              <div className="space-y-2 rounded-xl border border-cyan-500/20 bg-[#030914]/60 p-4">
                <span className="block font-mono text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                  Escopos de API Autorizados para a ECOSEG (Contrato Enterprise):
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      scope: "leads:ingest",
                      desc: "Ingestão Cifrada de Leads do SiteEcoseg",
                    },
                    {
                      scope: "quotes:realtime",
                      desc: "Cotação em Tempo Real (Icatu, MAG, GBOEX)",
                    },
                    {
                      scope: "adherence:calculate",
                      desc: "Motor Determinístico de Elegibilidade & STF",
                    },
                    {
                      scope: "dossier:issue",
                      desc: "Emissão de Laudo Técnico & Prontuário",
                    },
                    {
                      scope: "audit:export",
                      desc: "Exportação de Trilha de Auditoria LGPD",
                    },
                    {
                      scope: "consultant:read",
                      desc: "Acesso de Consultores Autorizados",
                    },
                    {
                      scope: "rules:inspect",
                      desc: "Inspeção de Matriz Jurídica Lei 13.954",
                    },
                  ].map((s) => (
                    <span
                      key={s.scope}
                      title={s.desc}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/60 px-2.5 py-1 font-mono text-xs text-cyan-300"
                    >
                      <CheckCheck className="h-3 w-3 text-cyan-400" />
                      <span>{s.scope}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gerenciador de Chaves de API (Tokens Bearer) */}
          <div className="space-y-3">
            <div className="flex flex-col justify-between gap-2 border-b border-neutral-800 pb-2 sm:flex-row sm:items-center">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                  <KeyRound className="h-4 w-4 text-cyan-400" />
                  <span>Tokens de Acesso & Chaves Criptográficas de API</span>
                </h4>
                <p className="mt-0.5 text-xs text-neutral-400">
                  Utilize o token em requisições HTTP adicionando o cabeçalho{" "}
                  <code className="font-mono text-[11px] text-cyan-300">
                    Authorization: Bearer &lt;TOKEN&gt;
                  </code>
                  .
                </p>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                Token Selecionado:{" "}
                <strong className="font-mono text-cyan-300">
                  {activeToken.slice(0, 12)}...{activeToken.slice(-4)}
                </strong>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {licenseData.apiKeys.map((key) => {
                const isRevealed = revealedKeys[key.id];
                const isCopied = copiedKeyId === key.id;
                const isRotating = rotatingKeyId === key.id;
                const isRotated = rotateSuccessKeyId === key.id;
                const isActive = activeToken === key.rawKey;

                return (
                  <div
                    key={key.id}
                    className={`space-y-4 rounded-2xl border p-5 transition-all ${
                      isActive
                        ? "border-cyan-500/60 bg-gradient-to-r from-[#071322] to-[#0A1626] shadow-lg shadow-cyan-950/20"
                        : "border-neutral-800 bg-[#060B14] hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                              key.environment === "production"
                                ? "border border-rose-500/30 bg-rose-500/20 text-rose-300"
                                : "border border-amber-500/30 bg-amber-500/20 text-amber-300"
                            }`}
                          >
                            {key.environment === "production"
                              ? "● PRODUÇÃO"
                              : "○ SANDBOX"}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {key.label}
                          </span>
                          {isActive && (
                            <span className="rounded-full border border-cyan-500/40 bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                              TOKEN ATIVO
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-400">
                          <span>
                            Criado em:{" "}
                            <strong className="font-mono text-neutral-300">
                              {new Date(key.createdAt).toLocaleDateString("pt-BR")}
                            </strong>
                          </span>
                          <span>·</span>
                          <span>
                            Último uso:{" "}
                            <strong className="font-mono text-neutral-300">
                              {key.lastUsedAt
                                ? new Date(key.lastUsedAt).toLocaleTimeString("pt-BR")
                                : "Nunca utilizado"}
                            </strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {!isActive && (
                          <button
                            onClick={() => handleSelectActiveToken(key.rawKey)}
                            className="cursor-pointer rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                          >
                            Tornar Ativa
                          </button>
                        )}
                        <button
                          onClick={() => handleRotateKey(key.id)}
                          disabled={isRotating}
                          className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-amber-500/30 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-amber-300 transition-colors hover:border-amber-500/60 hover:bg-neutral-800 hover:text-amber-200 disabled:opacity-50"
                          title="Gera um novo hash de token seguro instantaneamente, invalidando o anterior"
                        >
                          <RotateCcw
                            className={`h-3.5 w-3.5 ${isRotating ? "animate-spin" : ""}`}
                          />
                          <span>
                            {isRotating
                              ? "Rotacionando..."
                              : isRotated
                                ? "Rotacionada!"
                                : "Rotacionar"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Visualizador do Token de Acesso */}
                    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                      <div className="relative flex-1">
                        <input
                          type={isRevealed ? "text" : "password"}
                          readOnly
                          value={isRevealed ? key.rawKey : key.maskedKey}
                          className="w-full rounded-xl border border-neutral-800 bg-[#03060E] px-3 py-2.5 pr-10 font-mono text-xs tracking-wider text-cyan-300 select-all focus:border-cyan-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleToggleRevealKey(key.id)}
                          className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer p-1 text-neutral-400 transition-colors hover:text-white"
                          title={isRevealed ? "Ocultar Chave" : "Visualizar Chave"}
                        >
                          {isRevealed ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyKey(key.id, key.rawKey)}
                          className="flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          <span>{isCopied ? "Copiado!" : "Copiar"}</span>
                        </button>
                        <button
                          onClick={() => handleTestToken(key.rawKey)}
                          className="flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-2.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-900"
                          title="Testa essa chave específica contra o gateway"
                        >
                          <Gauge className="h-4 w-4" />
                          <span>Testar</span>
                        </button>
                      </div>
                    </div>

                    {/* Escopos vinculados à Chave */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="mr-1 font-mono text-[10px] text-neutral-500 uppercase">
                        Escopos:
                      </span>
                      {key.scopes.map((sc) => (
                        <span
                          key={sc}
                          className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
                        >
                          {sc}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Card Especial de Segredo HMAC para Webhook */}
              <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#060B14] p-5">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-purple-500/30 bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-300 uppercase">
                        WEBHOOK SECRET
                      </span>
                      <h5 className="text-sm font-bold text-white">
                        Segredo HMAC para Validação de Webhooks (Callbacks)
                      </h5>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Utilizado para conferir a assinatura{" "}
                      <code className="font-mono text-[11px] text-purple-300">
                        X-Cyborg-Signature: sha256=...
                      </code>{" "}
                      quando a Cyborg notificar o SiteEcoseg sobre propostas e cotações.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <input
                      type={revealedKeys["webhook"] ? "text" : "password"}
                      readOnly
                      value={
                        revealedKeys["webhook"]
                          ? licenseData.webhookSecret
                          : "sec_live_hmac••••••••••••••••••••••••x89a"
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-[#03060E] px-3 py-2.5 pr-10 font-mono text-xs tracking-wider text-purple-300 select-all focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleToggleRevealKey("webhook")}
                      className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer p-1 text-neutral-400 transition-colors hover:text-white"
                    >
                      {revealedKeys["webhook"] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopyKey("webhook", licenseData.webhookSecret)}
                    className="flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    {copiedKeyId === "webhook" ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>
                      {copiedKeyId === "webhook" ? "Copiado!" : "Copiar Segredo"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Duas Colunas: Diagnóstico em Tempo Real & Simulador de Ingestão com Token */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Coluna Esquerda: Console Interativo de Diagnóstico do Token (7 cols) */}
            <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#070D18] p-5 lg:col-span-7">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">
                    Console de Teste & Validação de Credencial
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-cyan-400">
                  Gateway Oficial
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-neutral-300">
                    Token Bearer para Verificação no Gateway:
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={testTokenInput}
                      onChange={(e) => setTestTokenInput(e.target.value)}
                      placeholder="Cole aqui cyb_live_... ou cyb_test_..."
                      className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 font-mono text-xs text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleTestToken()}
                      disabled={isValidatingToken || !testTokenInput.trim()}
                      className="flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-neutral-950 transition-all hover:bg-cyan-400 disabled:opacity-50"
                    >
                      {isValidatingToken ? (
                        <Activity className="h-4 w-4 animate-spin" />
                      ) : (
                        <Zap className="h-4 w-4" />
                      )}
                      <span>Testar no Gateway</span>
                    </button>
                  </div>
                </div>

                {/* Resultado da Validação do Token */}
                {validationResult && (
                  <div
                    className={`animate-in fade-in-0 space-y-3 rounded-xl border p-4 duration-300 ${
                      validationResult.authenticated
                        ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-300"
                        : "border-rose-500/40 bg-rose-950/20 text-rose-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {validationResult.authenticated ? (
                          <CheckCheck className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <ShieldAlert className="h-5 w-5 text-rose-400" />
                        )}
                        <span className="text-sm font-bold text-white">
                          {validationResult.authenticated
                            ? "Credencial Autenticada com Sucesso (200 OK)"
                            : "Autenticação Rejeitada pelo Gateway (401 Unauthorized)"}
                        </span>
                      </div>
                      <span className="rounded border border-neutral-800 bg-black/40 px-2 py-0.5 font-mono text-xs text-neutral-400">
                        {validationResult.latencyMs}ms de latência
                      </span>
                    </div>

                    {validationResult.authenticated ? (
                      <div className="space-y-2 font-mono text-xs text-neutral-300">
                        <div className="grid grid-cols-2 gap-2 rounded-lg border border-neutral-800/80 bg-neutral-950/60 p-3">
                          <div>
                            <span className="block text-[10px] text-neutral-500">
                              Organização Licenciada:
                            </span>
                            <span className="font-bold text-white">
                              {validationResult.organizationName}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-neutral-500">
                              Ambiente do Token:
                            </span>
                            <span className="font-bold text-cyan-400 uppercase">
                              {validationResult.environment}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-neutral-500">
                              Licença ID:
                            </span>
                            <span className="text-neutral-200">
                              {validationResult.licenseId}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-neutral-500">
                              Rate-Limit Restante:
                            </span>
                            <span className="font-bold text-emerald-400">
                              {validationResult.rateLimit.remainingThisMinute} /{" "}
                              {validationResult.rateLimit.limitPerMinute} req/min
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="mb-1 block text-[11px] text-neutral-400">
                            Escopos Autorizados para esta Chave:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {validationResult.scopes.map((sc) => (
                              <span
                                key={sc}
                                className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300"
                              >
                                ✓ {sc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="font-mono text-xs leading-relaxed text-rose-300">
                        {validationResult.errorMessage ||
                          "Falha na validação do cabeçalho Bearer token."}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Coluna Direita: Simulador de Ingestão de Lead Autenticado (5 cols) */}
            <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#070D18] p-5 lg:col-span-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">
                    Simulador de Ingestão (POST /v1/leads)
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-emerald-400">
                  Bearer Auth
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="mb-1 block text-neutral-400">
                    Nome Completo do Militar:
                  </label>
                  <input
                    type="text"
                    value={leadTestName}
                    onChange={(e) => setLeadTestName(e.target.value)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 font-medium text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-neutral-400">
                      Telefone / WhatsApp:
                    </label>
                    <input
                      type="text"
                      value={leadTestPhone}
                      onChange={(e) => setLeadTestPhone(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-neutral-400">Força Militar:</label>
                    <select
                      value={leadTestBranch}
                      onChange={(e) =>
                        setLeadTestBranch(e.target.value as typeof leadTestBranch)
                      }
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="FAB">FAB (Aeronáutica)</option>
                      <option value="EB">EB (Exército)</option>
                      <option value="MB">MB (Marinha)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-neutral-400">
                      Posto / Graduação:
                    </label>
                    <input
                      type="text"
                      value={leadTestRank}
                      onChange={(e) => setLeadTestRank(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-neutral-400">
                      Renda Bruta (R$):
                    </label>
                    <input
                      type="number"
                      value={leadTestIncome}
                      onChange={(e) => setLeadTestIncome(Number(e.target.value))}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleTestLeadIngestion}
                  disabled={isIngestingLead}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-neutral-950 shadow-lg shadow-cyan-500/10 transition-all hover:bg-cyan-400 disabled:opacity-50"
                >
                  {isIngestingLead ? (
                    <Activity className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>Disparar Ingestão Autenticada</span>
                </button>

                {/* Resposta da Ingestão */}
                {leadIngestResult && (
                  <div className="animate-in fade-in-0 mt-3 space-y-1.5 rounded-xl border border-cyan-500/30 bg-[#040810] p-3.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between font-bold text-emerald-400">
                      <span>✓ 201 Created</span>
                      <span className="text-[10px] text-neutral-400">
                        {leadIngestResult.timestamp
                          ? leadIngestResult.timestamp.slice(11, 19)
                          : new Date().toLocaleTimeString()}{" "}
                        UTC
                      </span>
                    </div>
                    <div className="text-neutral-300">
                      ID Dossiê:{" "}
                      <strong className="text-cyan-300">
                        {leadIngestResult.dossierId}
                      </strong>
                    </div>
                    <div className="text-neutral-400">
                      Código de Rastreio:{" "}
                      <strong className="text-neutral-200">
                        {leadIngestResult.trackingCode}
                      </strong>
                    </div>
                    <div className="text-neutral-400">
                      Consultor:{" "}
                      <span className="font-bold text-cyan-300">
                        {leadIngestResult.assignedConsultant?.name}
                      </span>{" "}
                      ({leadIngestResult.assignedConsultant?.officeLocation})
                    </div>
                    <div className="text-neutral-400">
                      Status da Fila:{" "}
                      <span className="text-emerald-400 uppercase">
                        {leadIngestResult.queueStatus}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Snippets de Código para Conectar o SiteEcoseg à Cyborg Intelligence */}
          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#060B14] p-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">
                  Exemplos Rápidos de Integração via API Bearer
                </h4>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                cURL & TypeScript
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 font-mono text-xs lg:grid-cols-2">
              {/* cURL Snippet */}
              <div className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="font-bold text-neutral-400">
                    Chamada HTTP com cURL
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `curl -X POST "https://ecoseg-cyborg.local/api/v1/leads/ingest" \\\n  -H "Authorization: Bearer ${activeToken}" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "fullName": "Tenente João Silva",\n    "phone": "(21) 98765-4321",\n    "militaryBranch": "FAB",\n    "rankCategory": "Tenente",\n    "leadSource": "palestra_cta_2026"\n  }'`,
                        "curl-tab7"
                      )
                    }
                    className="flex cursor-pointer items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                  >
                    {copiedStatus === "curl-tab7" ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedStatus === "curl-tab7" ? "Copiado!" : "Copiar"}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto text-[11px] leading-relaxed whitespace-pre-wrap text-neutral-300">
                  {`curl -X POST "https://ecoseg-cyborg.local/api/v1/leads/ingest" \\
  -H "Authorization: Bearer ${activeToken.slice(0, 16)}..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "fullName": "Tenente João Silva",
    "phone": "(21) 98765-4321",
    "militaryBranch": "FAB",
    "rankCategory": "Tenente",
    "leadSource": "palestra_cta_2026"
  }'`}
                </pre>
              </div>

              {/* TypeScript / Node.js Snippet */}
              <div className="space-y-2 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="font-bold text-neutral-400">
                    Node.js / TypeScript Fetch
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `const response = await fetch('/api/v1/leads/ingest', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer ${activeToken}',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify(leadPayload)\n});\nconst result = await response.json();`,
                        "ts-tab7"
                      )
                    }
                    className="flex cursor-pointer items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                  >
                    {copiedStatus === "ts-tab7" ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedStatus === "ts-tab7" ? "Copiado!" : "Copiar"}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto text-[11px] leading-relaxed whitespace-pre-wrap text-neutral-300">
                  {`const response = await fetch('/api/v1/leads/ingest', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${activeToken.slice(0, 16)}...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(leadPayload)
});
const result = await response.json();`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA CRIAR NOVA CHAVE DE API */}
      {showCreateKeyModal && (
        <div className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg space-y-5 rounded-2xl border border-cyan-500/40 bg-[#070D18] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Criar Nova Chave de Acesso API
                </h3>
              </div>
              <button
                onClick={() => setShowCreateKeyModal(false)}
                className="cursor-pointer rounded-lg p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="mb-1.5 block font-medium text-neutral-300">
                  Rótulo / Identificação da Chave:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Integração CRM Parceiro ou App Mobile CTA"
                  value={newKeyLabel}
                  onChange={(e) => setNewKeyLabel(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-medium text-neutral-300">
                  Ambiente de Execução:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewKeyEnv("production")}
                    className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                      newKeyEnv === "production"
                        ? "border-rose-500/50 bg-rose-950/20 text-white"
                        : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className="block text-xs font-bold text-rose-300">
                      Produção (Live)
                    </span>
                    <span className="mt-0.5 block text-[10px] text-neutral-400">
                      Prefixo cyb_live_
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewKeyEnv("sandbox")}
                    className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                      newKeyEnv === "sandbox"
                        ? "border-amber-500/50 bg-amber-950/20 text-white"
                        : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className="block text-xs font-bold text-amber-300">
                      Sandbox / Teste
                    </span>
                    <span className="mt-0.5 block text-[10px] text-neutral-400">
                      Prefixo cyb_test_
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-medium text-neutral-300">
                  Escopos de Permissão Selecionados:
                </label>
                <div className="grid grid-cols-1 gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950/60 p-3 sm:grid-cols-2">
                  {[
                    { id: "leads:ingest" as ApiPermissionScope, label: "leads:ingest" },
                    {
                      id: "quotes:realtime" as ApiPermissionScope,
                      label: "quotes:realtime",
                    },
                    {
                      id: "adherence:calculate" as ApiPermissionScope,
                      label: "adherence:calculate",
                    },
                    { id: "dossier:issue" as ApiPermissionScope, label: "dossier:issue" },
                  ].map((sc) => {
                    const isChecked = newKeyScopes.includes(sc.id);
                    return (
                      <label
                        key={sc.id}
                        className="flex cursor-pointer items-center gap-2 text-[11px] text-neutral-300"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewKeyScopes([...newKeyScopes, sc.id]);
                            } else {
                              setNewKeyScopes(newKeyScopes.filter((s) => s !== sc.id));
                            }
                          }}
                          className="rounded border-neutral-700 bg-neutral-900 text-cyan-500 focus:ring-0"
                        />
                        <span className="font-mono">{sc.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-neutral-800 pt-3">
              <button
                type="button"
                onClick={() => setShowCreateKeyModal(false)}
                className="cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateNewKey}
                disabled={!newKeyLabel.trim()}
                className="cursor-pointer rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-neutral-950 transition-colors hover:bg-cyan-400 disabled:opacity-50"
              >
                Gerar Chave de API
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EMISSÃO DE PARECER TÉCNICO OFICIAL CTA-RJ */}
      {isParecerModalOpen && (
        <div className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[92vh] w-full max-w-4xl space-y-6 overflow-y-auto rounded-2xl border border-cyan-500/40 bg-[#070D16] p-6 shadow-2xl sm:p-8">
            {/* Botão de Fechar */}
            <button
              onClick={() => setIsParecerModalOpen(false)}
              className="absolute top-5 right-5 cursor-pointer rounded-lg bg-neutral-900 p-1.5 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Cabeçalho do Laudo Oficial */}
            <div className="space-y-2 border-b border-neutral-800 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xl font-bold tracking-tight text-white">
                    ECO<span className="font-light text-neutral-300">SEG</span>
                  </span>
                  <span className="text-neutral-500">|</span>
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    CYBORG INTELLIGENCE
                  </span>
                </div>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-400">
                  LAUDO CONSULTIVO PRIVADO · CLUBE DOS TAIFEIROS (CTA-RJ)
                </span>
              </div>

              <h2 className="text-lg font-bold tracking-wide text-white uppercase">
                Parecer Técnico de Diagnóstico e Blindagem Familiar Militar
              </h2>
              <p className="text-xs text-neutral-400">
                Avaliação fundamentada na <strong>Lei nº 13.954/2019</strong>,{" "}
                <strong>Lei nº 6.880/1980</strong> e <strong>STF Tema 1175</strong>.
              </p>
            </div>

            {/* Dados do Militar Avaliado */}
            <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 text-xs sm:grid-cols-4 sm:gap-3">
              <div>
                <span className="block font-mono text-[10px] text-neutral-500 uppercase">
                  Titular:
                </span>
                <span className="font-bold break-words text-white">
                  {currentProfile.fullName}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-neutral-500 uppercase">
                  Posto / Força:
                </span>
                <span className="font-medium text-neutral-200">
                  {currentProfile.rankCategory} · {currentProfile.militaryBranch}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-neutral-500 uppercase">
                  Situação Funcional:
                </span>
                <span className="font-medium text-amber-300 uppercase">
                  {currentProfile.militaryStatus}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-neutral-500 uppercase">
                  Índice de Vulnerabilidade:
                </span>
                <span className="font-mono font-bold text-rose-400">
                  {evaluationResult.overallVulnerabilityScore}% (CRÍTICO)
                </span>
              </div>
            </div>

            {/* Lacunas Mapeadas */}
            <div className="space-y-2 text-xs">
              <h4 className="font-mono text-[11px] font-bold tracking-wider text-neutral-300 uppercase">
                1. Lacunas Legais de Direito Identificadas (Perdas Concretas):
              </h4>
              <div className="space-y-2">
                {evaluationResult.identifiedGaps.map((gap, i) => (
                  <div
                    key={i}
                    className="space-y-1.5 rounded-xl border border-neutral-800 bg-neutral-950 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-400">
                          {gap.code}
                        </span>
                        <span className="font-semibold text-white">{gap.title}</span>
                      </div>
                      <span className="rounded border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-rose-400">
                        {gap.incomeImpact}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400">{gap.summary}</p>
                    <span className="block font-mono text-[10px] text-cyan-400/80">
                      Base: {gap.legalBasis}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soluções Estruturadas Homologadas */}
            <div className="space-y-2 text-xs">
              <h4 className="font-mono text-[11px] font-bold tracking-wider text-neutral-300 uppercase">
                2. Soluções Estruturadas Homologadas (Seguradoras Parceiras):
              </h4>
              <div className="space-y-2">
                {evaluationResult.matchedSolutions.map((sol, i) => (
                  <div
                    key={i}
                    className="space-y-2 rounded-xl border border-cyan-500/30 bg-neutral-950 p-3.5"
                  >
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            {sol.product.nome}
                          </span>
                          <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                            Aderência: {sol.adherenceScore}%
                          </span>
                        </div>
                        <span className="mt-0.5 block text-[11px] text-neutral-400">
                          {sol.product.seguradora} · Processo SUSEP:{" "}
                          {sol.product.processoSusep}
                        </span>
                      </div>
                      <div className="border-t border-neutral-900 pt-1 text-left sm:border-t-0 sm:pt-0 sm:text-right">
                        <span className="block font-mono text-[10px] text-neutral-500">
                          Capital Indicado:
                        </span>
                        <span className="font-mono text-xs font-bold text-white">
                          {sol.suggestedCapitalDisplay}
                        </span>
                      </div>
                    </div>
                    <p className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-2.5 text-[11px] leading-relaxed text-neutral-300">
                      <strong>Racional: </strong>
                      {sol.rationalText}
                    </p>
                    <div className="font-mono text-[11px] text-emerald-400">
                      Anti-Inventário: {sol.antiInventoryAdvantage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificação Oficial de Cotação em Tempo Real via API */}
            {activeRealtimeQuote && (
              <div className="space-y-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span className="font-mono text-[11px] font-bold tracking-wider text-white uppercase">
                      Certificação de Cotação em Tempo Real via API Oficial (SUSEP)
                    </span>
                  </div>
                  <span className="rounded border border-emerald-600/40 bg-emerald-900/60 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                    PREÇO CONGELADO ATÉ{" "}
                    {new Date(activeRealtimeQuote.validUntil).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[11px] sm:grid-cols-4">
                  <div>
                    <span className="block text-[10px] text-neutral-400">
                      Protocolo Oficial:
                    </span>
                    <span className="font-bold text-cyan-300">
                      {activeRealtimeQuote.quoteProtocol}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-400">
                      Seguradora Emissora:
                    </span>
                    <span className="font-bold text-white">
                      {activeRealtimeQuote.insurerName}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-400">
                      Prêmio Mensal com IOF:
                    </span>
                    <span className="font-bold text-emerald-400">
                      R$ {activeRealtimeQuote.pricing.grossMonthlyPremium.toFixed(2)} /
                      mês
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-400">
                      Hash de Auditoria:
                    </span>
                    <span
                      className="block truncate text-neutral-400"
                      title={
                        activeRealtimeQuote.securityVerification.digitalSignatureHash
                      }
                    >
                      {activeRealtimeQuote.securityVerification.digitalSignatureHash.substring(
                        0,
                        16
                      )}
                      ...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Fundamentação e Nota de Desfecho */}
            <div className="space-y-1.5 rounded-xl border border-neutral-800 bg-neutral-900/70 p-3.5 text-xs">
              <span className="block font-mono text-[10px] font-bold text-amber-400 uppercase">
                Fundamentação de Não Judicialização (STF Tema 1175):
              </span>
              <p className="text-[11px] leading-relaxed text-neutral-300">
                Conforme decisão irrecorrível do Supremo Tribunal Federal (STF Tema 1175),
                não cabe ao Poder Judiciário conceder extensão de alíquotas ou revogar os
                efeitos da Lei nº 13.954/2019 sob o argumento de isonomia. A recomposição
                de proventos e a garantia de sustento das filhas dependem exclusivamente
                de contratação de apólice privada com blindagem sob o Art. 794 do Código
                Civil.
              </p>
            </div>

            {/* Assinaturas */}
            <div className="grid grid-cols-1 gap-6 border-t border-neutral-800 pt-4 text-xs sm:grid-cols-2 sm:gap-8">
              <div className="space-y-1 text-center sm:text-left">
                <div className="mx-auto mb-2 w-48 border-b border-neutral-700 sm:mx-0" />
                <span className="block font-bold text-white">
                  {CONSULTANT_JOAO_BRITO.name}
                </span>
                <span className="block text-[11px] text-neutral-400">
                  Consultor Especialista · Registro{" "}
                  {CONSULTANT_JOAO_BRITO.registrationNumber}
                </span>
                <span className="block text-[10px] text-neutral-500">
                  ECOSEG / Base Operacional CTA-RJ
                </span>
              </div>

              <div className="space-y-1 text-center sm:text-right">
                <div className="mx-auto mb-2 w-48 border-b border-neutral-700 sm:ml-auto" />
                <span className="block font-bold text-white">
                  {currentProfile.fullName}
                </span>
                <span className="block text-[11px] text-neutral-400">
                  Titular / Declarante
                </span>
                <span className="block text-[10px] text-neutral-500">
                  Data: {new Date().toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>

            {/* Ações do Rodapé do Modal - Adaptado para Mobile */}
            <div className="flex flex-col-reverse items-stretch justify-end gap-2.5 border-t border-neutral-800 pt-4 sm:flex-row sm:items-center">
              <button
                onClick={() => setIsParecerModalOpen(false)}
                className="cursor-pointer rounded-xl bg-neutral-900 px-4 py-2.5 text-center text-xs font-semibold text-neutral-300 transition-colors hover:bg-neutral-800"
              >
                Fechar
              </button>
              <button
                onClick={handlePrintParecer}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-400 active:scale-95"
              >
                <Printer className="h-4 w-4" />
                <span>Imprimir Laudo Oficial (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE INSPEÇÃO DE PAYLOAD JSON DA API */}
      {showPayloadModal && payloadModalData && (
        <div className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto rounded-2xl border border-cyan-500/40 bg-[#050B14] p-5 font-mono text-xs shadow-2xl sm:p-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Recibo & Payload Oficial da Cotação (JSON)
                </h3>
              </div>
              <button
                onClick={() => setShowPayloadModal(false)}
                className="cursor-pointer rounded-lg bg-neutral-900 p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span>
                Protocolo:{" "}
                <strong className="text-cyan-300">
                  {payloadModalData.quoteProtocol}
                </strong>
              </span>
              <span>
                Emissão: {new Date(payloadModalData.createdAt).toLocaleString("pt-BR")}
              </span>
            </div>

            <div className="max-h-[400px] overflow-x-auto rounded-xl border border-neutral-800 bg-[#020509] p-4 text-[11px] text-emerald-300">
              <pre>{JSON.stringify(payloadModalData, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-neutral-800 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(payloadModalData, null, 2)
                  );
                  setCopiedStatus("payload");
                  setTimeout(() => setCopiedStatus(null), 2000);
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-neutral-800"
              >
                {copiedStatus === "payload" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copiedStatus === "payload" ? "Copiado!" : "Copiar JSON"}</span>
              </button>
              <button
                onClick={() => setShowPayloadModal(false)}
                className="cursor-pointer rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-bold text-neutral-950 hover:bg-cyan-400"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
