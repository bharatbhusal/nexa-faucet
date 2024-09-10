# Nexa Wallet and Transaction Application

This React application, built using Vite, allows users to create a Nexa wallet, manage its details, and send transactions on the Nexa Blockchain. The app utilizes Tailwind CSS for styling and includes wallet creation, exporting, and sending transactions through a simple interface. The application also integrates Nexa blockchain functionalities like retrieving balances and interacting with contracts.

## Features

- **Wallet Management**: Create, view, export, and delete a Nexa wallet.
- **Blockchain Interaction**: Send Nexa transactions to specified addresses.
- **Balance Retrieval**: Display the balance of the created wallet.
- **Tailwind CSS Styling**: Clean, responsive design using Tailwind CSS.
- **Routing**: Multi-page app with routing handled by `react-router-dom`.

## Project Structure

The application is structured into several components and pages:

### Main Components:

- **Header**: Displays the navigation header of the app.
- **Footer**: Displays the footer.
- **Wallet**: Allows the user to create, view, export, and delete a Nexa wallet.
- **SendNexa**: Enables the user to send Nexa transactions.
- **Home**: The homepage of the application.
- **NotFound**: Handles any undefined routes.

### Core Utilities:

- **LocalStorage Helpers**: Functions to interact with `localStorage` (`getItem`, `setItem`, `removeItem`, `clear`).
- **Nexa Blockchain Utilities**: Functions to interact with Nexa Blockchain:
  - `getBalance`: Retrieve the balance of a wallet.
  - `createWallet`: Generate a new Nexa wallet.
  - `sendTransaction`: Send transactions using a Nexa smart contract.
  - `getProvider` & `getWallet`: Helper functions for blockchain provider and wallet initialization.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/bharatbhusal/nexa-quest.git
   cd nexa-quest
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

1. **Create a Wallet**: Navigate to the "Wallet" page and click "Create Wallet" to generate a new Nexa wallet.
2. **View Wallet Details**: Once the wallet is created, view the address, public key, and balance.
3. **Send Nexa**: Go to the "Send Nexa" page and enter the recipient address and amount to send Nexa.

### Routing

The app uses `react-router-dom` for navigation between pages:

- `/`: Home
- `/wallet`: Wallet management page
- `/receive-nexa`: Send Nexa transactions
- `*`: 404 Not Found

### Tailwind CSS Integration

The project is styled using Tailwind CSS for responsive and clean design. Key classes used include:

- `flex`, `min-h-screen` for layout structure.
- `bg-gray-50`, `text-gray-700` for styling the interface.
- `rounded-lg`, `shadow-lg` for enhancing the visual design.

## Code Example

```jsx
// Example of routing in App.jsx
<Router>
	<Header />
	<main className="flex-grow flex items-center justify-center">
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/receive-nexa" element={<SendNexa />} />
			<Route path="/wallet" element={<Wallet />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</main>
	<Footer />
</Router>
```

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast development build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **react-router-dom**: Routing for React applications.
- **nexscript**: Nexa Blockchain interaction library.
- **libnexa-js**: JavaScript SDK for Nexa.
