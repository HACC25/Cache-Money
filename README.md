Cache-Money 💰
2025 HACC Challenge - Standardized IT Project Review Web Application

🎯 Project Overview
This application allows:

ETS Employees to create, edit, and manage State IT projects
IV&V Vendors to submit monthly project review reports
Public to view standardized project reviews (read-only)

🚀 Quick Start for Team Members
Prerequisites
Make sure you have these installed:

Node.js (v14 or later) - Download here
Git - Download here
A code editor (VS Code recommended)

Step 1: Clone the Repository
git clone https://github.com/HACC25/Cache-Money.git
cd Cache-Money

Step 2: Install Dependencies
npm install
This will install all required packages (React, Vite, Firebase, etc.)

Step 3: Set Up Environment Variables
IMPORTANT: You need Firebase credentials to run the app locally.
bash# Copy the example environment file
cp .env.example .env
Now open the .env file and fill in the Firebase credentials.

Where to get the credentials:
(Contact Karina)
They will share the Firebase configuration values via Slack/Discord/Email
Paste them into your .env file

Your .env file should look like this (with actual values):
envVITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=cachemoney-46cb3.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cachemoney-46cb3
VITE_FIREBASE_STORAGE_BUCKET=cachemoney-46cb3.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

⚠️ Never commit your .env file to GitHub! (It's already in .gitignore)

Step 4: Run the Development Server
npm run dev
The app will start at: http://localhost:5174
Open your browser and navigate to that URL!

Step 5: Ready to Start? 🎉
You're all set! Make your changes and they'll hot-reload automatically.

🛠️ Available Commands
bash# Start development server
npm run dev

# Build for production

npm run build

# Preview production build locally

npm run preview

# Run linter

npm run lint

# Deploy to Firebase (requires Firebase CLI)

firebase deploy

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
