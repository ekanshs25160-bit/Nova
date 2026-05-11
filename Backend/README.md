# Nova Backend

This directory contains the Node.js/Express proxy server for **Nova**.

## 🔌 API Proxy
The server acts as a secure intermediary between the Nova frontend and the **Shodan API**. This architecture:
1.  **Protects Credentials**: Keeps the Shodan API key on the server side.
2.  **Manages Requests**: Provides a centralized point for handling rate limits and data formatting.

## 🚀 Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file or set the following:
    - `SHODAN_API_KEY`: Your private Shodan API key.
    - `PORT`: (Optional) Defaults to 3000.

3.  **Run the server**:
    ```bash
    node server.js
    ```

## 📍 Endpoints
- `GET /api/search?q={query}`: Forwards queries to Shodan and returns host or search results.

For full project details, see the [Root README](../README.md).
