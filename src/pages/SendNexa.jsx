import { useState } from "react";
import { sendTransaction } from "../utils/sendTransaction";
import { ScaleLoader } from "react-spinners";
import { FiExternalLink } from "react-icons/fi";

const ReceiveNexa = () => {
	const [recipientAddress, setRecipientAddress] =
		useState("");
	const [nexaAmount, setNexaAmount] = useState("");
	const [txResult, setTxResult] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [validationError, setValidationError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setTxResult("");

		// Check if the amount is at least 1000
		if (parseFloat(nexaAmount) < 1000) {
			setValidationError(
				"The amount must be at least 1000 Nexa."
			);
			return;
		}

		// Check if the address starts with "nexatest:"
		if (!recipientAddress.startsWith("nexatest:")) {
			setValidationError(
				"The recipient address must start with 'nexatest:'."
			);
			return;
		}

		// Clear any previous validation errors
		setValidationError("");

		try {
			setLoading(true);

			const result = await sendTransaction(
				recipientAddress,
				nexaAmount
			);
			setTxResult(result.txData);
			setError(null);
		} catch (err) {
			setError("Failed to send transaction. " + err.message);
			setTxResult(null);
		} finally {
			setLoading(false);
			setRecipientAddress("");
			setNexaAmount("");
		}
	};

	const txIdUrl = txResult
		? `https://testnet-explorer.nexa.org/tx/${txResult.txid}`
		: "#";

	return (
		<div className="p-6 bg-gray-50 max-w-md mx-auto rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold mb-6 text-gray-800">
				Receive Nexa
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Recipient Address
					</label>
					<input
						type="text"
						value={recipientAddress}
						onChange={(e) => setRecipientAddress(e.target.value)}
						placeholder="Enter recipient address"
						className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
						required
					/>
					{validationError.includes("address") && (
						<p className="mt-2 text-sm text-red-600">
							{validationError}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Amount (Nexa)
					</label>
					<input
						type="number"
						value={nexaAmount}
						onChange={(e) => setNexaAmount(e.target.value)}
						placeholder="Enter amount"
						className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
						required
					/>
					{validationError.includes("amount") && (
						<p className="mt-2 text-sm text-red-600">
							{validationError}
						</p>
					)}
				</div>
				<button
					type="submit"
					disabled={loading}
					className={`w-full p-3 text-white rounded-lg transition duration-300 ${
						loading
							? "bg-blue-300"
							: "bg-blue-500 hover:bg-blue-600"
					} focus:outline-none focus:ring-2 focus:ring-blue-500`}
				>
					{loading ? "Sending..." : "Receive Nexa"}
				</button>
			</form>

			{loading && (
				<div className="mt-6 flex justify-center items-center">
					<ScaleLoader
						color="#3b82f6"
						height={40}
						width={15}
						radius={10}
					/>
				</div>
			)}

			{txResult && (
				<div className="mt-6 bg-green-100 p-4 rounded-lg shadow-md">
					<h4 className="font-semibold text-green-800 text-lg">
						Transaction Successful!
					</h4>
					<div className="flex items-center mt-2">
						<p className="text-sm text-gray-700 flex-grow">
							<strong>Transaction ID:</strong>{" "}
							<span className="break-words">
								{txResult.txid.slice(0, 20)}...
								{txResult.txid.slice(-20)}
							</span>
						</p>
						<a
							href={txIdUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-700 transition duration-200 ml-2"
						>
							<FiExternalLink size={20} />
						</a>
					</div>
				</div>
			)}

			{error && (
				<div className="mt-6 bg-red-100 p-4 rounded-lg shadow-md">
					<h4 className="font-semibold text-red-800 text-lg">
						Error
					</h4>
					<p className="mt-2 text-sm text-gray-700 break-words">
						{error}
					</p>
				</div>
			)}
		</div>
	);
};

export default ReceiveNexa;
