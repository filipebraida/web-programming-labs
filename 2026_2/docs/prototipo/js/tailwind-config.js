// =====================================================================
// Configuração compartilhada do Tailwind (CDN)
// Carregar logo após o script do Tailwind.
// As cores ficam em variáveis CSS: para mudar a paleta, edite só o objeto TEMA.
// Paleta baseada no Manual de Identidade Visual da UFRRJ.
// =====================================================================

// Tema claro: fundo branco (uso preferencial da marca no manual) com destaque no Azul Rural
const TEMA = {
  brand: '#004388', 'brand-hover': '#0072AB', 'brand-contraste': '#FFFFFF', 'texto-forte': '#0B1B33',
  rural: { 50: '#0B1B33', 100: '#14253F', 200: '#2A3B55', 300: '#45556E', 400: '#5D6B80', 500: '#7A8698',
           600: '#B4BECC', 700: '#D3DAE4', 800: '#E4E9F0', 900: '#F3F5F9', 950: '#FFFFFF' },
};

(function aplicarTema(t) {
  const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ');
  const raiz = document.documentElement.style;
  for (const chave of ['brand', 'brand-hover', 'brand-contraste', 'texto-forte']) raiz.setProperty(`--${chave}`, rgb(t[chave]));
  for (const [tom, hex] of Object.entries(t.rural)) raiz.setProperty(`--rural-${tom}`, rgb(hex));
})(TEMA);

const cor = (nome) => `rgb(var(--${nome}) / <alpha-value>)`;

tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Lato', 'Calibri', 'sans-serif'],
        sans: ['Lato', 'Calibri', 'sans-serif'],
      },
      colors: {
        white: cor('texto-forte'), // "texto forte" do tema (branco no escuro, quase preto no claro)
        brand: { DEFAULT: cor('brand'), hover: cor('brand-hover'), contraste: cor('brand-contraste') },
        azul: '#004388', verde: '#008244', amarelo: '#FFCC00', // cores principais UFRRJ (fixas)
        rural: Object.fromEntries(Object.keys(TEMA.rural).map((tom) => [tom, cor(`rural-${tom}`)])),
      },
    },
  },
};
