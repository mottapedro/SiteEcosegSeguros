# Backlog

Itens conhecidos, não priorizados por sprint — ver `docs/roadmap.md` para
sequenciamento por fase.

## Conteúdo

- [ ] Copy definitiva revisada por especialista em seguros (textos atuais são
      placeholders realistas, não aprovados juridicamente).
- [ ] Fotografia real (empresas, profissionais, patrimônio) substituindo qualquer
      placeholder visual, conforme diretriz de imagens do Brand Book.
- [ ] Depoimentos reais de clientes (com autorização de uso de nome/imagem).
- [ ] Logos reais dos parceiros/seguradoras (uso da marca de terceiros exige
      autorização).

## Produto

- [ ] Página `/empresa` com equipe.
- [ ] Páginas dedicadas de produto (`/servicos/*`) com FAQ e casos de uso extensos.
- [ ] Blog com categorias (Educação Financeira, Prevenção de Riscos).
- [ ] Newsletter (captura + integração com ferramenta de e-mail marketing).

## Técnico

- [ ] Captcha real (Turnstile/hCaptcha) no formulário de contato.
- [ ] Rate limit durável (Upstash) substituindo o in-memory (`src/lib/rate-limit.ts`)
      antes de deploy multi-instância.
- [ ] Testes automatizados (Vitest/Playwright).
- [ ] Variáveis de ambiente documentadas em `.env.example` (`RESEND_API_KEY`).
- [ ] Analytics (GA4/GTM) e banner de cookies (LGPD).
