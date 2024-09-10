import libnexa from "libnexa-js";
import {
	ripemd160,
	sha256,
	binToHex,
} from "@bitauth/libauth";

export async function createWallet() {
	const privateKey = libnexa.PrivateKey();

	const wif = privateKey.toWIF();

	const pubKey = privateKey.toPublicKey();
	const pubKeyHex = pubKey.toString();

	const pubKeyHash = ripemd160.hash(
		sha256.hash(pubKey.toBuffer())
	);
	const pubKeyHashHex = binToHex(pubKeyHash);

	const address = pubKey
		.toAddress(
			libnexa.Networks.testnet,
			libnexa.Address.PayToScriptTemplate
		)
		.toString();
	const result = {
		address,
		publicKey: pubKeyHex,
		pkh: pubKeyHashHex,
		wif,
		network: "testnet",
	};
	// Returning the values with new key names
	return result;
}
