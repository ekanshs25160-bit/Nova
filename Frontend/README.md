# Nova Frontend

This directory contains the React-based user interface for **Nova**, the real-time network intelligence dashboard.

## 🎨 Design Philosophy
The UI is designed to feel like a high-tech "intelligence network" console. 
- **Dark Mode**: Optimized for low-light environments and a premium feel.
- **Glassmorphism**: Subtle translucent backgrounds and borders.
- **Micro-animations**: Smooth transitions for loading states and hover interactions.

## 🛠️ Development

### Scripts
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.

### Key Components
- `Header.jsx`: Persistent navigation and branding.
- `SearchContainer.jsx`: The primary interface for inputting Shodan queries.
- `FilterContainer.jsx`: Dynamic filtering controls for refining results.
- `ResultCard.jsx`: Individual intelligence modules displaying host details.

## 🌐 API Configuration
The frontend expects a proxy to be running on `http://localhost:3000` (or as configured in `vite.config.js`). It communicates with the backend via the `/api/search` endpoint.

For full setup instructions, please refer to the [Root README](../README.md).
