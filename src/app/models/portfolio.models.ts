export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ExternalLink {
  label: string;
  handle: string;
  href: string;
}

export interface Profile {
  name: string;
  fullName: string;
  role: string;
  location: string;
  focus: string;
  intro: string;
  about: string[];
  email: string;
  githubUser: string;
  publicReposFallback: number;
  facts: ProfileFact[];
  links: ExternalLink[];
}

export interface ProfileFact {
  key: string;
  value: string;
}

export interface FlowStep {
  label: string;
  detail: string;
}

export interface StatusRule {
  code: number;
  rule: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Nome curto usado nas referências da seção de stack. */
  shortName?: string;
  tagline: string;
  description: string;
  context: string;
  year: string;
  stack: string[];
  highlights: string[];
  /** Sem `repo`, o card indica que o código é privado (sistemas internos). */
  repo?: string;
  flowTitle?: string;
  flow?: FlowStep[];
  statusRules?: StatusRule[];
}

export interface StackItem {
  name: string;
  /** Chave de TECH_ICONS (components/stack/tech-icons.ts). */
  icon: string;
  /** Slugs dos projetos onde a tecnologia foi usada ('portfolio' = este site). */
  usedIn?: string[];
  /** Texto curto quando não há projeto para citar (ex.: "faculdade"). */
  note?: string;
}

export interface StackGroup {
  title: string;
  items: StackItem[];
}

export type CommitKind = 'trabalho' | 'estágio' | 'graduação' | 'curso';

export interface Commit {
  date: string;
  kind: CommitKind;
  message: string;
  place: string;
  detail: string;
  highlights?: string[];
}
