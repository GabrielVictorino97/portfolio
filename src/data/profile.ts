export type SkillItem = {
  name: string;
  stickerKey?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
  current?: boolean;
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
};

export const profile = {
  name: "Gabriel Victorino",
  headline: "Tech Lead · Software Engineer",
  company: "5by5 Soluções em Sistemas",
  founder: "GV Soluções Digitais",
  location: "Matão, São Paulo — Brasil",
  experienceYears: "6+ anos",
  bio: "Especialista em sistemas backend escaláveis com C#, .NET Core e Python. Atuo na liderança técnica de squads, arquitetura de software, APIs, microserviços e boas práticas — do código à entrega em produção.",
  highlights: [
    { label: "Experiência", value: "6+ anos" },
    { label: "Cargo atual", value: "Tech Lead" },
    { label: "Especialidade", value: "Backend & Arquitetura" },
  ],
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
          period: "Mai 2022 — Nov 2024",
          highlights: [
            "Backend em projetos de grande porte para aviação e logística.",
            "APIs, integrações e melhoria contínua de qualidade.",
          ],
        },
        {
          role: "Desenvolvedor de Software — Júnior",
          period: "Mai 2021 — Mai 2022",
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
          period: "Nov 2019 — Set 2020",
          highlights: [
            "Soluções com .NET Core, Angular, SQL Server e Azure Functions.",
            "Docker, TDD e testes funcionais/unitários.",
          ],
        },
      ],
    },
  ] satisfies CompanyGroup[],
  certifications: [
    { title: "Understanding Cloud Computing", issuer: "DataCamp", year: "2026" },
    { title: "Trilha Engenharia de Dados", issuer: "The Developer's Conference", year: "2025" },
    { title: "Trilha Data Science", issuer: "The Developer's Conference", year: "2025" },
    { title: "Trilha Analytics Engineering", issuer: "The Developer's Conference", year: "2025" },
    { title: "Developing Machine Learning Models for Production", issuer: "DataCamp", year: "2025" },
    { title: "MLOps Concepts", issuer: "DataCamp", year: "2025" },
    { title: "Astronomer Certification for Apache Airflow Fundamentals", issuer: "Astronomer", year: "2023" },
    { title: "Do zero a Engenheiro de Dados - Azure", issuer: "Udemy", year: "2023" },
    { title: "Acesso à dados com .NET, C#, Dapper e SQL Server", issuer: "balta", year: "2022" },
    { title: "Fundamentos do SQL Server", issuer: "balta", year: "2022" },
    { title: "Fundamentos da Orientação a Objetos", issuer: "balta", year: "2022" },
    { title: "Fundamentos do C#", issuer: "balta", year: "2022" },
    { title: "Fundamentos dos Microsserviços", issuer: "balta", year: "2022" },
    { title: "Introdução ao Entity Framework Core", issuer: "desenvolvedor.io", year: "2022" },
    { title: "Big Data Fundamentos 3.0", issuer: "Data Science Academy", year: "2022" },
    { title: "Fundamentos de Arquitetura de Software", issuer: "desenvolvedor.io", year: "2021" },
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
    { id: "contato", label: "Contato" },
    { id: "habilidades", label: "Habilidades" },
    { id: "experiencia", label: "Experiência" },
    { id: "certificacoes", label: "Certificações" },
  ],
} as const;
