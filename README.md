# Abhishek Maher Portfolio

A personal portfolio built with Next.js 14, Tailwind CSS, and Radix/Shadcn-style UI primitives.

## About

This site showcases Abhishek Maher's work across:

- Data Science
- AI/ML
- Full-stack web development
- Agentic AI and RAG applications
- Computer vision and recommendation systems

GitHub: [abhishekmaher6699](https://github.com/abhishekmaher6699)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in only the services you use.

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

TACOS_API_URL=
TACOS_API_KEY=

REVALIDATE_SECRET=
```

`CONTACT_TO_EMAIL` is required for the contact form. The chatbot also needs a compatible backend configured through `TACOS_API_URL` and `TACOS_API_KEY`.

## Useful Commands

```bash
npm run dev
npm run lint
npm run format
```

Avoid `npm run build` until the required environment variables are configured because this project also runs content extraction and push scripts during build.

## Customization

- Personal intro: `src/data/home.json`
- Projects: `src/data/projects.json`
- Social links: `src/data/socials.json`
- Focus and learning sections: `src/data/career.json` and `src/data/education.json`
- Profile photos: `public/img/abhi-1.jpg` through `public/img/abhi-4.jpg`
- Privacy copy: `src/data/privacy.md`
