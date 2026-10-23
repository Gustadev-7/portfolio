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
    'Na Vidroeste, além do suporte, desenvolvi sistemas internos: um CRM de atendimento via WhatsApp com chat interno para a equipe e um sistema de monitoramento de impressoras com controle de custos. Meu foco é o backend: arquitetura em camadas, regras de negócio bem definidas e APIs previsíveis, com TypeScript, Node.js, Java e SQL.',
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
    slug: 'crm-atendimento',
    name: 'CRM de Atendimento',
    shortName: 'CRM',
    tagline: 'Atendimento via WhatsApp e chat interno da equipe em um só sistema.',
    description:
      'Sistema web de uso interno que desenvolvi para a empresa onde trabalho. Centraliza o atendimento de clientes pelo WhatsApp em uma interface no estilo do WhatsApp Web, com vários números organizados por departamento, e integra um chat interno em tempo real para a equipe.',
    context: 'Profissional · uso interno',
    year: '2026',
    stack: ['React', 'PHP', 'Node.js', 'WebSocket', 'WhatsApp API', 'SQL'],
    highlights: [
      'Integração com a API oficial do WhatsApp (Meta Cloud API) e com uma API não oficial, em vários números por departamento',
      'Os dois provedores ficam atrás de uma interface comum: o restante do sistema não depende de qual está em uso',
      'Direcionamento automático de novos contatos ao atendente responsável',
      'Mídias, respostas, reações e modelos de mensagem',
      'Chat interno em tempo real com login único compartilhado com o CRM',
      'Controle de equipe com permissões por função; em produção na empresa',
    ],
    flowTitle: 'módulos',
    flow: [
      { label: 'Canais', detail: 'API oficial e não oficial do WhatsApp, por departamento' },
      { label: 'Distribuição', detail: 'menu automático e responsável por cliente' },
      { label: 'Atendimento', detail: 'conversas, mídias e modelos de mensagem' },
      { label: 'Equipe', detail: 'usuários, departamentos e permissões' },
      { label: 'Chat interno', detail: 'mensagens em tempo real entre a equipe' },
    ],
  },
  {
    slug: 'printmonitor',
    name: 'PrintMonitor',
    tagline: 'Monitoramento de impressoras e controle de custos de suprimentos.',
    description:
      'Sistema web de uso interno que desenvolvi para a empresa onde trabalho. Ele reúne em um único painel o acompanhamento das impressoras da rede e o controle dos gastos com suprimentos.',
    context: 'Profissional · uso interno',
    year: '2026',
    stack: ['React', 'TypeScript', 'Node.js', 'PHP', 'SQL'],
    highlights: [
      'Acompanhamento do status e dos níveis de suprimento das impressoras em tempo real',
      'Controle de estoque e histórico de trocas de suprimentos',
      'Relatórios de consumo e gastos por período',
      'Em produção na empresa',
    ],
    flowTitle: 'módulos',
    flow: [
      { label: 'Monitoramento', detail: 'status e níveis de suprimento em tempo real' },
      { label: 'Estoque', detail: 'entradas e posição atual dos suprimentos' },
      { label: 'Trocas', detail: 'histórico de substituições por equipamento' },
      { label: 'Custos', detail: 'gastos por período e relatórios' },
    ],
  },
  {
    slug: 'concessionaria-api',
    name: 'API Concessionária',
    shortName: 'Concessionária',
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
    tagline: 'Cadastro de clientes, produtos e vendas em Java, com arquitetura em camadas.',
    description:
      'Sistema de compras desenvolvido para praticar Programação Orientada a Objetos e modelagem de dados. Cada responsabilidade fica em uma camada própria: interface, regras de negócio e acesso a dados.',
    context: 'Estudo',
    year: '2026',
    stack: ['Java', 'POO'],
    highlights: [
      'Entidades do domínio (cliente, produto, venda e itens) modeladas como classes',
      'Regras de negócio separadas da interface, na camada BLL',
      'Padrão DAO isolando o acesso aos dados',
      'Venda composta por itens, relacionando clientes e produtos',
    ],
    repo: 'https://github.com/Gustadev-7/SitemaDeCompras',
    flowTitle: 'camadas',
    flow: [
      { label: 'UI', detail: 'telas de cadastro de clientes, produtos e vendas' },
      { label: 'BLL', detail: 'regras de negócio de cada cadastro' },
      { label: 'DAL', detail: 'DAOs de cliente, produto e venda' },
      { label: 'Model', detail: 'Cliente, Produto, Venda e Item' },
    ],
  },
];

/**
 * usedIn: slugs de PROJECTS onde a tecnologia foi usada ('portfolio' = este site).
 * Os nomes viram links para o card do projeto.
 */
export const STACK: StackGroup[] = [
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: 'nodejs', usedIn: ['crm-atendimento', 'printmonitor', 'concessionaria-api', 'portfolio'] },
      { name: 'PHP', icon: 'php', usedIn: ['crm-atendimento', 'printmonitor'] },
      { name: 'TypeScript', icon: 'typescript', usedIn: ['printmonitor', 'concessionaria-api', 'portfolio'] },
      { name: 'Express', icon: 'express', usedIn: ['printmonitor', 'concessionaria-api'] },
      { name: 'Java', icon: 'java', usedIn: ['sistema-de-compras'] },
    ],
  },
  {
    title: 'Banco de dados',
    items: [
      { name: 'SQL', icon: 'sql', usedIn: ['crm-atendimento', 'printmonitor', 'concessionaria-api'] },
      { name: 'Firebird', icon: 'firebird', usedIn: ['crm-atendimento', 'printmonitor'] },
      { name: 'MySQL', icon: 'mysql', usedIn: ['concessionaria-api'] },
      { name: 'Oracle', icon: 'oracle', note: 'estudado na faculdade' },
    ],
  },
  {
    title: 'Integrações',
    items: [
      { name: 'APIs REST', icon: 'rest', usedIn: ['crm-atendimento', 'printmonitor', 'concessionaria-api'] },
      { name: 'WhatsApp API', icon: 'whatsapp', usedIn: ['crm-atendimento'] },
      { name: 'WebSocket', icon: 'websocket', usedIn: ['crm-atendimento'] },
    ],
  },
  {
    title: 'Ferramentas',
    items: [
      { name: 'Git', icon: 'git', note: 'todos os projetos' },
      { name: 'Postman', icon: 'postman', note: 'teste de APIs' },
      { name: 'VS Code', icon: 'vscode', note: 'editor principal' },
      { name: 'IntelliJ IDEA', icon: 'intellij', note: 'projetos Java' },
    ],
  },
];

/** Linha discreta abaixo da stack: o foco do portfólio é backend. */
export const FRONTEND_NOTE = 'React e Angular, quando o projeto pede.';

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
      'Desenvolvi um CRM de atendimento via WhatsApp, com chat interno em tempo real para agilizar a comunicação entre as equipes.',
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
