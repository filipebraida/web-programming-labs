// =====================================================================
// RuralStream — layout compartilhado (menu lateral + barra inferior)
// Uso: <body data-pagina="inicio"> ... <script src="js/layout.js"></script>
// =====================================================================

const ICONES = {
  inicio: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  enviar: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/>',
  perfil: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  usuarios: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2.5.5 4 2.3 4 5.5"/>',
  sair: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3"/>',
  coracao: '<path d="M12 20s-7-4.5-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
  comentario: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  compartilhar: '<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/>',
  olho: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  play: '<path d="M7 4v16l13-8z" fill="currentColor"/>',
  voltar: '<path d="m15 18-6-6 6-6"/>',
  chevron: '<path d="m6 15 6-6 6 6"/>',
  editar: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  videos: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor"/>',
  som: '<path d="M11 5 6 9H2v6h4l5 4zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
  mudo: '<path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/>',
};

function icone(nome, classes = 'w-5 h-5') {
  return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONES[nome]}</svg>`;
}

function logo(tamanho = 'text-xl') {
  return `<a href="index.html" class="flex items-center gap-2 font-display font-bold ${tamanho} tracking-tight text-white">
    <span class="grid place-items-center w-8 h-8 rounded-lg bg-brand text-brand-contraste">${icone('play', 'w-4 h-4')}</span>
    Rural<span class="text-brand -ml-2">Stream</span>
  </a>`;
}

function avatar(usuario, tamanho = 'w-10 h-10 text-sm') {
  return `<span class="inline-grid place-items-center shrink-0 rounded-full font-semibold text-[#fff] ${tamanho}" style="background:${corPorId(usuario.id + 3)}">${iniciais(usuario.nome)}</span>`;
}

// Card vertical (9:16) de um vídeo — usado em Início, Busca e Perfil
function cardVideo(v, { mostrarAutor = true } = {}) {
  const autor = buscarUsuario(v.autorId);
  return `<a href="assistir.html?id=${v.id}" class="group block" data-video-card>
    <div class="relative aspect-[9/16] rounded-xl overflow-hidden" style="background:${corPorId(v.id)}">
      <video class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity" muted loop playsinline preload="none" data-src="${v.src}"></video>
      <span class="absolute inset-0 grid place-items-center text-[#fff]/40 group-hover:opacity-0 transition-opacity">${icone('play', 'w-10 h-10')}</span>
      <div class="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/80 to-transparent">
        <div class="flex items-center gap-1 text-xs text-[#fff]">${icone('olho', 'w-3.5 h-3.5')} ${formatarNumero(v.visualizacoes)}</div>
      </div>
      <span class="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-[11px] font-medium text-[#fff]">${formatarDuracao(v.duracao)}</span>
    </div>
    <h3 class="mt-2 text-sm font-medium text-rural-100 leading-snug line-clamp-2">${v.titulo}</h3>
    ${mostrarAutor && autor ? `<p class="mt-0.5 text-xs text-rural-400">@${autor.usuario} · ${tempoRelativo(v.criadoEm)}</p>` : `<p class="mt-0.5 text-xs text-rural-400">${tempoRelativo(v.criadoEm)}</p>`}
  </a>`;
}

// Prévia ao passar o mouse nos cards (carrega o vídeo só quando necessário)
document.addEventListener('mouseover', (e) => {
  const card = e.target.closest('[data-video-card]');
  if (!card || card.dataset.ativo) return;
  card.dataset.ativo = '1';
  const video = card.querySelector('video');
  if (!video.src) video.src = video.dataset.src;
  video.play().catch(() => {});
  card.addEventListener('mouseleave', () => { video.pause(); delete card.dataset.ativo; }, { once: true });
});

function montarLayout() {
  const pagina = document.body.dataset.pagina;
  const ehAdmin = SESSAO.papel === 'admin';

  // Menu principal (todos os usuários logados)
  const principal = [
    { id: 'inicio', rotulo: 'Início', href: 'index.html' },
    { id: 'busca', rotulo: 'Buscar', href: 'busca.html' },
    { id: 'enviar', rotulo: 'Enviar vídeo', href: 'enviar.html' },
    { id: 'perfil', rotulo: 'Meu perfil', href: 'perfil.html' },
  ];
  // Backoffice (somente admin)
  const administracao = [
    { id: 'usuarios', rotulo: 'Usuários', href: 'admin-usuarios.html' },
    { id: 'videos', rotulo: 'Vídeos', href: 'admin-videos.html' },
  ];

  const link = (i) => `
    <a href="${i.href}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${i.id === pagina ? 'bg-rural-800 text-white' : 'text-rural-400 hover:text-white hover:bg-rural-900'}">
      ${icone(i.id, `w-5 h-5 ${i.id === pagina ? 'text-brand' : ''}`)} ${i.rotulo}
    </a>`;

  const inferior = [...principal, ...(ehAdmin ? [{ id: 'usuarios', rotulo: 'Admin', href: 'admin-usuarios.html' }] : [])]
    .map((i) => `
    <a href="${i.href}" class="flex flex-col items-center gap-1 py-2 text-[11px] ${i.id === pagina ? 'text-brand' : 'text-rural-400'}">
      ${icone(i.id, 'w-6 h-6')} ${({ enviar: 'Enviar', perfil: 'Perfil', usuarios: 'Admin' })[i.id] || i.rotulo}
    </a>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <aside class="hidden md:flex fixed inset-y-0 left-0 z-30 w-60 flex-col border-r border-rural-800 bg-rural-950 px-4 py-5">
      <div class="px-2 mb-8">${logo()}</div>

      <nav class="flex flex-col gap-1">${principal.map(link).join('')}</nav>

      ${ehAdmin ? `
      <p class="mt-8 mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-rural-500">Administração</p>
      <nav class="flex flex-col gap-1">${administracao.map(link).join('')}</nav>` : ''}

      <!-- Rodapé: usuário logado + sair -->
      <div class="mt-auto pt-4 border-t border-rural-800 ">
        <div class="flex items-center gap-3 px-2">
          ${avatar(SESSAO, 'w-9 h-9 text-xs')}
          <span class="flex-1 min-w-0">
            <span class="block text-sm font-medium text-white truncate">${SESSAO.nome}</span>
            <span class="block text-xs text-rural-400 truncate">@${SESSAO.usuario}</span>
          </span>
          <a href="login.html" title="Sair" aria-label="Sair" class="grid place-items-center w-9 h-9 rounded-lg text-rural-400 hover:text-white hover:bg-rural-900">${icone('sair', 'w-5 h-5')}</a>
        </div>
      </div>
    </aside>
    <nav class="md:hidden fixed bottom-0 inset-x-0 z-30 grid ${ehAdmin ? 'grid-cols-5' : 'grid-cols-4'} border-t border-rural-800 bg-rural-950/95 backdrop-blur">${inferior}</nav>
  `);
}

montarLayout();
