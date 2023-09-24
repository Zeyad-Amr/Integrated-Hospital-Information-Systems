## Run the project

First, if you haven't already, install [Node.js](https://nodejs.org/en/download/).

Then, install the dependencies:

```bash

npm install

```

Then, run the development server:

```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```bash

    src/
    ├── assets/                  # Shared assets (e.g., fonts, images)
    │
    ├── components/
    │   └── common/               # Reusable UI components
    │
    ├── features/
    │   ├── auth/
    │   │   ├── data/
    │   │   │   ├── api/         # API-related code
    │   │   │   ├── models/      # Data models or structures
    │   │   │   └── repositories/ # Data access and storage
    │   │   ├── domain/
    │   │   │   ├── entities/    # Domain-specific entities
    │   │   │   ├── repositories/ # Interfaces for data access
    │   │   │   └── useCases/     # Business logic
    │   │   └── presentation/
    │   │       ├── auth-pages/  # Feature-specific pages for authentication
    │   │       ├── components/  # Feature-specific UI components
    │   │       └── controllers/ # State management (e.g., Redux)
    │
    ├── app/                      # Pages named by app
    │   ├── home/
    │   ├── about/
    │   ├── contact/
    │   └── .../
    │
    ├── core/
    │   ├── utils/               # Utility functions and helpers
    │   ├── components/          # Reusable UI components (not feature-specific)
    │   ├── endpoints/           # API endpoint configurations
    │   ├── routes/              # Application routes or navigation paths
    │   ├── theme/               # Styling and theming-related files
    │   ├── types/               # Custom TypeScript types
    │   ├── layout/              # Layout components (e.g., header, footer)
    │   ├── hooks/               # Custom React hooks
    │   ├── auth/                # Authentication-related code
    │   ├── mock/                # Mock data and API endpoints for testing
    │   └── constants/           # Constants and configuration files
    │
    ├── redux/
    │   ├── store.ts            # Redux store configuration
    │
    └── services/                # External services or integrations

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
