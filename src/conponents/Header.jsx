import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="bg-blue-500 text-white p-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<h1 className="text-lg font-bold">Get Faucet</h1>
				<nav>
					<Link to="/" className="mr-4 hover:underline">
						Home
					</Link>
					<Link
						to="/receive-nexa"
						className="mr-4 hover:underline"
					>
						Receive Nexa
					</Link>
					<Link to="/wallet" className="hover:underline">
						Wallet
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
