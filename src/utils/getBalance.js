import { ElectrumNetworkProvider } from "@nexscript/nexscript";

export async function getBalance(address) {
	const provider = new ElectrumNetworkProvider("testnet");
	const data = await provider.getUtxos(address);
	const balance = data.reduce(
		(acc, utxo) => acc + utxo.satoshis,
		0n
	);
	return Number(balance);
}
