import { Commit, Profile, Project, StackGroup } from '../models/portfolio.models';

/**
 * Todo o conteúdo do site vive aqui. Para atualizar o portfólio,
 * edite este arquivo; os componentes só fazem a apresentação.
 */

export const PROFILE: Profile = {
  name: 'Gustavo Domingos',
  fullName: 'Gustavo de Souza Domingos',
  role: 'Desenvolvedor backend em formação',
  location: 'Boituva/SP',
  focus: 'backend',
  intro:
    'Construo APIs REST com Node.js e TypeScript, modelo bancos relacionais e gosto de entender como os sistemas conversam por baixo da interface.',
  about: [
    'Sou estudante de Análise e Desenvolvimento de Sistemas no IFSP e trabalho como Assistente de TI. O dia a dia com infraestrutura me deixou com uma curiosidade prática: entender o que acontece entre a requisição e a resposta.',
    'Na Vidroeste, além do suporte, desenvolvi ferramentas internas: um sistema de monitoramento de impressoras com controle de custos e um chat para as equipes. Meu foco é o backend: arquitetura em camadas, regras de negócio bem definidas e APIs previsíveis, com TypeScript, Node.js, Java e SQL.',
    'Estou em busca de uma vaga de estágio ou júnior em desenvolvimento, com interesse especial em backend e banco de dados.',
  ],
  email: 'gustavo.souzadomingos7@gmail.com',
  githubUser: 'Gustadev-7',
  publicReposFallback: 11,
  facts: [
    { key: 'nome', value: 'Gustavo de Souza Domingos' },
    { key: 'cidade', value: 'Boituva/SP' },
    { key: 'cargo', value: 'Assistente de TI' },
    { key: 'empresa', value: 'Vidroeste Vidros Temperados' },
    { key: 'curso', value: 'Análise e Desenv. de Sistemas' },
    { key: 'instituicao', value: 'IFSP · 4º semestre' },
    { key: 'foco', value: 'backend · APIs REST · SQL' },
    { key: 'idiomas', value: 'inglês intermediário' },
    { key: 'busca', value: 'estágio ou júnior' },
  ],
  links: [
    { label: 'GitHub', handle: 'Gustadev-7', href: 'https://github.com/Gustadev-7' },
    {
      label: 'LinkedIn',
      handle: 'gustavo-domingos',
      href: 'https://www.linkedin.com/in/gustavo-domingos-4b7880356',
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    slug: 'printmonitor',
    name: 'PrintMonitor',
    tagline: 'Monitoramento de impressoras e controle de custos de suprimentos.',
    description:
      'Sistema em produção na Vidroeste que acompanha em tempo real status, níveis de toner/tinta e contadores de páginas das impressoras da rede, e controla estoque, trocas e gastos com suprimentos. São dois backends atrás do Apache: um proxy Node.js que conversa com as impressoras e uma API de custos em PHP sobre Firebird.',
    context: 'Profissional · Vidroeste',
    year: '2026',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PHP', 'Firebird'],
    highlights: [
      'Custo unitário por FIFO real, calculado a partir dos lotes de entrada de estoque',
      'Triggers no Firebird mantêm o estoque consistente a cada entrada e troca',
      'Proxy Express contorna o CORS e lê Epson, Canon, Brother e Lexmark (login Canon em 3 etapas com SHA-256)',
      'Gastos mensais por suprimento e relatórios em PDF de trocas, gastos e estoque',
      'Login para alterações, custos ocultos para visitantes e CI de build no GitHub',
    ],
    repo: 'https://github.com/Gustadev-7/PrintMonitor',
    featured: true,
    flowTitle: 'arquitetura',
    flow: [
      { label: 'React + TypeScript', detail: 'dashboard, painéis de custo e relatórios PDF' },
      { label: 'Apache', detail: 'serve o build e roteia /api e /php' },
      { label: '/api · Node + Express', detail: 'proxy para as impressoras, sessão Canon em cache' },
      { label: '/php · API de custos', detail: 'estoque, entradas, trocas e gastos via PDO' },
      { label: 'Firebird', detail: 'triggers de estoque e views de custo' },
    ],
  },
  {
    slug: 'concessionaria-api',
    name: 'API Concessionária',
    tagline: 'API REST em camadas para gestão de uma concessionária.',
    description:
      'Clientes, vendedores, carros, estoque e notas fiscais com arquitetura MVC. As tabelas são criadas na inicialização e as regras de negócio ficam isoladas na camada de serviço, retornando códigos HTTP coerentes com cada violação.',
    context: 'Acadêmico · IFSP · em equipe',
    year: '2026',
    stack: ['Node.js', 'TypeScript', 'Express', 'MySQL'],
    highlights: [
      '5 recursos com CRUD completo e rotas de relacionamento',
      'Emissão de nota decrementa o estoque automaticamente',
      'Notas fiscais imutáveis: não existe DELETE',
      'Validações de domínio: comissão 0–30%, ano do veículo, preço > 0',
    ],
    repo: 'https://github.com/Gustadev-7/projeto-I-prog-web',
    featured: true,
    flowTitle: 'camadas',
    flow: [
      { label: 'routes', detail: 'mapeia verbo + caminho para o controller' },
      { label: 'controllers', detail: 'traduz HTTP ⇄ domínio' },
      { label: 'services', detail: 'regras de negócio e validação' },
      { label: 'repositories', detail: 'SQL via mysql2' },
      { label: 'MySQL', detail: 'tabelas criadas no boot' },
    ],
    statusRules: [
      { code: 201, rule: 'recurso criado' },
      { code: 409, rule: 'CPF, placa, matrícula ou nº da nota duplicados' },
      { code: 422, rule: 'remoção de registro com vínculos' },
    ],
  },
  {
    slug: 'sistema-de-compras',
    name: 'Sistema de Compras',
    tagline: 'Sistema de compras com orientação a objetos em Java.',
    description: 'Modelagem de domínio e organização em pacotes no IntelliJ.',
    context: 'Estudo',
    year: '2026',
    stack: ['Java'],
    highlights: [],
    repo: 'https://github.com/Gustadev-7/SitemaDeCompras',
    featured: false,
  },
  {
    slug: 'loja-tp1',
    name: 'Loja TP1',
    tagline: 'Loja virtual em Angular com TypeScript.',
    description: 'Componentes standalone, testes com Vitest e formatação com Prettier.',
    context: 'Acadêmico',
    year: '2026',
    stack: ['Angular', 'TypeScript'],
    highlights: [],
    repo: 'https://github.com/Gustadev-7/loja-tp1',
    featured: false,
  },
  {
    slug: 'driveup',
    name: 'DriveUp',
    tagline: 'Site multipágina, projeto final do 1º semestre.',
    description: 'Primeiro projeto web completo do curso, feito com HTML, CSS e JavaScript.',
    context: 'Acadêmico',
    year: '2025',
    stack: ['HTML', 'CSS', 'JavaScript'],
    highlights: [],
    repo: 'https://github.com/Gustadev-7/site-driveup',
    featured: false,
  },
];

export const STACK: StackGroup[] = [
  {
    key: 'dependencies',
    description: 'principais tecnologias',
    items: [
      { name: 'typescript', note: 'linguagem principal' },
      { name: 'node.js', note: 'runtime das APIs' },
      { name: 'express', note: 'rotas e middlewares' },
      { name: 'mysql', note: 'modelagem e SQL' },
      { name: 'java', note: 'POO e estudo' },
      { name: 'php', note: 'API de custos (PDO)' },
      { name: 'firebird', note: 'triggers e views' },
    ],
  },
  {
    key: 'devDependencies',
    description: 'em aprofundamento',
    items: [
      { name: 'angular', note: 'front na faculdade' },
      { name: 'oracle', note: 'banco relacional' },
      { name: 'c', note: 'fundamentos' },
      { name: 'react', note: 'interfaces' },
    ],
  },
  {
    key: 'tools',
    description: 'ambiente de desenvolvimento',
    items: [
      { name: 'git', note: 'versionamento' },
      { name: 'postman', note: 'teste de API' },
      { name: 'vscode', note: 'editor' },
      { name: 'intellij', note: 'java' },
    ],
  },
];

export const EXPERIENCE: Commit[] = [
  {
    date: '2025 — atual',
    kind: 'trabalho',
    message: 'Assistente de TI',
    place: 'Vidroeste Vidros Temperados',
    detail:
      'Suporte técnico com manutenção preventiva e corretiva de hardware e software, garantindo o funcionamento contínuo dos equipamentos e sistemas da empresa.',
    highlights: [
      'Desenvolvi o PrintMonitor, sistema web em produção que monitora as impressoras da rede e controla estoque, trocas e custos de suprimentos (toner, cartucho e cilindro).',
      'Criei um chat interno para agilizar a comunicação entre equipes e o fluxo de solicitações de suporte.',
    ],
  },
];

export const EDUCATION: Commit[] = [
  {
    date: '2025 — atual',
    kind: 'graduação',
    message: 'Análise e Desenvolvimento de Sistemas',
    place: 'Instituto Federal de São Paulo (IFSP)',
    detail: 'Tecnologia em ADS, cursando o 4º semestre.',
  },
  {
    date: 'em andamento',
    kind: 'curso',
    message: 'Java',
    place: 'Red Hat',
    detail: 'Fundamentos da linguagem e orientação a objetos.',
  },
  {
    date: 'em andamento',
    kind: 'curso',
    message: 'UX/UI Design',
    place: 'Google',
    detail: 'Pesquisa com usuários, prototipação e design de interfaces.',
  },
];
