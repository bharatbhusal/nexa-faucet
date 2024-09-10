import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="p-6 bg-gray-50 max-w-md mx-auto rounded-lg shadow-lg">
			<h2 className="text-3xl font-semibold mb-6 text-gray-800">
				Welcome to the Nexa App
			</h2>
			<p className="text-lg text-gray-600 mb-4">
				Your one-stop solution for sending and managing Nexa
				tokens.
			</p>
			<div className="space-y-4">
				<Link
					to="/receive-nexa"
					className="block text-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
				>
					Receive Nexa
				</Link>
				<Link
					to="/wallet"
					className="block text-center bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300"
				>
					Go to Wallet
				</Link>
			</div>
		</div>
	);
};

export default Home;
