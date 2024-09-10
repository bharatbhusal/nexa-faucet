import { useState, useEffect } from "react";
import {
	getItem,
	removeItem,
	setItem,
} from "../utils/localStorgae";
import { getBalance } from "../utils/getBalance";
import { createWallet } from "../utils/createWallet";

const Wallet = () => {
	const [walletData, setWalletData] = useState(null); // State to hold wallet data
	const [loading, setLoading] = useState(false); // State to handle loading state
	const [error, setError] = useState(null); // State to handle errors
	const [copySuccess, setCopySuccess] = useState(""); // State to handle copy success message
	const [balance, setBalance] = useState(0);

	// Function to create wallet
	const handleCreateWallet = async () => {
		console.log("Creating Wallet...");
		setLoading(true);
		setError(null);
		try {
			// Call the API to create the wallet and save the result
			setItem("wallet", await createWallet());
			setWalletData(getItem("wallet"));
		} catch (error) {
			setError(error.message || "Failed to create wallet");
		} finally {
			setLoading(false);
		}
	};

	// Function to export wallet
	const handleExportWallet = () => {
		const storedWallet = getItem("wallet");
		if (storedWallet) {
			const blob = new Blob(
				[JSON.stringify(storedWallet, null, 2)],
				{
					type: "application/json",
				}
			);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "wallet.json";
			link.click();
			URL.revokeObjectURL(url);
		} else {
			setError("No wallet found in localStorage to export.");
		}
	};

	// Function to delete wallet
	const handleDeleteWallet = () => {
		removeItem("wallet");
		setWalletData(null); // Clear wallet data from state
	};

	// Reusable function to copy any field to clipboard
	const handleCopy = (fieldName, value) => {
		if (value) {
			navigator.clipboard
				.writeText(value)
				.then(() => {
					setCopySuccess(`${fieldName} copied to clipboard!`);
					setTimeout(() => setCopySuccess(""), 3000); // Clear the message after 3 seconds
				})
				.catch(() => {
					setCopySuccess(`Failed to copy ${fieldName}.`);
					setTimeout(() => setCopySuccess(""), 3000); // Clear the message after 3 seconds
				});
		}
	};

	// Retrieve wallet data from localStorage on component mount
	useEffect(() => {
		const handleGetBalance = async () => {
			setBalance(
				await getBalance(await getItem("wallet").address)
			);
		};
		const storedWallet = getItem("wallet");

		if (storedWallet) {
			setWalletData(storedWallet);
			handleGetBalance();
		}
	}, []);

	return (
		<div className="p-6 bg-gray-50 max-w-fit mx-auto rounded-lg shadow-lg break-word">
			<h2 className="text-2xl font-semibold mb-6 text-gray-800">
				Wallet Details
			</h2>
			{/* Create wallet button */}
			{!walletData && (
				<button
					onClick={handleCreateWallet}
					className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
					disabled={loading}
				>
					{loading ? "Creating Wallet..." : "Create Wallet"}
				</button>
			)}

			{/* Display wallet data */}
			{walletData && (
				<div className="mt-6">
					<div className="flex flex-col gap-1">
						<p className="text-gray-700 px-2 py-1">
							<strong>Balance:</strong> {balance} NEX
						</p>
						<p
							onClick={() =>
								handleCopy("Address", walletData.address)
							}
							className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
						>
							<strong>Address:</strong> {walletData.address}
						</p>
						<p
							onClick={() =>
								handleCopy("Public Key", walletData.publicKey)
							}
							className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
						>
							<strong>Public Key (Hex):</strong>{" "}
							{walletData.publicKey}
						</p>
						<p
							onClick={() =>
								handleCopy("Public Key Hash", walletData.pkh)
							}
							className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
						>
							<strong>Public Key Hash (Hex):</strong>{" "}
							{walletData.pkh}
						</p>
						<p
							onClick={() => handleCopy("WIF", walletData.wif)}
							className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
						>
							<strong>WIF:</strong> {walletData.wif}
						</p>
					</div>

					{/* Export wallet button */}
					<button
						onClick={handleExportWallet}
						className="bg-green-500 text-white p-2 mt-4 rounded-lg hover:bg-green-600 transition duration-200 mr-4"
					>
						Export Wallet
					</button>

					{/* Delete wallet button */}
					<button
						onClick={handleDeleteWallet}
						className="bg-red-500 text-white p-2 mt-4 rounded-lg hover:bg-red-600 transition duration-200"
					>
						Delete Wallet
					</button>

					{/* Copy Success Message */}
					{copySuccess && (
						<p className="mt-6 bg-green-100 p-4 rounded-lg shadow-md">
							<strong>{copySuccess}</strong>
						</p>
					)}
				</div>
			)}

			{/* Error handling */}
			{error && (
				<p className="mt-6 bg-red-100 p-4 rounded-lg shadow-md">
					<strong>Error:</strong> {error}
				</p>
			)}
		</div>
	);
};

export default Wallet;
