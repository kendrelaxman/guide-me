# GuideMe

GuideMe is a lightweight, framework-agnostic JavaScript library for creating interactive product tours and onboarding guides. This monorepo contains the core library, a marketing portal, a backend service, and a demo application.

## Directory Structure

- **`packages/guideme`**: The core library (JS/CSS). Built with Vite in Library Mode.
- **`packages/backend`**: A Node.js/Express backend service for handling contact forms and license purchases.
- **`guide-me-portal`**: A React-based marketing website for the library.
- **`examples/react-dashboard`**: A sample React application demonstrating the library in action.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- NPM

### Installation

1.  Clone the repository.
2.  Install dependencies for each package:

    ```bash
    # Core Library
    cd packages/guideme
    npm install

    # Backend
    cd ../backend
    npm install

    # Portal
    cd ../../guide-me-portal
    npm install

    # Demo Dashboard
    cd ../examples/react-dashboard
    npm install
    ```

## Running the Applications

You can run the components individually:

### 1. Backend Service
Runs on `http://localhost:3000`.
```bash
cd packages/backend
npm start
```

### 2. React Dashboard (Demo)
Runs on `http://localhost:5173`.
```bash
cd examples/react-dashboard
npm run dev
```

### 3. GuideMe Portal
Runs on `http://localhost:5174` (or similar).
```bash
cd guide-me-portal
npm run dev
```

## Building for Production

### GuideMe Library
Generates `dist/` with `guideme.umd.js` (CDN) and `guideme.es.js` (NPM).
```bash
cd packages/guideme
npm run build
```

### React Dashboard
Generates static assets in `dist/` for S3 hosting.
```bash
cd examples/react-dashboard
npm run build
```

## Publishing
- **Library**: Can be published to NPM or uploaded to a CDN (S3).
- **Dashboard**: Designed to be hosted as a static site (e.g., AWS S3).
