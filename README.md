# Nova: Real-time Network Intelligence

Nova is a high-performance, modern network intelligence dashboard designed for security researchers and network administrators. Powered by the **Shodan API**, Nova provides a sleek, real-time interface to explore global internet infrastructure, identify exposed devices, and analyze network security posture.

![Nova UI Preview](https://github.com/user-attachments/assets/placeholder-ui-preview.png)

## 🚀 Key Features

- **Global Infrastructure Search**: Leverage Shodan's powerful search engine to find hosts by IP, service, product, or location.
- **Advanced Query Support**: Full support for Shodan search filters (e.g., `port:80`, `country:US`, `product:Apache`).
- **Real-time Network Scanning**: Instant feedback and status updates during the intelligence gathering process.
- **Dynamic Filtering**: Narrow down results by organization, geographic location, and specific ports on the fly.
- **Intelligence Aesthetics**: A premium, dark-mode interface with glassmorphism effects and smooth micro-animations.
- **Security-First Architecture**: Proxy-based backend to protect API keys and manage rate limits effectively.

## 🛠️ Technology Stack

### Frontend
- **React 18** + **Vite**: Ultra-fast development and optimized production builds.
- **Vanilla CSS**: Custom-crafted design system with modern CSS features (Variables, Gradients, Transitions).
- **Lucide React**: Clean, consistent iconography.

### Backend
- **Node.js** + **Express**: Lightweight proxy server for Shodan API communication.
- **Node-Fetch**: Reliable HTTP client for external API requests.
- **CORS**: Configured for secure cross-origin resource sharing.

## 🏁 Getting Started

### Prerequisites
- Node.js (v16.x or later)
- A Shodan API Key (Available at [account.shodan.io](https://account.shodan.io))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ekanshs25160-bit/Nova.git
   cd Nova
   ```

2. **Setup the Backend**:
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file (or set the environment variable):
   ```env
   SHODAN_API_KEY=your_shodan_api_key_here
   PORT=3000
   ```

3. **Setup the Frontend**:
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**:
   ```bash
   cd Backend
   node server.js
   ```

2. **Start the Frontend Development Server**:
   ```bash
   cd Frontend
   npm run dev
   ```

3. **Access Nova**:
   Open your browser and navigate to `http://localhost:5173` (Vite's default port).

## 🛡️ Security Note
Ensure your `SHODAN_API_KEY` is kept private. Never commit it to a public repository. The backend is configured to use environment variables for this reason.

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
