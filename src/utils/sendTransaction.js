import {
	Contract,
	ElectrumNetworkProvider,
	SignatureTemplate,
} from "@nexscript/nexscript";
import artifact from "../contracts/interfaces/Keeper.json" assert { type: "json" };
import libnexa from "libnexa-js";
import { getItem } from "./localStorgae";

/**
 * Get network provider for Nexa blockchain.
 */
function getProvider(network) {
	return new ElectrumNetworkProvider(network);
}

/**
 * Get wallet details including private and public keys from the WIF (Wallet Import Format) and network.
 */
function getWallet(wif, network) {
	return new libnexa.PrivateKey.fromWIF(
		wif,
		libnexa.Networks[network]
	);
}

/**
 * Initialize a contract with the given provider and artifact.
 */
function getContract(pkh, provider) {
	return new Contract(artifact, [pkh], {
		provider,
	});
}

/**
 * Send transaction using the contract's sweep function.
 */
export async function sendTransaction(
	recipientAddress,
	nexaAmount
) {
	// Retrieve values from localStorage

	const { network, pkh, publicKey, wif } = {
		...getItem("wallet"),
	};

	// Check if any required values are missing
	if (!wif || !network || !pkh || !publicKey) {
		throw new Error(
			"Missing required data in localStorage. Please ensure 'wif', 'network', 'pkh', and 'publicKey' are set."
		);
	}

	const provider = getProvider(network);
	const contract = getContract(pkh, provider);

	const privateKey = getWallet(wif, network);

	const txData = await contract.functions
		.sweep(publicKey, new SignatureTemplate(privateKey))
		.to(recipientAddress, BigInt(nexaAmount))
		.send();

	console.log("Transaction data: ", txData);
	console.log("Contract Address: ", contract.address);
	return txData;
}
