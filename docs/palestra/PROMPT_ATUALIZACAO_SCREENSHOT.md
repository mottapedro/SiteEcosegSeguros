# Atualização do catálogo visual da palestra

## Escopo

A seção `#catalogo-protecao` em `src/components/PublicLectureLandingPage.tsx` exibe cinco soluções visuais GBOEX/MAG na grade `xl:grid-cols-5`.

Cada card possui:

- foto conceitual local em `public/assets/aistudio/`;
- encarte oficial em alta resolução e thumbnail;
- alternância local `Ver Cartaz` / `Ver Foto`;
- processo SUSEP, público-alvo e destaques;
- ação `Simular` com mensagem pré-formatada para o WhatsApp oficial.

## Controles visuais

- `Visão conceitual` e `Encartes oficiais` alternam todos os cards;
- a alternância no canto do card altera somente aquele item;
- `Detalhes` abre o lightbox com abas `Foto conceitual` e `Cartaz SUSEP`;
- o lightbox oferece zoom entre 100% e 250%.

## Assets de lifestyle

```text
public/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4_65e3c9b1.jfif
public/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4__1__f11c3e37.jfif
public/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4__2__af30c189.jfif
public/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4__3__53d3b87e.jfif
public/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4__4__b11a0676.jfif
```

## Validação local

```bash
npm run lint
npm run build
```
