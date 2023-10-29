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
    ├── app/                                # Pages named by app routes
    │   ├── home/
    │   ├── about/
    │   ├── contact/
    │   └── .../
    │
    ├── assets/                             # Shared assets (e.g., fonts, images)
    │   ├── fonts/                          # Fonts
    │   ├── data/                           # Data files (e.g., JSON, CSV)
    │   ├── images/                         # Images
    │   ├── illustrations/                  # Illustrations
    │   └── icons/                          # Icons
    │
    │
    ├── config/
    │   ├── env/
    │   │   ├── development.env             # Environment variables for development
    │   │   ├── production.env              # Environment variables for production
    │   │   └── testing.env                 # Environment variables for testing
    │   └── settings/
    │       ├── api-keys.ts                 # API keys
    │       └── app-config.ts               # Application configuration
    │
    ├── core/
    │   ├── _mock/                          # Mock data
    │   ├── api/
    │   │   ├── api-client/                 # API client
    │   │   └── endpoints/                  # API endpoints
    │   ├── auth/                           # Authentication-related code
    │   ├── base/                           # Base classes
    │   ├── components/                     # General Shared UI components
    │   ├── layout/                         # Layout components (e.g., header, footer)
    │   ├── redux/                          # Redux store, reducers, and middleware
    │   │   ├── store.ts                    # Redux store
    │   │   ├── reducers.ts                 # Root reducer
    │   │   ├── middlewares/                # Redux middlewares
    │   │   └── slices/                     # Redux slices
    │   ├── routes/                         # Application routes or navigation paths
    │   ├── service-locator/                # Service locator
    │   ├── shared/                         # Shared code
    │   │   ├── components/                 # Shared UI components
    │   │   ├── constants/                  # Shared constants
    │   │   ├── hooks/                      # Shared React hooks
    │   │   ├── types/                      # Shared TypeScript types and interfaces
    │   │   └── utils/                      # Shared utility functions and helpers
    │   └── theme/                          # Styling and theming-related files
    │
    ├── modules/
    │   └── auth/
    │      ├── data/
    │      │   ├── datasources/             # Data sources (e.g., API, LocalStorage)
    │      │   ├── mappers/                 # Data mappers (e.g., UserMapper)
    │      │   ├── models/                  # Data models or structures for data transfer without behavior (e.g., User, Post)
    │      │   └── repositories/            # Data access and storage (e.g., UserRepository)
    │      ├── domain/
    │      │   ├── entities/                # Domain-specific entities with behavior and business rules (e.g., User, Post)
    │      │   ├── repositories/            # Abstraction for data access (e.g., UserRepository)
    │      │   ├── value-objects/           # Domain-specific value objects (e.g., PatientName for Patient entity having firstName and lastName)
    │      │   └── usecases/                # Business logic (e.g., Login, Logout)
    │      └── presentation/
    │          ├── pages/                   # Feature-specific pages
    │          ├── components/              # Feature-specific UI components
    │          └── controllers/             # Feature-specific controllers
    │              ├── index.tsx            # Controller for the feature
    │              ├── slices/              # Redux slices
    │              └── middlewares/         # Redux middleware
    │
    └── services/                           # External services or integrations

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
