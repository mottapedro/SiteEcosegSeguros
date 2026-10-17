# Footer implementation

O Footer usa a marca arquitetônica oficial da EcoSeg por meio do componente
`EcoSegLogo`, substituindo o ícone genérico `ShieldCheck`.

## Marca

`src/components/brand/EcoSegLogo.tsx` renderiza o monograma vetorial em SVG,
sem dependências externas, com suporte a:

- `size`: dimensão do símbolo em pixels;
- `finish="brass"`: acabamento Imperial Brass padrão;
- `finish="platinum"`: acabamento metálico claro alternativo;
- `tagline`: chancela opcional exibida abaixo de ECOSEG.

O gradiente recebe um identificador único por instância para evitar colisões
quando a marca aparece simultaneamente no Header e no Footer.

## Uso no Footer

O Footer mantém as colunas de Serviços e Empresa, o contato institucional e a
identificação `ADR-B-001 Compreensão` / `DES-006 Anti-Clichê`. A marca é linkada
para a Home e usa a chancela oficial:

```tsx
<EcoSegLogo size={36} finish="brass" tagline="PLANEJAMENTO & PROTEÇÃO PATRIMONIAL" />
```
