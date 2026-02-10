<div align="center">
  <img src="src/assets/img/logo192.png" width="80" alt="Logo" />
  
  <h1>Asymmetric Options Signals</h1>
  <p>
    <strong>Antifragile Trading Intelligence for the Iranian Market</strong>
  </p>
  
  <p>
    <a href="#about">About</a> •
    <a href="#philosophy">Philosophy</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a>
  </p>

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
</div>

<br />

## 📖 About <a name="about"></a>

This Chrome Extension is a specialized financial tool designed to monitor the **Iranian Options Market** in real-time. Unlike traditional signal providers that attempt to predict market direction, this system uses mathematical modeling and AI to identify **asymmetric risk opportunities**.

It automatically filters thousands of market data points to find contracts with high leverage (Gearing) and low cost (Low IV), presenting them as actionable "Call" or "Put" signals directly in the user's browser.

## 🦢 The Philosophy <a name="philosophy"></a>

> *"Don't tell me what you think, tell me what you have in your portfolio."* — Nassim Nicholas Taleb

The core algorithm is built upon the principles of **Antifragility** and **Convexity**:

1.  **Limited Downside:** We treat small, regular losses as the "cost of doing business"—similar to paying an insurance premium.
2.  **Unlimited Upside:** We hunt for rare events (Black Swans) where the payoff is exponential compared to the risk.
3.  **Cheap Insurance:** The system specifically targets options where the market has underpriced the probability of volatility.

## ✨ Key Features <a name="features"></a>

*   **Real-Time Signal Generation:**
    *   **🟢 Call Signals:** High-potential upside suggestions based on explosive gearing ratios.
    *   **🟣 Put Signals:** "Crash insurance" suggestions for market downturn protection.
*   **AI-Powered Reasoning:** Each signal includes an `aiReasoning` block, translating complex quantitative data into human-readable analysis.
*   **Immersive Dashboard:** A persistent, non-intrusive UI that integrates seamlessly into the browser workflow.
*   **Advanced Filtering:**
    *   Filters out low-liquidity contracts.
    *   Calculates Implied Volatility (IV) vs. Historical Volatility.
*   **User Profile & History:** Integrated payment history tracking and subscription management.
*   **Modern UI/UX:** Built with Tailwind CSS and the **Vazirmatn** font for optimal Persian legibility.

## 🛠 Tech Stack <a name="tech-stack"></a>

*   **Core:** React 18, TypeScript
*   **Build Tool:** Vite (configured for Chrome Extensions via CRXJS or custom rollup configs)
*   **Styling:** Tailwind CSS, Lucide React (Icons)
*   **Typography:** Vazirmatn (optimized for Persian web typography)
*   **State Management:** React Hooks & Context API
*   **Backend Integration:** REST API fetchers for AI analysis and market data.

## 🚀 Installation & Development <a name="installation"></a>

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

### 2. Install Dependencies
bash
npm install

### 3. Run in Development Mode
To start the dev server (with HMR):
bash
npm run dev

### 4. Build for Production
To generate the optimized extension bundle:
bash
npm run build
*The build artifacts will be generated in the `dist` folder.*

### 5. Load into Chrome
1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable **Developer mode** (toggle in the top right).
3.  Click **Load unpacked**.
4.  Select the `dist` folder created in the previous step.

## 📦 Publishing <a name="publishing"></a>

To prepare the extension for the Chrome Web Store:

1.  Run `npm run build`.
2.  Navigate to the `dist` folder.
3.  **Zip the contents** of the `dist` folder (ensure `manifest.json` is at the root of the zip).
*   *Do not zip the entire project folder or `node_modules`.*
4.  Upload the `.zip` file to the Chrome Web Store Developer Dashboard.

## 📄 License

This project is proprietary. All rights reserved.

---
<div align="center">
  <sub>Built with ❤️ for the Anti-Fragile Investor.</sub>
</div>
