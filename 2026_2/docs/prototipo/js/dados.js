// =====================================================================
// RuralStream — dados de exemplo (mock)
// Em sala: substituir por chamadas à API, ex: fetch('/api/videos')
// =====================================================================

const USUARIOS = [
  { id: 1, nome: 'Ana Beatriz Souza', usuario: 'anabia', email: 'ana.souza@rural.edu.br', bio: 'Agronomia 6º período. Vídeos sobre campo, solo e café coado.', papel: 'admin', status: 'ativo', criadoEm: '2025-02-10' },
  { id: 2, nome: 'Carlos Henrique Lima', usuario: 'carlinhos.dev', email: 'carlos.lima@rural.edu.br', bio: 'Sistemas de Informação. Código em 60 segundos.', papel: 'usuario', status: 'ativo', criadoEm: '2025-03-02' },
  { id: 3, nome: 'Juliana Ferreira', usuario: 'jufer', email: 'juliana.f@rural.edu.br', bio: 'Zootecnia e muitos bichos.', papel: 'usuario', status: 'ativo', criadoEm: '2025-03-15' },
  { id: 4, nome: 'Pedro Alves', usuario: 'pedroalves', email: 'pedro.alves@rural.edu.br', bio: 'Engenharia Florestal. Trilhas e mudas.', papel: 'usuario', status: 'suspenso', criadoEm: '2025-04-01' },
  { id: 5, nome: 'Mariana Costa', usuario: 'mari.costa', email: 'mari.costa@rural.edu.br', bio: 'Medicina Veterinária. Rotina do hospital escola.', papel: 'usuario', status: 'ativo', criadoEm: '2025-04-20' },
  { id: 6, nome: 'Rafael Nogueira', usuario: 'rafa.ng', email: 'rafael.n@rural.edu.br', bio: 'Licenciatura em Computação.', papel: 'moderador', status: 'ativo', criadoEm: '2025-05-05' },
  { id: 7, nome: 'Letícia Ramos', usuario: 'leti', email: 'leticia.r@rural.edu.br', bio: 'Engenharia de Alimentos. Receitas com ciência.', papel: 'usuario', status: 'ativo', criadoEm: '2025-06-11' },
  { id: 8, nome: 'Thiago Martins', usuario: 'thiagom', email: 'thiago.m@rural.edu.br', bio: '', papel: 'usuario', status: 'pendente', criadoEm: '2025-08-30' },
  { id: 9, nome: 'Fernanda Rocha', usuario: 'fe.rocha', email: 'fernanda.r@rural.edu.br', bio: 'Biologia. Microscópio é vida.', papel: 'usuario', status: 'ativo', criadoEm: '2025-09-14' },
  { id: 10, nome: 'Lucas Barbosa', usuario: 'lucasb', email: 'lucas.b@rural.edu.br', bio: 'Engenharia Agrícola. Drones e sensores.', papel: 'usuario', status: 'ativo', criadoEm: '2025-10-01' },
  { id: 11, nome: 'Camila Duarte', usuario: 'cadu', email: 'camila.d@rural.edu.br', bio: 'Música no restaurante universitário.', papel: 'usuario', status: 'ativo', criadoEm: '2026-01-19' },
  { id: 12, nome: 'Bruno Teixeira', usuario: 'brunot', email: 'bruno.t@rural.edu.br', bio: '', papel: 'usuario', status: 'suspenso', criadoEm: '2026-03-08' },
];

// Usuário "logado" (mock de sessão)
const SESSAO = USUARIOS[0];

// Vídeos de exemplo públicos (Google sample videos)
const FONTES = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
];

const TITULOS = [
  ['Colheita do milho no campo experimental', 'agro'],
  ['Flexbox em 30 segundos', 'programacao'],
  ['Conheça as vacas do setor de bovinocultura', 'bichos'],
  ['Trilha da mata atlântica do campus', 'natureza'],
  ['Um dia no hospital veterinário', 'bichos'],
  ['O que é uma API REST?', 'programacao'],
  ['Pão de queijo com ciência dos alimentos', 'receitas'],
  ['Calouros chegando na Rural', 'campus'],
  ['Células de cebola no microscópio', 'ciencia'],
  ['Drone mapeando a plantação', 'agro'],
  ['Violão no bandejão', 'musica'],
  ['Git: commit, push e pull', 'programacao'],
  ['Pôr do sol no lago do campus', 'campus'],
  ['Como fazer compostagem em casa', 'natureza'],
  ['Cavalos do setor de equinocultura', 'bichos'],
  ['HTML semântico na prática', 'programacao'],
  ['Doce de leite do laticínio da Rural', 'receitas'],
  ['Semana acadêmica: melhores momentos', 'campus'],
  ['Medindo o pH do solo', 'ciencia'],
  ['Plantio de mudas nativas', 'natureza'],
  ['Forró na festa junina da universidade', 'musica'],
  ['Tailwind vs CSS puro', 'programacao'],
  ['Ordenha mecânica explicada', 'agro'],
  ['Abelhas sem ferrão do apiário', 'bichos'],
];

const CATEGORIAS = {
  agro: 'Agro', programacao: 'Programação', bichos: 'Bichos', natureza: 'Natureza',
  receitas: 'Receitas', campus: 'Campus', ciencia: 'Ciência', musica: 'Música',
};

// Gera N vídeos a partir dos títulos (troque N para testar listas grandes)
function gerarVideos(n) {
  const lista = [];
  for (let i = 0; i < n; i++) {
    const [titulo, categoria] = TITULOS[i % TITULOS.length];
    const autor = USUARIOS[(i * 5 + 1) % USUARIOS.length];
    const dias = (i * 3 + 1) % 120;
    lista.push({
      id: i + 1,
      titulo: i < TITULOS.length ? titulo : `${titulo} (parte ${Math.floor(i / TITULOS.length) + 1})`,
      descricao: `${titulo}. Gravado por @${autor.usuario} para o RuralStream. #${categoria} #rural`,
      categoria,
      autorId: autor.id,
      visualizacoes: Math.round(((i * 7919) % 98000) + 300),
      curtidas: Math.round(((i * 3571) % 9000) + 40),
      comentarios: (i * 37) % 300,
      duracao: 15 + ((i * 13) % 46),
      criadoEm: new Date(Date.now() - dias * 86400000).toISOString(),
      visibilidade: 'publico',
      src: FONTES[i % FONTES.length],
    });
  }
  return lista;
}

// Vídeos enviados pela tela "Enviar" ficam no localStorage
const VIDEOS_ENVIADOS = JSON.parse(localStorage.getItem('rs_videos') || '[]');
const VIDEOS = [...VIDEOS_ENVIADOS, ...gerarVideos(48)];

// ---------- Helpers ----------
const buscarUsuario = (id) => USUARIOS.find((u) => u.id === Number(id));
const buscarVideo = (id) => VIDEOS.find((v) => v.id === Number(id));
const videosDoUsuario = (id) => VIDEOS.filter((v) => v.autorId === Number(id));
const parametro = (nome) => new URLSearchParams(location.search).get(nome);

function formatarNumero(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace('.', ',') + ' mi';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace('.', ',') + ' mil';
  return String(n);
}

function formatarDuracao(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function tempoRelativo(iso) {
  const dias = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (dias < 1) return 'hoje';
  if (dias === 1) return 'ontem';
  if (dias < 30) return `há ${dias} dias`;
  const meses = Math.floor(dias / 30);
  return meses === 1 ? 'há 1 mês' : `há ${meses} meses`;
}

function formatarData(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Cor estável por id (para capas e avatares sem imagem)
// Paleta institucional UFRRJ (manual de identidade visual) — cores com bom contraste para texto branco
const PALETA_RURAL = ['#004388', '#008244', '#0072AB', '#009A8B', '#604696', '#76791D', '#563A22', '#C3005D', '#EF7D00', '#0095D4', '#52AE32', '#BC1413'];
const corPorId = (id) => PALETA_RURAL[(id * 7) % PALETA_RURAL.length];
const iniciais = (nome) => nome.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
