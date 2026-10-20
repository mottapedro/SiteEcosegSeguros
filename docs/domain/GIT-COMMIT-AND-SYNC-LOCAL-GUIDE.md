# Guia de Atualização do Repositório & Commits no GitHub (Agent Local)

## Projeto: ECOSEG (SiteEcoseg) & Cyborg Intelligence

**Data:** 2026-10-20  
**Ambiente:** `H:/Projetos/SiteEcoseg` (Repositório Local / GitHub)  
**Padrão:** Conventional Commits (Semver & ADR Compliance)

---

## 1. Passo a Passo de Sincronização Local

Abra o terminal na raiz do projeto (`H:/Projetos/SiteEcoseg`) e execute:

```bash
# 1. Extrair o pacote sincronizado com todas as correções e novidades
tar -zxvf ecoseg-cyborg-local-bundle.tar.gz

# 2. Verificar arquivos modificados e adicionados
git status
```

---

## 2. Estrutura dos Arquivos Modificados / Adicionados

- **Módulo de Licenciamento & Credenciais API (ADR 0009):**
  - `src/domain/contracts/cyborg-license-credentials.ts`
  - `src/services/cyborgLicenseService.ts`
  - `src/components/cyborg/CyborgIntelligenceWorkspace.tsx`
  - `docs/adr/0009-cyborg-intelligence-api-licensing-credentials.md`
  - `docs/domain/CYBORG-INTELLIGENCE-SAAS-SPEC.md`
  - `docs/domain/LOCAL-AGENT-CYBORG-LICENSE-IMPLEMENTATION-GUIDE.md`

- **Layout, Eixos X/Y e Espaçamentos do Header & Footer:**
  - `src/components/layout/header.tsx`
  - `src/components/layout/footer.tsx`

- **Padronização de Marca (Remoção do E Azul):**
  - `src/components/brand/EcoSegLogo.tsx`
  - `src/components/EcoSegLogo.tsx`

- **Configurações e Pacote:**
  - `.env.example`
  - `ecoseg-cyborg-local-bundle.tar.gz`

---

## 3. Estratégia de Commits para o GitHub

Recomendamos **duas opções** para o agent local:

### Opção A: Commits Granulares em 3 Etapas (Recomendada para Histórico Limpo)

#### Commit 1: Identidade Visual e Remoção do E Azul

```bash
git add src/components/brand/EcoSegLogo.tsx src/components/EcoSegLogo.tsx
git commit -m "fix(brand): remove blue 'E' and unify ECOSEG wordmark in official brass/white palette"
```

#### Commit 2: Ajuste de Eixos X/Y, Espaçamentos e Header Responsivo

```bash
git add src/components/layout/header.tsx src/components/layout/footer.tsx
git commit -m "style(layout): refine header and footer X/Y axis, prevent text wrap and add mobile menu"
```

#### Commit 3: Licença B2B Cyborg Intelligence & Credenciais de Acesso API

```bash
git add src/domain/contracts/cyborg-license-credentials.ts \
        src/services/cyborgLicenseService.ts \
        src/components/cyborg/CyborgIntelligenceWorkspace.tsx \
        docs/adr/0009-cyborg-intelligence-api-licensing-credentials.md \
        docs/domain/ \
        .env.example
git commit -m "feat(cyborg): implement B2B API license credentials, token validation, and rotation (ADR 0009)"
```

#### Envio para o GitHub:

```bash
git push origin main
# ou: git push origin develop / nome-da-branch
```

---

### Opção B: Commit Único Consolidado (Atômico)

Caso prefira enviar todas as sincronizações em um único commit coeso:

```bash
git add .
git commit -m "feat(ecosystem): integrate Cyborg API credentials, refine layout X/Y axis, and unify brand logo" -m "- Implement B2B API license governance and token rotation (ADR 0009)
- Add interactive credential validator and lead ingestion simulator in Cyborg Workspace Tab 7
- Refine header and footer X/Y axis with whitespace-nowrap and mobile responsive drawer
- Remove blue 'E' from EcoSegLogo and unify typography in official brand color
- Update Next.js local implementation guide and synchronization bundle"

git push origin main
```

---

## 4. Validação Pré-Push

Antes de dar o `push`, execute:

```bash
# Validar tipagem TypeScript e compilação Next.js
pnpm build
# ou: npm run build

# Validar regras de lint
pnpm lint
# ou: npm run lint
```
