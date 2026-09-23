import type { StickerKey } from "./skill-stickers";

export type SkillItem = {
  name: string;
  stickerKey?: StickerKey;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
};

export type RoleItem = {
  role: string;
  period: string;
  highlights: string[];
  current?: boolean;
};

export type CompanyGroup = {
  company: string;
  location?: string;
  roles: RoleItem[];
};

export type CertificationItem = {
  title: string;
  issuer: string;
  year: string;
  featured?: boolean;
};

export type ProjectItem = {
  name: string;
  tagline: string;
  problem: string;
  outcome: string;
  stack: string[];
  status: "producao" | "desenvolvimento" | "entregue";
  href?: string;
};

export type ContactItem = {
  id: string;
  label: string;
  handle: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "whatsapp";
  primary?: boolean;
};

/**
 * Origem da URL pública — usada em canonical, og:url e sitemap.
 *
 * É o apex, não o `www`: o Worker está conectado ao apex e `www` só existe
 * como redirect 301 para cá. Apontar canonical para o `www` diria à busca que
 * o endereço oficial é justamente o que redireciona.
 */
export const siteUrl = "https://gvsolucoesdigitais.com";

export const profile = {
  name: "Gabriel Victorino",
  headline: "Tech Lead · Software Engineer",
  company: "5by5 Soluções em Sistemas",
  founder: "GV Soluções Digitais",
  location: "Matão, São Paulo — Brasil",
  /** Início da carreira — o tempo de experiência é derivado daqui, nunca digitado à mão. */
  careerStart: "Nov 2019",
  available: true,
  bio: "Especialista em sistemas backend escaláveis com C#, .NET Core e Python. Atuo na liderança técnica de squads, arquitetura de software, APIs, microserviços e boas práticas — do código à entrega em produção.",
  contacts: [
    {
      id: "email",
      label: "E-mail",
      handle: "gavictorino97@gmail.com",
      href: "mailto:gavictorino97@gmail.com",
      icon: "mail",
      primary: true,
    },
    // Só dígitos, em formato internacional. O link wa.me e a máscara de
    // exibição "(16) 99620-0340" são derivados daqui, em src/lib/contacts.ts.
    {
      id: "whatsapp",
      label: "WhatsApp",
      handle: "5516996200340",
      href: "",
      icon: "whatsapp",
      primary: true,
    },
    {
      id: "github",
      label: "GitHub",
      handle: "@GabrielVictorino97",
      href: "https://github.com/GabrielVictorino97",
      icon: "github",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "gabriel-victorino",
      href: "https://www.linkedin.com/in/gabriel-victorino/",
      icon: "linkedin",
    },
  ] satisfies ContactItem[],
  projects: [
    {
      name: "Agenda automática por WhatsApp",
      tagline: "SaaS multi-tenant de agendamento para barbearias",
      problem:
        "Barbeiros perdem horário respondendo mensagem a mensagem para marcar corte, e a agenda vive em papel ou na cabeça.",
      outcome:
        "Bot conversacional que oferece os horários livres como mensagem interativa e reserva sozinho; o barbeiro só entra quando quer. Motor de slots e máquina de conversa são funções puras, cobertas por 108 testes.",
      stack: [
        "TypeScript",
        "Hono",
        "Supabase",
        "PostgreSQL",
        "WhatsApp Cloud API",
        "Cloudflare Workers",
      ],
      status: "desenvolvimento",
    },
    {
      name: "Timesheet pessoal",
      tagline: "Registro de jornada offline-first com sync entre aparelhos",
      problem:
        "Controlar horas trabalhadas, saldo e hora extra sem depender de conexão nem de planilha.",
      outcome:
        "PWA instalável que grava local em IndexedDB e sincroniza com Postgres quando há rede. Cálculo de hora extra por janela padrão configurável, com feriados e períodos fora da jornada.",
      stack: ["React 19", "TypeScript", "IndexedDB", "Supabase", "Vitest", "Cloudflare"],
      status: "producao",
      href: "https://timesheet-pessoal.gavictorino97.workers.dev/",
    },
    {
      name: "Este portfólio",
      tagline: "Site próprio como laboratório de prática contínua",
      problem:
        "Um portfólio parado conta menos sobre um dev do que um em evolução: não mostra critério técnico, só um retrato de um dia.",
      outcome:
        "Página estática pré-renderizada, servida na borda, com portões de qualidade barrando o deploy e ambiente de homologação antes da produção. Tempo de experiência e durações são derivados das datas, não digitados, e testes de integridade travam a linha do tempo contra sobreposição ou lacuna. Segue mudando — o repositório é público.",
      stack: [
        "TanStack Start",
        "React 19",
        "TypeScript",
        "Tailwind 4",
        "Vitest",
        "Cloudflare Workers",
      ],
      status: "producao",
      href: "https://github.com/GabrielVictorino97/portfolio",
    },
  ] satisfies ProjectItem[],
  skillCategories: [
    {
      id: "backend",
      title: "Backend & Arquitetura",
      description: "APIs, domínio e qualidade de código em produção.",
      skills: [
        { name: "C#", stickerKey: "csharp" },
        { name: ".NET Core", stickerKey: "dotnet" },
        { name: "ASP.NET Core", stickerKey: "dotnet" },
        { name: "Python", stickerKey: "python" },
        { name: "REST APIs" },
        { name: "Microserviços" },
        { name: "Clean Code" },
        { name: "SOLID" },
        { name: "Design Patterns" },
      ],
    },
    {
      id: "dados",
      title: "Dados & Persistência",
      description: "Modelagem, consultas e cache em ambientes distribuídos.",
      skills: [
        { name: "PostgreSQL", stickerKey: "postgres" },
        { name: "SQL Server", stickerKey: "sqlserver" },
        { name: "MongoDB", stickerKey: "mongodb" },
        { name: "Redis", stickerKey: "redis" },
        { name: "Entity Framework" },
        { name: "Dapper" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend",
      description: "Interfaces web integradas ao ecossistema .NET.",
      skills: [
        { name: "Angular", stickerKey: "angular" },
        { name: "TypeScript", stickerKey: "typescript" },
      ],
    },
    {
      id: "devops",
      title: "DevOps & Infraestrutura",
      description: "Containerização, orquestração e pipelines de entrega.",
      skills: [
        { name: "Docker", stickerKey: "docker" },
        { name: "Kubernetes", stickerKey: "kubernetes" },
        { name: "Azure" },
        { name: "CI/CD" },
        { name: "RabbitMQ", stickerKey: "rabbitmq" },
        { name: "Git", stickerKey: "git" },
      ],
    },
    {
      id: "lideranca",
      title: "Liderança & Processo",
      description: "Coordenação técnica, mentoria e entrega contínua.",
      skills: [
        { name: "Tech Lead" },
        { name: "Scrum / Kanban" },
        { name: "TDD" },
        { name: "Testes unitários" },
        { name: "Code review" },
        { name: "Mentoria de devs" },
      ],
    },
  ] satisfies SkillCategory[],
  companyGroups: [
    {
      company: "5by5 · Soluções em Sistemas",
      location: "Araraquara, SP",
      roles: [
        {
          role: "Tech Lead",
          period: "Ago 2024 — Atual",
          current: true,
          highlights: [
            "Liderança técnica de squad e definição de arquitetura.",
            "Evolução de sistemas backend escaláveis em .NET.",
            "Mentoria, code review e alinhamento com negócio.",
          ],
        },
        {
          role: "Desenvolvedor de Software — Pleno",
          period: "Mai 2022 — Jul 2024",
          highlights: [
            "Backend em projetos de grande porte para aviação e logística.",
            "APIs, integrações e melhoria contínua de qualidade.",
          ],
        },
        {
          role: "Desenvolvedor de Software — Júnior",
          period: "Mai 2021 — Abr 2022",
          highlights: [
            "Back-end no App Minha Azul — experiência para colaboradores da Azul.",
            "Foco em performance, manutenibilidade e entrega ágil.",
          ],
        },
      ],
    },
    {
      company: "FI Sistemas",
      location: "Araraquara, SP",
      roles: [
        {
          role: "Desenvolvedor Júnior",
          period: "Set 2020 — Abr 2021",
          highlights: [
            "Full stack com C# / .NET Core, Angular e Ionic.",
            "MySQL, Git, Scrum/Kanban, SOLID e Clean Code.",
          ],
        },
      ],
    },
    {
      company: "Programmer's — Beyond IT",
      location: "Matão, SP",
      roles: [
        {
          role: "Estagiário de Desenvolvimento",
          period: "Nov 2019 — Ago 2020",
          highlights: [
            "Soluções com .NET Core, Angular, SQL Server e Azure Functions.",
            "Docker, TDD e testes funcionais/unitários.",
          ],
        },
      ],
    },
  ] satisfies CompanyGroup[],
  // Uma certificação por linha — expandido pelo prettier viram 120 linhas.
  // prettier-ignore
  certifications: [
    { title: "Astronomer Certification for Apache Airflow Fundamentals", issuer: "Astronomer", year: "2023", featured: true },
    { title: "Trilha Engenharia de Dados", issuer: "The Developer's Conference", year: "2025", featured: true },
    { title: "Trilha Analytics Engineering", issuer: "The Developer's Conference", year: "2025", featured: true },
    { title: "Developing Machine Learning Models for Production", issuer: "DataCamp", year: "2025", featured: true },
    { title: "Fundamentos de Arquitetura de Software", issuer: "desenvolvedor.io", year: "2021", featured: true },
    { title: "Fundamentos dos Microsserviços", issuer: "balta", year: "2022", featured: true },
    { title: "Trilha Data Science", issuer: "The Developer's Conference", year: "2025" },
    { title: "Understanding Cloud Computing", issuer: "DataCamp", year: "2026" },
    { title: "MLOps Concepts", issuer: "DataCamp", year: "2025" },
    { title: "Do zero a Engenheiro de Dados - Azure", issuer: "Udemy", year: "2023" },
    { title: "Acesso à dados com .NET, C#, Dapper e SQL Server", issuer: "balta", year: "2022" },
    { title: "Fundamentos do SQL Server", issuer: "balta", year: "2022" },
    { title: "Fundamentos da Orientação a Objetos", issuer: "balta", year: "2022" },
    { title: "Fundamentos do C#", issuer: "balta", year: "2022" },
    { title: "Introdução ao Entity Framework Core", issuer: "desenvolvedor.io", year: "2022" },
    { title: "Big Data Fundamentos 3.0", issuer: "Data Science Academy", year: "2022" },
    { title: "Dominando Linq e Lambda Expressions com C#", issuer: "Udemy", year: "2021" },
    { title: "Crie uma Web API com Asp.NET Core 3.1 + EF Core 3.1 + Docker", issuer: "Udemy", year: "2021" },
    { title: "Criando APIs REST com .NET Core, EF, Autenticação e Heroku", issuer: "Udemy", year: "2021" },
    { title: "Seja Full-Stack com Asp.NET Core, Angular + EF Core", issuer: "Udemy", year: "2021" },
    { title: "CRUD com ASP.NET Core MVC, Dapper e Injeção de Dependências", issuer: "Udemy", year: "2021" },
    { title: "Design Patterns com C# — Entendendo Padrões de Projetos", issuer: "Udemy", year: "2021" },
    { title: "Introdução ao GitHub e comandos essenciais para trabalhar em equipe", issuer: "DIO", year: "2020" },
    { title: "Introdução ao Git e Controle de Versões", issuer: "DIO", year: "2020" },
  ] satisfies CertificationItem[],
  nav: [
    { id: "sobre", label: "Sobre" },
    { id: "projetos", label: "Projetos" },
    { id: "habilidades", label: "Habilidades" },
    { id: "experiencia", label: "Experiência" },
    { id: "certificacoes", label: "Certificações" },
    { id: "contato", label: "Contato" },
  ],
} as const;
