"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Plus,
  RefreshCw,
  Send,
  BadgeCheck,
  X,
} from "lucide-react";
import type {
  CreateApiKeyRequest,
  CredentialValidationResult,
  CyborgLicenseSnapshot,
  RotateApiKeyResult,
  IngestLeadResult,
} from "@/domain/contracts/cyborg-license-credentials";
import {
  createApiKey,
  getActiveToken,
  getLicense,
  ingestLead,
  rotateApiKey,
  setActiveToken,
  validateToken,
} from "@/services/cyborgLicenseService";

const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR").format(value);
const formatDate = (value: string) => new Date(value).toLocaleDateString("pt-BR");

export function CyborgLicenseCredentialsPanel() {
  const [license, setLicense] = useState<CyborgLicenseSnapshot | null>(null);
  const [activeToken, setActiveTokenState] = useState("");
  const [selectedKeyId, setSelectedKeyId] = useState("");
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const [validation, setValidation] = useState<CredentialValidationResult | null>(null);
  const [ingestion, setIngestion] = useState<IngestLeadResult | null>(null);
  const [issuedToken, setIssuedToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<CreateApiKeyRequest>({
    label: "Integração CTA",
    environment: "sandbox",
    scopes: ["leads:ingest", "consultant:read"],
  });

  useEffect(() => {
    let isMounted = true;
    Promise.all([getLicense(), Promise.resolve(getActiveToken())]).then(
      ([nextLicense, token]) => {
        if (!isMounted) return;
        setLicense(nextLicense);
        setActiveTokenState(token);
        setSelectedKeyId(nextLicense.apiKeys[0]?.id || "");
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedKey = useMemo(
    () => license?.apiKeys.find((key) => key.id === selectedKeyId),
    [license, selectedKeyId]
  );

  const copyValue = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1800);
  };

  const handleValidate = async () => {
    setIsBusy(true);
    setValidation(await validateToken(activeToken));
    setIsBusy(false);
  };

  const handleRotate = async () => {
    if (!selectedKey) return;
    setIsBusy(true);
    try {
      const result: RotateApiKeyResult = await rotateApiKey(selectedKey.id);
      setActiveTokenState(setActiveToken(result.rawToken));
      setIssuedToken(result.rawToken);
      setSelectedKeyId(result.key.id);
      setLicense(await getLicense());
      setValidation(null);
    } finally {
      setIsBusy(false);
    }
  };

  const handleCreate = async () => {
    setIsBusy(true);
    try {
      const result = await createApiKey(createForm);
      setActiveTokenState(setActiveToken(result.rawToken));
      setIssuedToken(result.rawToken);
      setSelectedKeyId(result.key.id);
      setLicense(await getLicense());
      setIsCreateOpen(false);
    } finally {
      setIsBusy(false);
    }
  };

  const handleIngest = async () => {
    setIsBusy(true);
    try {
      setIngestion(
        await ingestLead(
          {
            leadSource: "palestra_cta_2026",
            fullName: "Lead de teste CTA-RJ",
            phone: "(21) 99999-0000",
            email: "sandbox@ecoseg.com.br",
            militaryBranch: "FAB",
            rankCategory: "Suboficial Taifeiro",
            militaryStatus: "reserva",
            entryYear: 1988,
            mainConcern: "pensao_filhas_lei_13954",
            lgpdConsent: {
              accepted: true,
              timestamp: new Date().toISOString(),
              legalBasis: "Art. 7, V e IX da Lei 13.709/2018",
              policyVersion: "1.0.0",
            },
          },
          activeToken
        )
      );
      setLicense(await getLicense());
    } finally {
      setIsBusy(false);
    }
  };

  if (isLoading || !license) {
    return (
      <div className="h-64 animate-pulse rounded-2xl border border-cyan-500/20 bg-[#071321]" />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-[#071321] via-[#09192a] to-[#071321] p-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider uppercase">
            <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-cyan-300">
              Cyborg Intelligence · B2B SaaS Gateway
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
              Licença ativa
            </span>
          </div>
          <h3 className="flex items-center gap-2 text-xl font-bold text-white">
            <KeyRound className="h-5 w-5 text-cyan-400" />
            Licença Enterprise Piloto & Credenciais de Acesso API
          </h3>
          <p className="mt-1 max-w-3xl text-xs leading-relaxed text-neutral-400">
            Governança de tokens Bearer, assinatura de webhook e quotas para a operação
            ECOSEG no Clube dos Taifeiros (CTA-RJ).
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleValidate}
            disabled={isBusy || !activeToken}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-cyan-500 px-3.5 py-2.5 text-xs font-bold text-neutral-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isBusy ? "animate-spin" : ""}`} />
            Validar token ativo
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-cyan-500/40 bg-neutral-950 px-3.5 py-2.5 text-xs font-bold text-cyan-300 transition-colors hover:bg-cyan-500/10"
          >
            <Plus className="h-3.5 w-3.5" />
            Nova chave
          </button>
        </div>
      </div>

      <section className="space-y-5 rounded-2xl border border-cyan-500/40 bg-[#071321] p-5 shadow-xl">
        <div className="flex flex-col justify-between gap-3 border-b border-neutral-800 pb-4 sm:flex-row sm:items-start">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
              Certificado de concessão de licença B2B
            </p>
            <h4 className="mt-1 text-lg font-bold text-white">
              {license.organizationName}
            </h4>
            <p className="text-xs text-neutral-400">
              CNPJ:{" "}
              <span className="font-mono text-neutral-200">
                {license.organizationTaxId}
              </span>
              <span className="mx-2">·</span>
              Base operacional:{" "}
              <span className="text-cyan-300">{license.operationalBase}</span>
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="font-mono text-[10px] text-neutral-500 uppercase">
              ID da licença oficial
            </p>
            <p className="mt-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-sm font-bold text-cyan-300">
              {license.licenseId}
            </p>
            <p className="mt-1 text-[11px] text-neutral-500">
              Emissão: {formatDate(license.issuedAt)} · Validade:{" "}
              {formatDate(license.expiresAt)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-neutral-800 bg-[#050b14] p-4">
            <p className="font-mono text-[10px] text-neutral-500 uppercase">
              Autoridade & assinatura digital
            </p>
            <p className="mt-2 text-xs text-neutral-400">Autoridade:</p>
            <p className="font-mono text-xs font-bold text-cyan-300">
              {license.certificateAuthority}
            </p>
            <p className="mt-2 text-xs text-neutral-400">
              SLA garantido:{" "}
              <strong className="text-emerald-400">{license.guaranteedSla}</strong>
            </p>
            <p className="mt-3 rounded border border-neutral-800 bg-neutral-950 p-2 font-mono text-[10px] break-all text-neutral-500">
              {license.certificateHash}
            </p>
          </div>
          {license.quotas.map((quota) => {
            const percent = Math.min(
              100,
              Math.round((quota.consumed / quota.limit) * 100)
            );
            return (
              <div
                key={quota.key}
                className="rounded-xl border border-neutral-800 bg-[#050b14] p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[10px] text-neutral-500 uppercase">
                    Quota de {quota.key}
                  </p>
                  <span className="font-mono text-[10px] font-bold text-cyan-300">
                    {percent}% consumido
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">
                  {formatNumber(quota.consumed)}
                </p>
                <p className="font-mono text-[11px] text-neutral-400">
                  limite: {formatNumber(quota.limit)} {quota.unit}
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                    style={{ width: `${Math.max(2, percent)}%` }}
                  />
                </div>
                <p className="mt-2 text-[10px] text-neutral-500">
                  Renovação: {formatDate(quota.resetAt)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-cyan-500/20 bg-[#050b14] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
              Escopos autorizados
            </span>
            {license.scopes.map((scope) => (
              <span
                key={scope}
                className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 font-mono text-[10px] text-cyan-300"
              >
                ✓ {scope}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-white">
              <KeyRound className="h-4 w-4 text-cyan-400" />
              Tokens de acesso & chaves criptográficas de API
            </h4>
            <p className="text-xs text-neutral-500">
              O token ativo é enviado apenas em requisições autenticadas ao gateway.
            </p>
          </div>
          <span className="font-mono text-[11px] text-neutral-400">
            Token selecionado:{" "}
            <strong className="text-cyan-300">
              {isTokenVisible
                ? activeToken
                : `${activeToken.slice(0, 14)}...${activeToken.slice(-4)}`}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {license.apiKeys.map((key) => (
            <div
              key={key.id}
              className={`rounded-xl border p-4 transition-colors ${selectedKeyId === key.id ? "border-cyan-500/50 bg-cyan-500/5" : "border-neutral-800 bg-neutral-900/60"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-white">{key.label}</p>
                  <p className="mt-1 font-mono text-[10px] text-neutral-500">
                    {key.environment} · {key.status} · expira {formatDate(key.expiresAt)}
                  </p>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                  {key.status}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 p-2">
                <code className="min-w-0 flex-1 truncate text-[11px] text-cyan-300">
                  {selectedKeyId === key.id && isTokenVisible
                    ? activeToken
                    : key.tokenPreview}
                </code>
                <button
                  onClick={() => {
                    setSelectedKeyId(key.id);
                    if (key.environment === "sandbox")
                      setActiveTokenState(setActiveToken("cyb_test_ecoseg_demo_2026"));
                  }}
                  className="cursor-pointer rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  title="Selecionar chave"
                >
                  <Check
                    className={`h-3.5 w-3.5 ${selectedKeyId === key.id ? "text-emerald-400" : "opacity-30"}`}
                  />
                </button>
                {selectedKeyId === key.id && (
                  <button
                    onClick={() => setIsTokenVisible((value) => !value)}
                    className="cursor-pointer rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    title="Mostrar ou ocultar token"
                  >
                    {isTokenVisible ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
                <button
                  onClick={() =>
                    copyValue(
                      selectedKeyId === key.id ? activeToken : key.tokenPreview,
                      key.id
                    )
                  }
                  className="cursor-pointer rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  title="Copiar token"
                >
                  {copied === key.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {key.scopes.slice(0, 4).map((scope) => (
                  <span
                    key={scope}
                    className="rounded border border-neutral-800 px-1.5 py-0.5 font-mono text-[9px] text-neutral-400"
                  >
                    {scope}
                  </span>
                ))}
              </div>
              {selectedKeyId === key.id && (
                <button
                  onClick={handleRotate}
                  disabled={isBusy}
                  className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-amber-500/30 px-2.5 py-1.5 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/10 disabled:opacity-50"
                >
                  <RefreshCw className="h-3 w-3" /> Rotacionar chave
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <LockKeyhole className="mt-0.5 h-4 w-4 text-amber-400" />
            <div>
              <p className="text-xs font-bold text-amber-300">Webhook HMAC Secret</p>
              <code className="font-mono text-[11px] text-neutral-400">
                {license.webhookSecretPreview}
              </code>
              <p className="mt-1 text-[10px] text-neutral-500">
                Cabeçalho de validação: {license.webhookSignatureHeader}
              </p>
            </div>
          </div>
          <button
            onClick={() => copyValue(license.webhookSignatureHeader, "webhook")}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-1.5 text-[11px] text-neutral-300 hover:bg-neutral-900"
          >
            {copied === "webhook" ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}{" "}
            Copiar cabeçalho
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white">Console de validação</h4>
              <p className="text-xs text-neutral-500">
                Teste a credencial ativa contra o gateway local.
              </p>
            </div>
            <BadgeCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={activeToken}
              onChange={(event) => setActiveTokenState(event.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 font-mono text-xs text-cyan-300 outline-none focus:border-cyan-500"
              aria-label="Token ativo"
            />
            <button
              onClick={handleValidate}
              disabled={isBusy}
              className="cursor-pointer rounded-lg bg-cyan-500 px-3 py-2 text-xs font-bold text-neutral-950 hover:bg-cyan-400 disabled:opacity-50"
            >
              Validar
            </button>
          </div>
          {validation && (
            <div
              className={`mt-3 rounded-lg border p-3 text-xs ${validation.valid ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}
            >
              <p className={validation.valid ? "text-emerald-300" : "text-red-300"}>
                {validation.valid ? "200 · " : "401 · "}
                {validation.message}
              </p>
              <p className="mt-1 font-mono text-[10px] text-neutral-500">
                RTT {validation.latencyMs}ms · {validation.tokenPreview}
              </p>
            </div>
          )}
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white">
                Simulador de ingestão autenticada
              </h4>
              <p className="text-xs text-neutral-500">
                Envia um lead de teste com consentimento LGPD.
              </p>
            </div>
            <Send className="h-5 w-5 text-cyan-400" />
          </div>
          <button
            onClick={handleIngest}
            disabled={isBusy || !activeToken}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" /> Disparar lead sandbox
          </button>
          {ingestion && (
            <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs">
              <p className="font-semibold text-emerald-300">
                Lead enfileirado com sucesso
              </p>
              <p className="mt-1 font-mono text-[10px] text-neutral-400">
                {ingestion.dossierId} · {ingestion.auditProtocol}
              </p>
            </div>
          )}
        </div>
      </section>

      {issuedToken && (
        <div className="flex flex-col justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold text-emerald-300">
              Credencial emitida — copie agora
            </p>
            <p className="text-[11px] text-neutral-400">
              Por segurança, o token completo é exibido somente nesta sessão.
            </p>
          </div>
          <button
            onClick={() => copyValue(issuedToken, "issued")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-400 px-3 py-2 font-mono text-[11px] font-bold text-neutral-950"
          >
            {copied === "issued" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}{" "}
            {copied === "issued" ? "Copiado" : issuedToken}
          </button>
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg space-y-4 rounded-2xl border border-cyan-500/40 bg-[#071321] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                <KeyRound className="h-4 w-4 text-cyan-400" /> Emitir nova chave
              </h4>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="cursor-pointer rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <label className="block text-xs text-neutral-400">
              Nome da integração
              <input
                value={createForm.label}
                onChange={(event) =>
                  setCreateForm({ ...createForm, label: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              />
            </label>
            <label className="block text-xs text-neutral-400">
              Ambiente
              <select
                value={createForm.environment}
                onChange={(event) =>
                  setCreateForm({
                    ...createForm,
                    environment: event.target.value as CreateApiKeyRequest["environment"],
                  })
                }
                className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              >
                <option value="sandbox">Sandbox</option>
                <option value="production">Produção</option>
              </select>
            </label>
            <div className="flex justify-end gap-2 border-t border-neutral-800 pt-3">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="cursor-pointer rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                disabled={isBusy || !createForm.label.trim()}
                className="cursor-pointer rounded-lg bg-cyan-500 px-3 py-2 text-xs font-bold text-neutral-950 disabled:opacity-50"
              >
                Emitir credencial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
