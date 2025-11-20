# PoE Dashboard

A web-based dashboard for the game Path of Exile, built with Svelte. It helps players track market data, analyze trading opportunities, and view various in-game information to make more informed economic decisions.

## Key Features

- **Flipper Tool**: Discover profitable items to buy and sell based on real-time market data.
- **Profit Calculator**: Estimate profits for various in-game activities and crafts.
- **Labyrinth Helper**: View daily Labyrinth layouts and information.
- **Timeless Jewel Reference**: A quick lookup tool for Timeless Jewel attributes and notables.
- **Data Integration**: Utilizes the poe.ninja API for live market data.

## Technologies Used

- **Frontend**: Svelte, TypeScript
- **UI**: Svelte Material UI (SMUI)
- **Bundler**: Rollup
- **API**: [poe.ninja](https://poe.ninja/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org) installed on your system.

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your_username/poe-dashboard-svelte.git
   cd poe-dashboard-svelte
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```

### Running the Application

1. **Development Mode**:
   Run the app in development mode with live reloading.

   ```sh
   npm run dev
   ```

   Navigate to `http://localhost:54545` (or the port specified in your console).

2. **Production Mode**:
   To build the optimized version of the app:
   ```sh
   npm run build
   ```
   To run the production build locally:
   ```sh
   npm run start
   ```
